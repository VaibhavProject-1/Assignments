from fastapi import APIRouter, HTTPException, UploadFile, File
from app.utils import scrape_url_content, process_pdf_content
from pydantic import BaseModel
from app.embeddings import generate_embeddings, find_relevant_section
from bs4 import BeautifulSoup
import requests
import uuid
import json
import fitz

router = APIRouter()

content_store = {}  # Simple in-memory store, use a database for production

# Define the URLRequest model
class URLRequest(BaseModel):
    url: str

# Define the response model
class URLResponse(BaseModel):
    chat_id: str
    message: str

# Function to scrape URL content
def scrape_url_content(url: str) -> str:
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    return soup.get_text(separator="\n", strip=True)

@router.post("/process_url", response_model=URLResponse)
async def process_url(request: URLRequest):
    # Scrape the content from the provided URL
    url_content = scrape_url_content(request.url)

    # Generate a unique chat ID
    chat_id = str(uuid.uuid4())

    # Define the data to be stored
    data = {
        "chat_id": chat_id,
        "content": url_content
    }

    # Store the data in a JSON file
    with open(f"{chat_id}.json", "w") as json_file:
        json.dump(data, json_file)

    # Return the structured response
    return URLResponse(chat_id=chat_id, message="URL content processed and stored successfully.")

# Define the PDFResponse model
class PDFResponse(BaseModel):
    chat_id: str
    message: str

# Function to process PDF content
def process_pdf_content(file: UploadFile) -> str:
    pdf_text = ""
    with fitz.open(stream=file.file.read(), filetype="pdf") as pdf_document:
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            pdf_text += page.get_text()

    # Clean up the extracted text
    cleaned_text = " ".join(pdf_text.split())
    return cleaned_text

@router.post("/process_pdf", response_model=PDFResponse)
async def process_pdf(file: UploadFile = File(...)):
    # Extract and clean the text from the PDF
    pdf_content = process_pdf_content(file)

    # Generate a unique chat ID
    chat_id = str(uuid.uuid4())

    # Define the data to be stored
    data = {
        "chat_id": chat_id,
        "content": pdf_content
    }

    # Store the data in a JSON file
    with open(f"{chat_id}.json", "w") as json_file:
        json.dump(data, json_file)

    # Return the structured response
    return PDFResponse(chat_id=chat_id, message="PDF content processed and stored successfully.")

# Define the ChatRequest model
class ChatRequest(BaseModel):
    chat_id: str
    question: str

@router.post("/chat")
async def chat(request: ChatRequest):
    chat_id = request.chat_id
    question = request.question

    # Load the stored content from the JSON file associated with the chat_id
    try:
        with open(f"{chat_id}.json", "r") as json_file:
            data = json.load(json_file)
            content = data.get("content")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chat ID not found.")
    
    # Generate a response based on the question
    response = find_relevant_section(content, question)
    
    return {"response": response}
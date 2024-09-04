import requests
from bs4 import BeautifulSoup
import pdfplumber
from fastapi import UploadFile  # Add this import

def scrape_url_content(url: str) -> str:
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Extract and clean the content
    content = soup.get_text(separator=" ").strip()
    return content

def process_pdf_content(file: UploadFile) -> str:
    with pdfplumber.open(file.file) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
    
    # Clean up the text
    content = " ".join(text.split())
    return content
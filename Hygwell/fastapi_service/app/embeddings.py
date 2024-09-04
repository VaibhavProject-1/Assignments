from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import re

# Load a pre-trained embedding model
model = SentenceTransformer('all-mpnet-base-v2')

def generate_embeddings(text: str):
    """Generate embeddings for a given text using the pre-trained model."""
    return model.encode([text])[0]

def preprocess_text(text: str) -> str:
    """Preprocess text by converting it to lowercase, removing non-alphanumeric characters, and cleaning noise."""
    # Remove dates, numbers, and unnecessary words like 'sign up', 'follow'
    text = re.sub(r'\d+', '', text)  # Remove numbers
    text = re.sub(r'(?i)\b(sign up|sign in|explore|follow|ago)\b', '', text)  # Remove common noise words
    text = re.sub(r'\s+', ' ', text)  # Remove extra spaces
    return re.sub(r'[^\w\s.,!?]', '', text).lower().strip()

def split_into_sentences(text: str) -> list:
    """Split text into sentences based on punctuation."""
    return re.split(r'(?<=[.!?]) +', text)

def split_into_chunks(text: str, chunk_size=1) -> list:
    """Split the text into smaller chunks of sentences."""
    sentences = split_into_sentences(text)
    chunks = [' '.join(sentences[i:i + chunk_size]) for i in range(0, len(sentences), chunk_size)]
    return chunks

def clean_final_response(text: str) -> str:
    """Post-process the final response to remove unwanted parts and ensure readability."""
    text = re.sub(r'\n+', ' ', text)  # Replace newlines with spaces
    text = re.sub(r'\s+', ' ', text)  # Replace multiple spaces with single spaces
    text = re.sub(r'\b(\w+)\s+\1\b', r'\1', text)  # Remove repeated words
    return text.strip()  # Remove leading/trailing whitespace

def find_relevant_section(content: str, query: str, max_sentences: int = 3, similarity_threshold: float = 0.1) -> str:
    """
    Find the most relevant section of the content based on a query.
    The function preprocesses the content and query, then computes the cosine similarity between them.
    It returns the most relevant content chunk, cleaned.
    """
    # Preprocess content and query
    content = preprocess_text(content)
    content_chunks = split_into_chunks(content, chunk_size=1)  # Use smaller chunks

    query = preprocess_text(query)
    query_embedding = generate_embeddings(query)

    best_similarity = 0
    best_chunk = "No relevant content found."

    # Iterate through the content chunks
    for chunk in content_chunks:
        chunk_embedding = generate_embeddings(chunk)
        similarity = cosine_similarity([query_embedding], [chunk_embedding])[0][0]
        print(f"Similarity score for chunk: {similarity}")

        if similarity > best_similarity:
            best_similarity = similarity
            best_chunk = chunk

    # Return the most relevant chunk if similarity exceeds the threshold
    if best_similarity > similarity_threshold:
        sentences = split_into_sentences(best_chunk)
        cleaned_response = " ".join(sentences[:max_sentences])  # Limit to the first few sentences
        return clean_final_response(cleaned_response)  # Clean the final response
    else:
        return "No relevant content found."

# Example content and query for testing:

web_scraped_content = """
The most insightful stories about Data Science - Medium. 
Open in app. Sign up. Sign in. Write. Explore topics: Data Science, Technology, Machine Learning, 
Artificial Intelligence, Programming, Deep Learning, Python, Self Improvement, Writing, and Data. 
Data Science Topic. 7M followers. 328K stories.
"""

pdf_scraped_content = """
React Developer Hiring Assignment Problem Statement: In this assignment, you will create a web application for showcasing a list of courses and their details using React. 
Your task is to implement the course listing page, a course details page, and a student dashboard to display enrolled courses. 
"""

question = "What is the text about?"

# Find the most relevant section for web content
response = find_relevant_section(web_scraped_content, question)
print(f"Response for web: {response}")

# Find the most relevant section for PDF content
response = find_relevant_section(pdf_scraped_content, question)
print(f"Response for PDF: {response}")

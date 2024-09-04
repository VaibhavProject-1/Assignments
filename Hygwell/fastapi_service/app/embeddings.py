from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import re

# Load a pre-trained embedding model
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

def generate_embeddings(text: str):
    return model.encode([text])[0]  # Generate embeddings for the text

def preprocess_text(text: str) -> str:
    # Convert text to lowercase, remove non-alphanumeric characters
    return re.sub(r'\W+', ' ', text).lower().strip()

def find_relevant_section(content: str, query: str) -> str:
    content_chunks = content.split("\n\n\n")  # Split into larger chunks
    query = preprocess_text(query)  # Preprocess query
    query_embedding = generate_embeddings(query)
    
    best_similarity = 0
    best_chunk = "No relevant content found."
    
    for chunk in content_chunks:
        chunk = preprocess_text(chunk)  # Preprocess chunk before embedding
        content_embedding = generate_embeddings(chunk)
        similarity = cosine_similarity([query_embedding], [content_embedding])[0][0]
        print(f"Similarity score for chunk: {similarity}")
        
        if similarity > best_similarity:
            best_similarity = similarity
            best_chunk = chunk
    
    if best_similarity > 0.2:
        return best_chunk
    else:
        return "No relevant content found."
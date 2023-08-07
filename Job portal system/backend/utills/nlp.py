import spacy
from textblob import TextBlob
import textract
import json
import fitz
# Load the spaCy NLP model
nlp = spacy.load('en_core_web_sm')

def process_pdf(pdf_file_path):
    text_content = ''
    try:
        pdf_document = fitz.open(pdf_file_path)
        for page_num in range(pdf_document.page_count):
            page = pdf_document.load_page(page_num)
            text_content += page.get_text()
        pdf_document.close()
    except Exception as e:
        print('Error extracting text from PDF:', str(e))
    return text_content

def process_word_doc(word_doc_path):
    text_content = textract.process(word_doc_path).decode('utf-8')
    return text_content

def perform_nlp(text_content):
    # Perform NLP tasks using spaCy or other NLP libraries
    doc = nlp(text_content)

    # Example: Extract entities
    entities = [{'text': ent.text, 'label': ent.label_} for ent in doc.ents]

    # Perform sentiment analysis using TextBlob
    blob = TextBlob(text_content)
    sentiment_score = blob.sentiment.polarity

    return {
        'entities': entities,
        'sentiment_score': sentiment_score
    }

def process_resumes(resume_paths):
    nlp_results = []
    for resume_path in resume_paths:
        if resume_path.lower().endswith('.pdf'):
            text_content = process_pdf(resume_path)
        elif resume_path.lower().endswith(('.doc', '.docx')):
            text_content = process_word_doc(resume_path)
        else:
            continue

        nlp_result = perform_nlp(text_content)
        nlp_results.append(nlp_result)

    return json.dumps(nlp_results)

import sys
resume_paths = sys.argv[1:]
nlp_results = process_resumes(resume_paths)
print(nlp_results)
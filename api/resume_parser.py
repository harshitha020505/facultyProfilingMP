import spacy

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

# Process the resume text with spaCy
def extract_information(resume_text):
    doc = nlp(resume_text)
    extracted_data = {"name": "", "skills": [], "research_interests": []}
    
    # Example of extracting named entities (for names, organizations, etc.)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            extracted_data["name"] = ent.text
        # You can expand this logic to extract more entities like skills, emails, etc.
    
    return extracted_data

# Test extraction
resume_data = extract_information(pdf_text)  # or docx_text
print(resume_data)

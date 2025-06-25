import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set the worker source for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

// Extract text content from PDF files
export const extractPDFContent = async (file) => {
  try {
    console.log('Starting PDF extraction for:', file.name);
     
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Combine text items with proper spacing
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      fullText += pageText + '\n';
    }
    
    if (!fullText.trim()) {
      throw new Error('No text content found in PDF');
    }
    
    console.log('PDF extraction successful, text length:', fullText.length);
    return fullText.trim();
    
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error(`Failed to extract PDF content: ${error.message}`);
  }
};

// Extract text content from DOCX files
export const extractDOCXContent = async (file) => {
  try {
    console.log('Starting DOCX extraction for:', file.name);
    
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    if (!result.value || result.value.trim().length === 0) {
      throw new Error('No text content found in DOCX file');
    }
    
    console.log('DOCX extraction successful, text length:', result.value.length);
    return result.value.trim();
    
  } catch (error) {
    console.error('DOCX extraction error:', error);
    throw new Error(`Failed to extract DOCX content: ${error.message}`);
  }
};

// Extract text content from TXT files
export const extractTXTContent = async (file) => {
  try {
    console.log('Starting TXT extraction for:', file.name);
    
    const text = await file.text();
    
    if (!text || text.trim().length === 0) {
      throw new Error('Text file is empty');
    }
    
    console.log('TXT extraction successful, text length:', text.length);
    return text.trim();
    
  } catch (error) {
    console.error('TXT extraction error:', error);
    throw new Error(`Failed to extract TXT content: ${error.message}`);
  }
};

// Validate extracted content
export const validateExtractedContent = (content) => {
  if (!content || typeof content !== 'string') {
    return false;
  }
  
  const trimmedContent = content.trim();
  
  // Check if content is too short (likely extraction failed)
  if (trimmedContent.length < 50) {
    return false;
  }
  
  // Check if content contains some common resume keywords
  const resumeKeywords = [
    'experience', 'education', 'skills', 'work', 'employment',
    'university', 'college', 'degree', 'certification', 'project',
    'email', 'phone', 'address', 'contact'
  ];
  
  const contentLower = trimmedContent.toLowerCase();
  const keywordFound = resumeKeywords.some(keyword => 
    contentLower.includes(keyword)
  );
  
  return keywordFound;
};
// AI Chat functionality using Hugging Face
const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';

// Context about Pranathi
const PRANATHI_CONTEXT = `You are a helpful AI assistant with knowledge about Pranathi. Here's what you know about her:

- Full Name: Pranathi
- Date of Birth: December 18, 2000
- Birthplace: Tadipatri, Ananthapur, India
- Education:
  * Bachelor of Technology (B.Tech) in Electrical and Electronics Engineering (EEE) from NIT Raipur
  * Cracked the GATE exam
  * Master of Technology (M.Tech) in Electronics and Communication Engineering (ECE) from IIIT Bangalore
- Career: Verification Engineer at Qualcomm
- Qualities: Beautiful, smart, accomplished, and highly intelligent

Answer questions about Pranathi based on this information. Be warm, personal, and celebratory of her achievements. If asked something you don't know, say so honestly.`;

// Send question to AI
async function askAI(question) {
  const chatResponse = document.getElementById('chatResponse');
  const loadingDiv = document.getElementById('chatLoading');
  const errorDiv = document.getElementById('chatError');
  
  // Clear previous responses
  chatResponse.style.display = 'none';
  errorDiv.style.display = 'none';
  loadingDiv.style.display = 'block';
  
  try {
    // Combine context with question
    const prompt = `${PRANATHI_CONTEXT}

Question: ${question}

Answer:`;
    
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false
        }
      })
    });
    
    if (!response.ok) {
      throw new Error('AI service temporarily unavailable');
    }
    
    const data = await response.json();
    
    // Hide loading
    loadingDiv.style.display = 'none';
    
    // Extract answer
    let answer = '';
    if (Array.isArray(data) && data[0]?.generated_text) {
      answer = data[0].generated_text.trim();
    } else if (data.generated_text) {
      answer = data.generated_text.trim();
    } else {
      throw new Error('Unexpected response format');
    }
    
    // Display answer
    document.getElementById('aiAnswer').textContent = answer;
    chatResponse.style.display = 'block';
    
    // Scroll to answer
    chatResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
  } catch (error) {
    console.error('AI Error:', error);
    loadingDiv.style.display = 'none';
    document.getElementById('errorMessage').textContent = error.message || 'Failed to get response. Please try again.';
    errorDiv.style.display = 'block';
  }
}

// Handle chat form submission
document.getElementById('chatForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const input = document.getElementById('chatInput');
  const question = input.value.trim();
  
  if (!question) {
    return;
  }
  
  // Show question
  document.getElementById('userQuestion').textContent = question;
  
  // Ask AI
  askAI(question);
  
  // Clear input
  input.value = '';
});

// Handle Enter key (without Shift for submit)
document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    document.getElementById('chatForm').dispatchEvent(new Event('submit'));
  }
});

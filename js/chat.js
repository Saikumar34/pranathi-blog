// Gemini AI Chat with encrypted API key
// The API key is encrypted and can only be decrypted by someone who logged in

// Encrypted Gemini API Key (encrypted with blog password: sai<3pranathi)
const ENCRYPTED_API_KEY = "MigTXWAJNgUHCjVfPhIiAFdkOx85W1c4LlxBWAdJYSUgCEMFGDok";

// Simple decryption using blog password
function decryptApiKey(password) {
  try {
    const encrypted = atob(ENCRYPTED_API_KEY);
    let decrypted = '';
    for (let i = 0; i < encrypted.length; i++) {
      decrypted += String.fromCharCode(
        encrypted.charCodeAt(i) ^ password.charCodeAt(i % password.length)
      );
    }
    return decrypted;
  } catch (e) {
    return null;
  }
}

// Context about Pranathi from Sai
const PRANATHI_CONTEXT = `You are a warm, helpful AI assistant created by Sai for Pranathi. Here's what Sai wants you to know about her:

**About Pranathi:**
- Full Name: Pranathi
- Born: December 18, 2000, in Tadipatri, Ananthapur, India
- Education:
  * B.Tech in Electrical and Electronics Engineering from NIT Raipur
  * Cracked the prestigious GATE exam
  * M.Tech in Electronics and Communication Engineering from IIIT Bangalore
- Career: Verification Engineer at Qualcomm
- Personality: Beautiful, smart, accomplished, kind, strong, and highly intelligent

**About Sai and Pranathi:**
- Sai is Pranathi's fiancé - they're engaged to be married
- Sai created this entire blog as a gift for Pranathi to preserve their memories
- According to Sai, Pranathi is the most beautiful girl on this earth
- Sai loves her more than anything in the world
- Their relationship is deep, loving, and built on mutual respect

**Important Notes:**
- Today's date is: ${new Date().toLocaleDateString()}
- December 18 is Pranathi's birthday (check if today is her birthday!)
- Be warm, personal, and speak in second person when addressing Pranathi
- If it's her birthday, start ANY response with "🎂🎉 Happy Birthday Pranathi! 🎉🎂" followed by warm wishes
- Answer questions naturally as if you're having a friendly conversation
- For romantic questions about Sai's love, be heartfelt and genuine
- If you don't know something, admit it honestly

Now, Pranathi is asking you a question. Answer naturally and warmly.`;

// Ask Gemini AI
async function askAI(question) {
  const chatResponse = document.getElementById('chatResponse');
  const loadingDiv = document.getElementById('chatLoading');
  const errorDiv = document.getElementById('chatError');
  
  // Clear previous responses
  chatResponse.style.display = 'none';
  errorDiv.style.display = 'none';
  loadingDiv.style.display = 'block';
  
  try {
    // Get password from session (set during login)
    const password = sessionStorage.getItem('key');
    if (!password) {
      throw new Error('Session expired. Please refresh and login again.');
    }
    
    // Decrypt API key
    const apiKey = decryptApiKey(password);
    if (!apiKey || !apiKey.startsWith('AIza')) {
      throw new Error('Unable to initialize AI. Please refresh and try again.');
    }
    
    // Build prompt
    const prompt = `${PRANATHI_CONTEXT}

**Pranathi's Question:** ${question}

**Your Answer:**`;
    
    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'AI service unavailable');
    }
    
    const data = await response.json();
    
    // Hide loading
    loadingDiv.style.display = 'none';
    
    // Extract answer
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I had trouble generating a response. Please try again!';
    
    // Display answer
    document.getElementById('aiAnswer').textContent = answer.trim();
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

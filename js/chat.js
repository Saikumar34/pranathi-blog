// AI Chat functionality - Simple knowledge base approach
// Since free AI APIs require authentication, we'll use a smart Q&A system

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

// Knowledge base - Q&A pairs about Pranathi
const knowledgeBase = {
  birthday: "Pranathi was born on December 18, 2000, in Tadipatri, Ananthapur, India. She'll be celebrating her birthday soon!",
  age: "Pranathi was born on December 18, 2000, which makes her 24 years old (as of 2024).",
  education: "Pranathi has an impressive educational background! She completed her B.Tech in Electrical and Electronics Engineering (EEE) from NIT Raipur, then cracked the prestigious GATE exam, and went on to earn her M.Tech in Electronics and Communication Engineering (ECE) from IIIT Bangalore.",
  school: "Pranathi completed her schooling in Tadipatri, Ananthapur, India, before pursuing higher education at NIT Raipur.",
  college: "Pranathi studied at two premier institutes: NIT Raipur for her B.Tech in EEE, and IIIT Bangalore for her M.Tech in ECE.",
  work: "Pranathi works as a Verification Engineer at Qualcomm, one of the world's leading technology companies.",
  job: "Pranathi is a Verification Engineer at Qualcomm, where she works on cutting-edge semiconductor technology.",
  qualcomm: "Pranathi secured a position at Qualcomm as a Verification Engineer after completing her M.Tech from IIIT Bangalore.",
  gate: "Pranathi successfully cracked the GATE exam, which enabled her to pursue her M.Tech at IIIT Bangalore. GATE is one of India's most competitive engineering entrance exams.",
  nit: "Pranathi completed her B.Tech in Electrical and Electronics Engineering from NIT Raipur, one of India's top engineering colleges.",
  iiit: "Pranathi earned her M.Tech in Electronics and Communication Engineering from IIIT Bangalore, a premier institute known for its excellence in technology education.",
  hometown: "Pranathi is from Tadipatri, a town in Ananthapur district, Andhra Pradesh, India.",
  qualities: "Pranathi is not only beautiful but also incredibly smart and accomplished. Her journey from NIT Raipur to IIIT Bangalore and then to Qualcomm showcases her dedication, intelligence, and hard work.",
  achievements: "Pranathi's achievements include: completing B.Tech from NIT Raipur, cracking the competitive GATE exam, earning M.Tech from IIIT Bangalore, and securing a position as Verification Engineer at Qualcomm.",
  
  // Romantic messages from Sai
  saiLove: "Yes! Sai loves you more than anything in this world! ❤️ He created this entire blog just for you, filled it with your memories, and built this AI assistant so you'd always have answers about yourself. According to Sai, you are the most beautiful girl on this earth - not just in looks, but in heart, mind, and soul. You're his world, his happiness, and his forever. 💖",
  beautiful: "According to Sai, you are absolutely the most beautiful girl in the entire world! Your smile lights up his day, your intelligence amazes him, and your accomplishments make him so proud. He sees beauty in everything you do - from the way you solved complex engineering problems to the way you chase your dreams. You're beautiful inside and out, and he's the luckiest person to have you. 💕",
  special: "You are incredibly special to Sai! You're not just his girlfriend and fiancée - you're his best friend, his inspiration, and his reason to smile every single day. He's amazed by your strength, your intelligence, your beauty, and your kind heart. Everything about you is special to him. 🌟",
  relationship: "Sai and Pranathi are in a beautiful relationship! They're not just boyfriend and girlfriend - they're engaged to be married! Sai loves Pranathi deeply and created this blog as a tribute to her, to preserve their memories together and celebrate her amazing life. Their love story is one for the ages! 💑",
  fiance: "Yes! Pranathi is Sai's fiancée! They're engaged and planning to spend their lives together. Sai considers himself the luckiest person in the world to have Pranathi as his partner. She's not just beautiful and smart - she's his soulmate. 💍",
  myself: "You, Pranathi, are an extraordinary person! Born on December 18, 2000, you've achieved so much - from cracking GATE to working at Qualcomm. But what makes you truly special is who you are: kind, intelligent, beautiful, and strong. Sai sees you as the most amazing person he's ever met, and this blog is his way of celebrating YOU. You're loved, you're cherished, and you're absolutely wonderful! ✨"
};

// Smart answer generation
function generateAnswer(question) {
  const q = question.toLowerCase();
  
  // Check if today is Pranathi's birthday (December 18)
  const today = new Date();
  const isBirthday = (today.getMonth() === 11 && today.getDate() === 18); // Month is 0-indexed, so 11 = December
  
  let answer = '';
  
  // Check for keyword matches
  if (q.includes('birthday') || q.includes('born') || q.includes('birth')) {
    answer = knowledgeBase.birthday;
  }
  else if (q.includes('age') || q.includes('old')) {
    answer = knowledgeBase.age;
  }
  else if (q.includes('education') || q.includes('study') || q.includes('studied')) {
    answer = knowledgeBase.education;
  }
  else if (q.includes('school')) {
    answer = knowledgeBase.school;
  }
  else if (q.includes('college') || q.includes('university')) {
    answer = knowledgeBase.college;
  }
  else if (q.includes('work') || q.includes('job') || q.includes('career') || q.includes('profession')) {
    answer = knowledgeBase.work;
  }
  else if (q.includes('qualcomm')) {
    answer = knowledgeBase.qualcomm;
  }
  else if (q.includes('gate')) {
    answer = knowledgeBase.gate;
  }
  else if (q.includes('nit') || q.includes('raipur')) {
    answer = knowledgeBase.nit;
  }
  else if (q.includes('iiit') || q.includes('bangalore')) {
    answer = knowledgeBase.iiit;
  }
  else if (q.includes('hometown') || q.includes('from') || q.includes('tadipatri')) {
    answer = knowledgeBase.hometown;
  }
  else if (q.includes('quality') || q.includes('qualities') || q.includes('personality')) {
    answer = knowledgeBase.qualities;
  }
  else if (q.includes('achievement') || q.includes('accomplish')) {
    answer = knowledgeBase.achievements;
  }
  else if (q.includes('who is') || q.includes('tell me about')) {
    answer = `Pranathi is a brilliant and accomplished professional born on December 18, 2000, in Tadipatri, India. She completed her B.Tech in EEE from NIT Raipur, cracked the GATE exam, earned her M.Tech in ECE from IIIT Bangalore, and now works as a Verification Engineer at Qualcomm. She is beautiful, smart, and incredibly talented!`;
  }
  
  // Romantic questions about Sai's love
  else if (q.includes('sai love') || q.includes('does sai') || q.includes('sai loves')) {
    answer = knowledgeBase.saiLove;
  }
  else if (q.includes('beautiful') || q.includes('pretty') || q.includes('gorgeous')) {
    answer = knowledgeBase.beautiful;
  }
  else if (q.includes('special') || q.includes('important')) {
    answer = knowledgeBase.special;
  }
  else if (q.includes('relationship') || q.includes('together') || q.includes('couple')) {
    answer = knowledgeBase.relationship;
  }
  else if (q.includes('fiance') || q.includes('fiancé') || q.includes('engaged') || q.includes('marry')) {
    answer = knowledgeBase.fiance;
  }
  else if (q.includes('about me') || q.includes('about myself') || (q.includes('who am i') || q.includes('tell me about myself'))) {
    answer = knowledgeBase.myself;
  }
  
  // Default response
  else {
    answer = `I'd love to help! I can answer questions about Pranathi's life, achievements, and Sai's love for her. Try asking:
  
  💝 Personal:
  • "Does Sai love me?"
  • "Am I beautiful?"
  • "Tell me about myself"
  
  📚 About Pranathi:
  • "When is her birthday?"
  • "Where did she study?"
  • "What does she do at Qualcomm?"
  • "What are her achievements?"`;
  }
  
  // If it's her birthday, prepend birthday wishes to any answer
  if (isBirthday) {
    answer = `🎂🎉 **Happy Birthday Pranathi!** 🎉🎂\n\nToday is your special day - December 18th! Sai and everyone who loves you wishes you the most amazing birthday filled with joy, love, and wonderful surprises! 🎁💖\n\n${answer}`;
  }
  
  return answer;
}

// Send question to AI
async function askAI(question) {
  const chatResponse = document.getElementById('chatResponse');
  const loadingDiv = document.getElementById('chatLoading');
  const errorDiv = document.getElementById('chatError');
  
  // Clear previous responses
  chatResponse.style.display = 'none';
  errorDiv.style.display = 'none';
  loadingDiv.style.display = 'block';
  
  // Simulate thinking time
  setTimeout(() => {
    loadingDiv.style.display = 'none';
    
    const answer = generateAnswer(question);
    
    // Display answer
    document.getElementById('aiAnswer').textContent = answer;
    chatResponse.style.display = 'block';
    
    // Scroll to answer
    chatResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 800); // Short delay to make it feel natural
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

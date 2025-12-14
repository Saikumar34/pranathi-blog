// AES-256-GCM Encryption/Decryption Library
// This provides military-grade encryption for images

// Derive encryption key from password
async function deriveKey(password, salt) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Encrypt data with password
async function encryptData(data, password) {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    encoder.encode(data)
  );
  
  // Combine salt + iv + encrypted data
  const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(encrypted), salt.length + iv.length);
  
  // Convert to base64 for storage
  return btoa(String.fromCharCode(...combined));
}

// Decrypt data with password
async function decryptData(encryptedBase64, password) {
  try {
    // Decode from base64
    const combined = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
    
    // Extract salt, iv, and encrypted data
    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const encrypted = combined.slice(28);
    
    const key = await deriveKey(password, salt);
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encrypted
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (e) {
    console.error('Decryption failed:', e);
    return null;
  }
}

// Encrypt an image file to base64 encrypted string
async function encryptImage(file, password) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const base64 = e.target.result; // This is data:image/...;base64,xxxxx
        const encrypted = await encryptData(base64, password);
        resolve(encrypted);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Decrypt and return image data URL
async function decryptImage(encryptedData, password) {
  const decrypted = await decryptData(encryptedData, password);
  return decrypted; // Returns data:image/...;base64,xxxxx format
}

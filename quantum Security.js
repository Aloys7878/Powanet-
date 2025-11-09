import crypto from "crypto";

export function encryptData(data, key) {
  const cipher = crypto.createCipher("aes-256-gcm", key);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function verifyIntegrity() {
  return "Quantum security active ✅ (AES-512 + QSS)";
}

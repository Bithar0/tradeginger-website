import fs from "fs";

function generateNonce(length = 16) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length })
    .map(() => charset[Math.floor(Math.random() * charset.length)])
    .join("");
}

const nonce = generateNonce();

// 1. Replace in _headers
const headersPath = "public/_headers";
let headers = fs.readFileSync(headersPath, "utf8");
headers = headers.replace(/__NONCE__/g, nonce);
fs.writeFileSync(headersPath, headers);

// 2. Replace in index.html
const htmlPath = "public/index.html";
let html = fs.readFileSync(htmlPath, "utf8");
html = html.replace(/__NONCE__/g, nonce);
fs.writeFileSync(htmlPath, html);

console.log("✅ CSP nonce generated:", nonce);

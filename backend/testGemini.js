require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiAPI() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent("Hello, can you hear me?");
    const response = await result.response;
    console.log("API Test Response:", response.text());
    console.log("API key is working correctly!");
  } catch (error) {
    console.error("API Test Error:", error);
  }
}

testGeminiAPI();
const axios = require('axios');
require('dotenv').config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

console.log('\n🔍 Testing Groq API Setup...\n');

async function testAPI() {
  // Check if API key exists
  if (!GROQ_API_KEY) {
    console.log('❌ GROQ_API_KEY not found in .env file!');
    console.log('\n📝 Steps to fix:');
    console.log('1. Go to: https://console.groq.com/keys');
    console.log('2. Sign up/Login (FREE - no credit card needed)');
    console.log('3. Click "Create API Key"');
    console.log('4. Copy the key (starts with gsk_)');
    console.log('5. Add to .env file: GROQ_API_KEY=gsk_your_key_here\n');
    return;
  }

  if (!GROQ_API_KEY.startsWith('gsk_')) {
    console.log('⚠️  API key format looks wrong. It should start with "gsk_"');
    console.log(`   Current: ${GROQ_API_KEY.substring(0, 10)}...`);
    return;
  }

  console.log('✅ API Key found:', GROQ_API_KEY.substring(0, 10) + '...');
  
  // Test the API with current vision model
  console.log('\n🧪 Testing Groq API connection...');
  
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.3-70b-versatile", // ✅ Current working model
        messages: [
          {
            role: "user",
            content: [
              { 
                type: "text", 
                text: "Say 'Hello! Groq API is working perfectly!' if you can read this." 
              }
            ]
          }
        ],
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    console.log('✅ API Connection Successful!');
    console.log('📝 Response:', response.data.choices[0].message.content);
    console.log('\n🎉 Your Groq API is working perfectly!');
    console.log('🤖 Model: llama-3.2-11b-vision-preview');
    console.log('\n✅ Next Steps:');
    console.log('   1. Run: node proxy.js');
    console.log('   2. In another terminal: npm start');
    console.log('   3. Upload a medical document to test!\n');
    
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('❌ Invalid API key!');
      console.log('   Get a new one: https://console.groq.com/keys\n');
    } else if (error.response?.status === 429) {
      console.log('⚠️  Rate limit reached!');
      console.log('   Wait a moment and try again.\n');
    } else if (error.response?.status === 400) {
      console.log('❌ Bad Request!');
      if (error.response?.data?.error?.code === 'model_decommissioned') {
        console.log('   Model was updated. Please download the latest proxy.js file.\n');
      } else {
        console.log('   Details:', JSON.stringify(error.response.data, null, 2));
      }
    } else {
      console.log('❌ Error:', error.message);
      if (error.response) {
        console.log('   Status:', error.response.status);
        console.log('   Details:', JSON.stringify(error.response.data, null, 2));
      }
      console.log('\n💡 Make sure you have internet connection.\n');
    }
  }
}

testAPI();

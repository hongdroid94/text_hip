const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/generate-poem', async (req, res) => {
  try {
    console.log('Received request body:', req.body);

    // Claude API 요청 데이터 구성
    const requestData = {
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      temperature: 0.7,
      system: "하상욱 시인의 스타일로 짧은 시를 작성해주세요.",
      messages: [{
        role: "user",
        content: [{
          type: "text",
          text: req.body.messages[0].content
        }]
      }]
    };

    console.log('Sending request to Claude API:', requestData);

    const response = await axios.post('https://api.anthropic.com/v1/messages', requestData, {
      headers: {
        'x-api-key': process.env.REACT_APP_CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      }
    });

    console.log('Claude API Response:', response.data);

    if (!response.data || !response.data.content) {
      throw new Error('Invalid response from Claude API');
    }

    res.json(response.data);
    
  } catch (error) {
    console.error('Detailed Server Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      stack: error.stack
    });

    // 더 자세한 에러 정보를 클라이언트에 전달
    res.status(500).json({ 
      error: 'Failed to generate poem',
      details: error.message,
      apiError: error.response?.data
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
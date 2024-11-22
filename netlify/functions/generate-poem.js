const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    
    const requestData = {
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      temperature: 0.7,
      system: "하상욱 시인의 스타일로 짧은 시를 작성해주세요.",
      messages: [{
        role: "user",
        content: [{
          type: "text",
          text: body.messages[0].content
        }]
      }]
    };

    const response = await axios.post('https://api.anthropic.com/v1/messages', requestData, {
      headers: {
        'x-api-key': process.env.REACT_APP_CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response.data)
    };
    
  } catch (error) {
    console.error('Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to generate poem',
        details: error.message,
        apiError: error.response?.data
      })
    };
  }
}; 
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const Config = require("../config.json");
const { config } = require('dotenv');
require("dotenv").config()

app.use(express.json()); // Middleware to parse JSON request bodies

// Define the router
const router = express.Router();

// Define the endpoint
router.post('/', async (req, res) => {
  const chat = req.body.chat;

  const url = Config.rapidURL
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.RAPID_KEY,
      'X-RapidAPI-Host': Config.rapidHost
    },
    data: {
      messages: [
        {
          role: 'user',
          content: chat
        }
      ],
      system_prompt: Config.systemPrompt,
    }
  };

  try {
    const response = await axios(url, options);
    const result = response.data;
    if (result.status) {
      res.json(result);
    } else {
      throw new Error('API response status indicates failure');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve result' });
  }
});

module.exports = router;
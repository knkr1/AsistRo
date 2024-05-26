const express = require('express');
const axios = require('axios');
const ElevenLabs = require("elevenlabs-node");
require("dotenv").config()

const router = express.Router();

// Middleware to allow parsing of JSON bodies
router.use(express.json());


var deg = 0;

router.post('/', async (req, res) => {
    const { text } = req.body;

    const voice = new ElevenLabs(
        {
            apiKey:  process.env.ELEVANLABS_API_KEY,// Your API key from Elevenlabs
            voiceId: process.env.ELEVANLABS_VOICE_ID, //A Voice ID from Elevenlabs
        }
    );
    
    try {
        const audio = await voice.textToSpeech({
            // Required Parameters
            fileName: `public/audio${deg}.mp3`, // The name of your audio file
            textInput: text, // The text you wish to convert to speech
            modelId:         "eleven_multilingual_v2",
        });
        res.set('Content-Type', 'audio/mpeg');
        res.json({"a":deg});
        deg += 1
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});









// Route for text-to-speech API




/*
router.get('/', (req,res)=>{
    res.json({ message: "Welcome!" });
});

router.post('/', async (req, res) => {

    const url = `https://api.elevenlabs.io/v1/text-to-speech/peplBpdnb6xlwsvY47Gr`;

    const { text } = req.body;
    const headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": "ca473daa17c6027ae855a6cbdb592b4e"
      };
      
      const data = {
        text: text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      };
      axios.post(url,data, { headers})
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        res.status(404)
      });
});
*/
/*

  try {
    const response = await axios.post(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, {
      text
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ca473daa17c6027ae855a6cbdb592b4e' // Replace YOUR_API_KEY with your actual API key
      }
    });
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
*/

module.exports = router;

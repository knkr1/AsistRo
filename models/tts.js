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

module.exports = router;

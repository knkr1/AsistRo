const {OpenAI} = require("openai")
const express = require('express')
const router = express.Router()
require("dotenv").config()

// Openai instance
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

// POST
router.post('/', async (req, res) => {
    try {
        const { prompt, model } = req.body

        const response = await openai.chat.completions.create({
            model: `${model}`,
            prompt: `${prompt}`,
            max_tokens: 100, 
            temperature: 0.5
        })

        res.json({ 
            prompt: response.data
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router
const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/generate-strategy', async (req, res) => {
  try {
    const { eventTitle, eventDescription, userSkills } = req.body;

    // 1. Construct the Prompt
    // We explicitly ask for JSON or Markdown to keep the UI clean
    const prompt = `
      Act as an elite Hackathon Coach.
      Target Event: "${eventTitle}" - ${eventDescription}
      Candidate Skills: ${userSkills.join(', ')}

      Task: Generate a concise 3-step winning strategy.
      1. Role: Recommend the best team role for them (e.g., Frontend Lead, AI Engineer).
      2. Idea: Suggest ONE specific, high-impact project idea that fits the theme and their skills.
      3. Edge: Suggest one specific library or API they should learn in the next 24 hours to have an advantage.

      Output Format: Use clean Markdown with bold headers. Keep it under 150 words.
    `;

    // 2. Call Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // High intelligence, insane speed
      temperature: 0.6,        // Slightly creative but focused
      max_tokens: 300,
    });

    // 3. Extract content
    const strategy = chatCompletion.choices[0]?.message?.content || "Could not generate strategy.";

    res.json({ success: true, strategy });

  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({ success: false, message: "AI Agent is offline." });
  }
});

module.exports = router;
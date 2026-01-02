const express = require('express');
const router = express.Router();
const multer = require('multer');
const Event = require('../models/Event'); 
const pdfParse = require('pdf-parse');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/scan-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

        console.log(`📄 Scanning: ${req.file.originalname}`);

        // 1. EXTRACT TEXT
        let resumeText = "";
        try {
            const data = await pdfParse(req.file.buffer);
            resumeText = data.text.toLowerCase();
        } catch (err) {
            console.error("❌ PDF Parse Error:", err.message);
            return res.status(500).json({ msg: "Failed to read PDF content" });
        }

        // 2. DETECT SKILLS
        const keywords = [
            'react', 'node', 'javascript', 'python', 'java', 'cpp', 'html', 'css', 
            'machine learning', 'engineering', 'technology', 'student', 'fresher', 'intern', 'developer', 'sql', 'mongodb'
        ];

        const detectedSkills = keywords.filter(skill => resumeText.includes(skill));
        console.log("🔍 Skills Found:", detectedSkills);

        // 3. GET MATCHES (With Category Check)
        const allEvents = await Event.find({});
        
        // This is sent from the frontend FormData
        const targetCategory = req.body.category; 

        const matchedEvents = allEvents.filter(event => {
            // A. Skill Check
            const eventString = JSON.stringify(event).toLowerCase();
            const hasSkill = detectedSkills.some(skill => eventString.includes(skill));

            // B. Category Check (The Fix)
            // If the frontend sent "Internship", we ensure the event is an "Internship"
            let isCorrectCategory = true;
            if (targetCategory) {
                isCorrectCategory = 
                    (event.eventType === targetCategory) || 
                    (event.category === targetCategory) || 
                    (event.type === targetCategory);
            }

            return hasSkill && isCorrectCategory;
        });

        console.log(`✅ Matches: ${matchedEvents.length} | Filtered by: ${targetCategory || 'None'}`);

        res.json({
            detectedSkills: detectedSkills,
            matches: matchedEvents
        });

    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
});

module.exports = router;
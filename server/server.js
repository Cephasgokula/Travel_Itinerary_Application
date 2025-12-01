const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Helper function to call Gemini API
async function callGeminiAPI(prompt) {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
            }
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Generate itinerary
app.post('/api/generate-itinerary', async (req, res) => {
    try {
        const { destination, startDate, endDate, days, interests, budget } = req.body;

        // Validate input
        if (!destination || !interests || !budget || !days) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const interestsStr = interests.join(', ');

        const prompt = `You are a travel expert. Create a detailed travel plan for ${destination}.

Trip Details:
- Duration: ${days} days
- Dates: ${startDate} to ${endDate}
- Interests: ${interestsStr}
- Budget Level: ${budget} (low = budget-friendly, medium = moderate spending, high = luxury)
- Currency: Indian Rupees (INR/₹) - All prices must be in INR

Please provide the response in the following JSON format ONLY (no markdown, no code blocks, just pure JSON):

{
    "highlights": {
        "topAttractions": [
            {
                "name": "Attraction Name",
                "reason": "One sentence explaining why this matches the user's interests"
            }
        ],
        "offbeatRecommendations": [
            {
                "name": "Hidden Gem Name",
                "reason": "One sentence explaining why this is special"
            }
        ]
    },
    "itinerary": [
        {
            "day": 1,
            "title": "Day Theme",
            "morning": {
                "activity": "Activity description",
                "location": "Location name",
                "duration": "2 hours",
                "travelTime": "15 min from hotel"
            },
            "afternoon": {
                "activity": "Activity description",
                "location": "Location name",
                "duration": "3 hours",
                "travelTime": "20 min from morning location"
            },
            "evening": {
                "activity": "Activity description",
                "location": "Location name",
                "duration": "2-3 hours",
                "travelTime": "10 min"
            },
            "tip": "Useful tip for this day"
        }
    ],
    "budget": {
        "currency": "INR",
        "accommodation": {
            "perNight": 3500,
            "total": 10500,
            "description": "3-star hotel in central area"
        },
        "food": {
            "perDay": 1500,
            "total": 4500,
            "description": "Mix of local restaurants and cafes"
        },
        "transport": {
            "perDay": 800,
            "total": 2400,
            "description": "Public transport and occasional taxi"
        },
        "activities": {
            "total": 3000,
            "description": "Entry fees and guided tours"
        },
        "grandTotal": 20400,
        "tips": "Additional budget tips"
    }
}

Requirements:
- Include exactly 5 top attractions and 2 offbeat recommendations in highlights
- Create itinerary for exactly ${days} days
- Adjust all prices based on ${budget} budget level
- Make activities relevant to interests: ${interestsStr}
- Be specific with location names and realistic with time estimates`;

        const response = await callGeminiAPI(prompt);

        // Parse JSON response
        let parsedData;
        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                parsedData = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON found in response');
            }
        } catch (parseError) {
            console.error('Parse error:', parseError);
            throw new Error('Failed to parse itinerary data');
        }

        res.json({ success: true, data: parsedData });

    } catch (error) {
        console.error('Error generating itinerary:', error);
        res.status(500).json({ error: error.message || 'Failed to generate itinerary' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

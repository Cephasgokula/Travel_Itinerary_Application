# 🌍 Travel Itinerary Assistant

A web application that helps travelers plan personalized trips using AI-powered recommendations.

---

## ✨ Features

- **Destination Input**: Enter any travel destination
- **Date Selection**: Pick your travel dates (3-5 days recommended)
- **Interest Selection**: Choose from 8 categories (Beaches, History, Nightlife, Nature, Food, Adventure, Culture, Shopping)
- **Budget Selection**: Choose Budget, Moderate, or Luxury
- **AI-Generated Itinerary**: Get personalized day-by-day travel plans
- **Budget Estimation**: Cost breakdown in Indian Rupees (₹)
- **Print Option**: Print your itinerary for offline use

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Tailwind CSS |
| Backend | Node.js, Express.js |
| AI | Google Gemini 2.0 Flash API |

---

## 📁 Project Structure

```
travel-itinerary-assistant/
│
├── client/                    # React Frontend (Port 3000)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TripForm.js
│   │   │   ├── Loading.js
│   │   │   └── Results.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                    # Node.js Backend (Port 5000)
│   ├── server.js
│   ├── .env                   # Create this file (see setup below)
│   └── package.json
│
├── index.html                 # Standalone version (no setup needed)
└── README.md
```

---

## 🔑 Get Your Gemini API Key

Before running the project, you need a **Google Gemini API key**:

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated API key

---

## 🚀 How to Run the Project

### Prerequisites

You need **Node.js** installed on your computer.

**Download Node.js:** https://nodejs.org/ (Choose LTS version)

**Verify installation:**
```bash
node --version
npm --version
```

---

## Option 1: Run Full Application (React + Node.js)

You need **2 terminal windows** - one for backend, one for frontend.

### Step 1: Setup Backend Environment

Navigate to the server folder and create a `.env` file:

```bash
cd server
```

Create a file named `.env` in the `server` folder with the following content:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

⚠️ **Important:** Replace `your_gemini_api_key_here` with your actual Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

**Example:**
```env
GEMINI_API_KEY= example_gemini_api_key
PORT=5000
```

---

### Step 2: Start Backend Server

Open **Terminal 1** and run:

```bash
# Go to server folder
cd server

# Install dependencies
npm install

# Start the server
npm start
```

✅ You should see: `Server running on port 5000`

⚠️ **Keep this terminal open!**

---

### Step 3: Start React Frontend

Open **Terminal 2** (new window) and run:

```bash
# Go to client folder
cd client

# Install dependencies
npm install

# Start React app
npm start
```

✅ You should see: `Compiled successfully!`

✅ Browser opens automatically at `http://localhost:3000`

---

### Step 4: Use the Application

1. Open `http://localhost:3000` in your browser
2. Enter a destination (e.g., "Goa", "Paris", "Tokyo")
3. Select your travel start and end dates
4. Click on interests that match your preferences
5. Select your budget range
6. Click **"Generate My Itinerary"**
7. Wait for the AI to create your personalized travel plan
8. View and print your itinerary!

---

## Option 2: Quick Start (No Installation)

If you just want to try the app without any setup:

**Simply open the `index.html` file in your web browser!**

```bash
# Mac
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

Or just double-click the `index.html` file.

> **Note:** The standalone version uses a built-in API key which may have usage limits.

---

## 🔧 Troubleshooting

### "npm: command not found"
→ Install Node.js from https://nodejs.org/

### "GEMINI_API_KEY not set" or "Invalid API Key"
→ Make sure you created the `.env` file in the `server` folder
→ Verify your API key is correct (no extra spaces or quotes)
→ Get a new key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### "Port 5000 already in use"
→ Change the port in `server/.env`:
```
PORT=5001
```
→ Also update `client/src/App.js`:
```javascript
const API_URL = 'http://localhost:5001/api';
```

### "Network Error" when generating itinerary
→ Make sure the backend server is running (Terminal 1)
→ Verify your `.env` file exists and contains a valid API key

### Page shows blank
→ Make sure React app is running (Terminal 2)

---

## 📸 Quick Visual Guide

```
┌─────────────────────────────────────────────────────────────┐
│                    STEP 0: Create .env file                  │
│  Create file: server/.env                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ GEMINI_API_KEY=your_api_key_here                    │    │
│  │ PORT=5000                                            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    TERMINAL 1 (Backend)                      │
│  $ cd server                                                 │
│  $ npm install                                               │
│  $ npm start                                                 │
│  Server running on port 5000 ✓                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    TERMINAL 2 (Frontend)                     │
│  $ cd client                                                 │
│  $ npm install                                               │
│  $ npm start                                                 │
│  Compiled successfully! ✓                                    │
│  Open http://localhost:3000                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    BROWSER                                   │
│  http://localhost:3000                                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  🌍 Travel Itinerary Assistant                      │    │
│  │                                                      │    │
│  │  Destination: [Paris____________]                    │    │
│  │  Start Date:  [2024-03-15]  End Date: [2024-03-18]  │    │
│  │                                                      │    │
│  │  Interests: [History] [Food] [Culture]              │    │
│  │  Budget: [Moderate]                                  │    │
│  │                                                      │    │
│  │  [🎯 Generate My Itinerary]                         │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```


## 📝 Summary

| What | Command | Port |
|------|---------|------|
| Setup | Create `server/.env` with your Gemini API key | - |
| Backend | `cd server && npm install && npm start` | 5000 |
| Frontend | `cd client && npm install && npm start` | 3000 |
| Standalone | Open `index.html` in browser | - |

---

## 🔐 Security Note

- Never commit your `.env` file to GitHub
- The `.env` file is already in `.gitignore` to keep your API key safe
- If you accidentally expose your API key, regenerate it immediately at [Google AI Studio](https://aistudio.google.com/app/apikey)

---

**Happy Traveling! ✈️🌍**

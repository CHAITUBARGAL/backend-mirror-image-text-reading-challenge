// MERN Stack Mirror-Image Text Reading Challenge

// Step 1: Backend (Node.js + Express.js + MongoDB Atlas)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
const atlasUri = 'mongodb+srv://chetan11:Chetan11@cluster0.i3lteiy.mongodb.net/mirrortext?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(atlasUri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define Schema & Model
const AttemptSchema = new mongoose.Schema({
  userInput: String,
  correctText: String,
  timeTaken: Number,
  isCorrect: Boolean,
  attempts: Number,
});

const Attempt = mongoose.model('Attempt', AttemptSchema, 'mirrortext');

// API Endpoints
app.get('/api/mirror-text', (req, res) => {
  const texts = ['Hello', 'World', 'Mirror', 'React', 'NodeJS'];
  const text = texts[Math.floor(Math.random() * texts.length)];
  const mirrorText = text.split('').reverse().join('');
  res.json({ text: mirrorText, correctText: text });
});

app.post('/api/submit', async (req, res) => {
  const { userInput, correctText, timeTaken, attempts } = req.body;
  const isCorrect = userInput === correctText;
  
  const attempt = new Attempt({ userInput, correctText, timeTaken, isCorrect, attempts });
  await attempt.save();
  res.json({ success: true, isCorrect, timeTaken, attempts });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
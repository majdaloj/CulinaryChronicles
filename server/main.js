const express = require('express');
const OpenAI = require('openai');
const app = express();
app.use(express.json());

require('dotenv').config();
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY, // Access the API key from environment variable
});

// Handle POST requests to /generateMealPlan
app.post('/generateMealPlan', async (req, res) => {
  try {
    // Parse input data from request body
    const { famousPerson, dietaryRestrictions, mealPlanDuration } = req.body;
    let prompt;
    if (
      mealPlanDuration === 'breakfast' ||
      mealPlanDuration === 'lunch' ||
      mealPlanDuration === 'dinner' ||
      mealPlanDuration === '1 day'
    ) {
      prompt = `I want to eat like ${famousPerson} for a day. Generate a meal plan with a complete recipes for ONE DAY me based on ${famousPerson}'s food preferences. I want to eat what ${famousPerson} liked to eat, historically recorded. Make sure the recipe does not have anything listed in my dietary restrictions: ${dietaryRestrictions}. The output should be of format: {"mealplan": {Day 1:{Breakfast: recipe, Lunch: recipe, Dinner: recipe}, Day 2, etc}.`; // Please include recipes for each meal as you list it!`;
    } else if (mealPlanDuration === '3 days') {
      prompt = `I want to eat like ${famousPerson} for 3 days. Generate a meal plan for 3 days me based on ${famousPerson}'s food preferences. Make the recipes compatible with my dietary restrictions: ${dietaryRestrictions}. The output should be of format: {"mealplan": {Day 1:{Breakfast: x, Lunch: x, Dinner: x}, Day 2, etc}. Make sure the recipe does not have anything listed in my dietary restrictions: ${dietaryRestrictions}. `;
    } else {
      prompt = `I want to eat like ${famousPerson} for 7 days. Generate a meal plan for 7 days me based on ${famousPerson}'s food preferences and meals they actually ate. Make the recipes compatible with my dietary restrictions: ${dietaryRestrictions}. The output should be of format: {"mealplan": {Day 1:{Breakfast: x, Lunch: x, Dinner: x}, Day 2, etc}. Make sure the recipe does not have anything listed in my dietary restrictions: ${dietaryRestrictions}.`;
    }
    // Generate message based on input data
    const message = {
      role: 'user',
      content: prompt,
    };

    // Request meal plan generation from OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [message],
      max_tokens: 1000, // Adjust max_tokens as needed
    });

    // Extract generated meal plan from API response
    const generatedMealPlan = response.choices[0].message.content;

    // Send generated meal plan back as response
    res.json({ mealPlan: generatedMealPlan });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

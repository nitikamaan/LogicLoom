const axios = require("axios");

exports.getRecommendation = async (req, res) => {
  try {
    const employee = req.body;

    if (!employee) {
      return res.status(400).json({ message: "No employee data received" });
    }

    const prompt = `
Analyze employee performance:

Name: ${employee.name}
Skills: ${employee.skills}
Performance Score: ${employee.performanceScore}

Give:
1. Promotion Recommendation
2. Ranking
3. Training Suggestions
4. Improvement Feedback
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Employee AI System"
        }
      }
    );

    return res.json(response.data);

  } catch (error) {
  console.log("🔥 ========== FULL AI ERROR ==========");

  console.log("STATUS:", error.response?.status);
  console.log("DATA:", JSON.stringify(error.response?.data, null, 2));
  console.log("MESSAGE:", error.message);

  return res.status(500).json({
    message: "AI Failed",
    error: error.response?.data || error.message
  });
}
};
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const ValidationError = require("./error-handlers");

const APP = express();

APP.use(express.urlencoded({ extended: false }));
APP.use(express.json());
APP.use(cors({
  origin: "*"
}));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

APP.post('/generate', async (req, res, next) => {
  const { idea } = req.body;
  try {
    if (!idea) {
      throw new ValidationError("idea is required");
    }
    const response = await openai.createCompletion({
      model: process.env.OPENAI_MODEL,
      prompt: `Business wise, give feedback on ${idea},`,
      temperature: 0.6,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    });

    res.status(200).json({
      data: response.data.choices[0].text,
      message: "Idea generated successfully",
      success: true
    });
  } catch (error) {
    next(error)
  }
});


APP.use((err, req, res, next) => {
  const statusCode = (err.statusCode)? err.statusCode : 500;
  const errMsg = (err.message && err.message !== "")? err.message : "An error occured on our API server while processing your request";
  return res.status(statusCode).json({ data: null, success: false, message: errMsg });
});

const PORT = process.env.PORT || 3000;
APP.listen(PORT, () => {
  console.log(`API running on PORT ${PORT}`)
});
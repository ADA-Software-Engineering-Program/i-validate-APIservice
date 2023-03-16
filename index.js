if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const APP = express();

APP.use(express.urlencoded({ extended: false }));
APP.use(express.json());
APP.use(cors({
  origin: "*"
}));

APP.post('/generate', (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
});


APP.use((err, req, res, next) => {
  return res.json({ err });
})

const PORT = process.env.PORT || 3000;
APP.listen(PORT, () => {
  console.log(`API running on PORT ${PORT}`)
});
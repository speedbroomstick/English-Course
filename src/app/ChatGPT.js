const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

class ChatGPT {
  constructor(OPENAI_API_KEY) {
    this.configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  async get(audio) {
    try {
      const filePath = audio;
      axios.defaults.maxBodyLength = Infinity; // Set the maxBodyLength to Infinity

      const resp = await this.openai.createTranscription(
        fs.createReadStream(filePath),
        "whisper-1",
        "Remove all punctuation from your answer",
        "json",
        0,
       "en"
      );

      return resp.data.text;
    } catch (error) {
      console.log("ОШИБКА");
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
}

module.exports = ChatGPT;

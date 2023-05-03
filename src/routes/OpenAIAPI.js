module.exports = (io) => {
    const express = require("express");
    const router = express.Router();
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    
    app.get('/api/gpt', async (req, res) => {
      try {
    
        const response = await openai.createImage({
          prompt: "Курящий человек смотрящий в окно",
          n: 2,
          size: "1024x1024",
        });
    
       /* const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: "Переведи слово МАШИНА на английский",
        }); 
        console.log(completion.data.choices[0].text);*/
        console.log(response.data);
      
      
      } catch (error) {
        console.log('ОШИБКА');
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
      res.render("main");
    });
  

  
    return router;
  };
  
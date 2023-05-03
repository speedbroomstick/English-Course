const { array } = require("joi");

module.exports = (io) => {
  const express = require("express");
  const router = express.Router();
  const Words = require("../app/Words");
  const MySql = require("../app/MySql");
  let allWords;
  let order;
  let orderOptions = [];
  router.get("/chek_answer", async (req, res) => {
    try {
      let question = req.query.question;
      let numberQuestion = req.query.numberQuestion;
      let answer = req.query.answer;
      let chetQuestions = req.query.chetQuestions;
      let isAnswerCorrect = false;
      if(answer == allWords[order[chetQuestions]].translation){
        isAnswerCorrect = true;
      }
      await io.emit(
        "answersToTest",
        parseInt(chetQuestions) + 1,
        allWords,
        order,
        orderOptions,
        isAnswerCorrect
      );
      res.send("Answer checked!");
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error.");
    }
  });

  router.get("/word_training", async (req, res) => {
    words = new Words(new MySql());
    allWords = await words.getAllWords();
    const numbers = new Set();
    let max = allWords.length - 1;
    while (numbers.size < max) {
      const randomNumber = Math.floor(Math.random() * (max - 0 + 1)) + 0;
      numbers.add(randomNumber);
    }
    order = Array.from(numbers);
    orderOptions = randomAnswersOpetions();
    res.render("word_training", {
      allWords: allWords,
      order: order,
      chetQuestions: 0,
      orderOptions: orderOptions
    });
  });

  router.get("/dictionary", async (req, res) => {
    const ofset = (req.query.page - 1 || 0) * 10;
    words = new Words(new MySql());
    result = await words.getWords(2, ofset, 10);
    allWords = await words.getAllWordsGroup(2);
    let count = allWords.length;
    if (count % 10 == 0) {
      count /= 10;
    } else {
      count /= 10;
      count++;
      count = parseInt(count);
    }
    res.render("dictionary", { words: result, count: count });
  });

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }  

  function randomAnswersOpetions() {
    let orderOptions = [];
    let max = allWords.length - 1;
    for (let i = 0; i < allWords.length-1; i++) {
      let number = new Set();
      number.add(allWords[order[i]].translation);
      while (number.size < 4) {
        let randomNumber = Math.floor(Math.random() * (max - 0 + 1)) + 0;
        number.add(allWords[randomNumber].translation);
      }
      orderOptions.push(shuffleArray(Array.from(number)));
    }
    return orderOptions;
  }

  return router;
};

const { array } = require("joi");

module.exports = (io) => {
  const express = require("express");
  const router = express.Router();
  const Words = require("../app/Words");
  const MySql = require("../app/MySql");
  const Test = require("../app/Test");
  let test;
  router.get("/chek_answer_level2", async (req, res) => {
    try {
      await io.emit(
        "answer_level2",
        parseInt(req.query.chetQuestions) + 1,
        test.data,
        test.order,
        await test.checkAnswer(
          req.query.answer,
          req.query.chetQuestions,
          "word"
        )
      );
      res.send("Answer checked!");
    } catch (err) {
      console.error(err);
    }
  });

  router.get("/chek_answer_level1", async (req, res) => {
    try {
      await io.emit(
        "answer_level1",
        parseInt(req.query.chetQuestions) + 1,
        test.data,
        test.order,
        test.orderOptions,
        await test.checkAnswer(
          req.query.answer,
          req.query.chetQuestions,
          "translation"
        )
      );
      res.send("Answer checked!");
    } catch (err) {
      console.error(err);
    }
  });
  router.get("/word_training_level1", async (req, res) => {
    let words = new Words(new MySql());
    test = new Test(await words.getAllWords(), "translation");
    res.render("dictionary/word_training/word_training", {
      allWords: test.data,
      order: test.order,
      chetQuestions: 0,
      orderOptions: test.orderOptions,
      level: 1,
    });
  });
  router.get("/word_training_level2", async (req, res) => {
    let words = new Words(new MySql());
    test = new Test(await words.getAllWords(), "translation");
    res.render("dictionary/word_training/word_training", {
      allWords: test.data,
      order: test.order,
      chetQuestions: 0,
      orderOptions: test.orderOptions,
      level: 2,
    });
  });
  router.get("/dictionary", async (req, res) => {
    const ofset = (req.query.page - 1 || 0) * 10;
    words = new Words(new MySql());
    result = await words.getWords(2, ofset, 10);
    let allWords = await words.getAllWordsGroup(2);
    let count = allWords.length;
    if (count % 10 == 0) {
      count /= 10;
    } else {
      count /= 10;
      count++;
      count = parseInt(count);
    }
    res.render("dictionary/dictionary", { words: result, count: count });
  });
  return router;
};

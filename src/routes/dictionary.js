const { array } = require("joi");

module.exports = (io) => {
  const express = require("express");
  const router = express.Router();
  const Words = require("../app/Words");
  const MySql = require("../app/MySql");
  const Test = require("../app/Test");
  const FireBase = require("../app/FireBase");
  const DictionaryGroup = require("../app/DictionaryGroup");
  let numberGroup;
  let test;
  let words;
  let count;
  router.get("/chek_answer_level2", async (req, res) => {
    try {
      await io.emit(
        "answer_level2",
        await test.checkAnswer(
          req.query.answer,
          "word"
        ),
        test.data,
        test.order,
        test.chetQuestions,
        test.countToAdd,
        test.correctAnswer
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
        await test.checkAnswer(req.query.answer, "translation"),
        test.data,
        test.order,
        test.orderOptions,
        test.chetQuestions,
        test.countToAdd,
        test.correctAnswer
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
      chetQuestions: test.chetQuestions,
      orderOptions: test.orderOptions,
      level: 1,
    });
  });
  router.get("/word_training_level2", async (req, res) => {
    let words = new Words(new MySql());
    test = new Test(await words.getAllWords(), false);
    res.render("dictionary/word_training/word_training", {
      allWords: test.data,
      order: test.order,
      chetQuestions: test.chetQuestions,
      level: 2,
    });
  });
  router.get("/dictionary", async (req, res) => {
    let groups = new DictionaryGroup(new MySql(), new FireBase());
    let dataDictionaryGroup = await groups.getGroup();
    res.render("dictionary/groupDictionary", { datas: dataDictionaryGroup });
  });
  router.get("/show_words", async (req, res) => {
    numberGroup = req.query.Id;
    const ofset = (req.query.page - 1 || 0) * 10;
    words = new Words(new MySql());
    let result = await words.getWords(req.query.Id || numberGroup, ofset, 10);
    let allWords = await words.getAllWordsGroup(req.query.Id || numberGroup);
   count = allWords.length;
    if (count % 10 == 0) {
      count /= 10;
    } else {
      count /= 10;
      count++;
      count = parseInt(count);
    }
    res.render("dictionary/dictionary", { words: result, count: count });
  });
  router.get("/show_words_next", async (req, res) => {
    const ofset = (req.query.page - 1 || 0) * 10;
    let result = await words.getWords(numberGroup, ofset, 10);
    res.render("dictionary/dictionary", { words: result, count: count });
  });
router.get("/endLeson", async (req, res) => {
  res.render("main/main");
});
  return router;
};

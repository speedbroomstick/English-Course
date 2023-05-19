class Test {
  constructor(data, key) {
    this.data = data;
    this.copyForOptios = [...this.data];
    this.order = this.randomArray(data.length);
    this.key = key;
    this.progress = new Array(data.length).fill(null);
    this.chetQuestions = 0;
    this.copyData = [];
    this.countToAdd = 100 / data.length;
    this.correctAnswer;
    if (key != false) {
      this.orderOptions = this.randomAnswersOptions(this.copyForOptios, key);
    }
  }

  async checkAnswer(answer, key, type="text") {
    let state = false;
    if(type === "audio"){
     let countWords = this.countWords(this.data[this.order[this.chetQuestions]][key]);
      if(countWords == 1){
        state = this.checkAudioAnswers(answer, this.data[this.order[this.chetQuestions]][key], state, 1);
      }else if(countWords == 2){
        state = this.checkAudioAnswers(answer, this.data[this.order[this.chetQuestions]][key], state, 2);
      }else if(countWords >= 3 && countWords <= 5){
        state = this.checkAudioAnswers(answer, this.data[this.order[this.chetQuestions]][key], state, 5);
      }else{
        state = this.checkAudioAnswers(answer, this.data[this.order[this.chetQuestions]][key], state, 8);
      }
    }else{
      state = this.checkTextAnswers(answer, this.data[this.order[this.chetQuestions]][key], state)
    }
    this.correctAnswer = this.data[this.order[this.chetQuestions]][key];
    this.chetQuestions++;
    await this.checkQuestionsEnd(this.chetQuestions);
    return state;
  }
  checkTextAnswers(answerOne,answerTwo,state){
    if (answerOne === answerTwo) {
      this.progress[this.chetQuestions] = false;
      state = true;
    } else {
      this.progress[this.chetQuestions] = true;
    }
    return state;
  }
  checkAudioAnswers(answerOne,answerTwo,state,max){
    if (this.levenshteinDistance(this.changeAudioAnswer(answerOne),this.changeAudioAnswer(answerTwo)) <= max) {
      this.progress[this.chetQuestions] = false;
      state = true;
    } else {
      this.progress[this.chetQuestions] = true;
    }
    return state
  }
  changeAudioAnswer(answer){
    return answer.replace(/[^\w\s]/g, "").toLowerCase();
  }
  async checkQuestionsEnd(chetQuestions) {
    if (chetQuestions == this.data.length) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.progress[i]) {
          this.copyData.push(this.data[this.order[i]]);
        }
      }
      this.chetQuestions = 0;
      this.data.splice(0, this.data.length, ...this.copyData);
      this.order = this.randomArray(this.data.length);
      this.copyData = [];
      this.progress = new Array(this.data.length).fill(null);
      if (this.key != false) {
        this.orderOptions = this.randomAnswersOptions(this.data, this.key);
      }
    }
  }
  countWords(str) {
    str = str.trim();
    var words = str.split(/\s+/);
    return words.length;
  }
  
  randomArray(max) {
    const numbers = new Set();
    while (numbers.size < max) {
      const randomNumber = Math.floor(Math.random() * (max - 1 - 0 + 1)) + 0;
      numbers.add(randomNumber);
    }
    return Array.from(numbers);
  }
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  randomAnswersOptions(data, key) {
    let orderOptions = [];
    let max = this.copyForOptios.length;
    for (let i = 0; i < this.data.length; i++) {
      let number = new Set();
      number.add(data[this.order[i]][key]);
      while (number.size < 4) {
        let randomNumber = Math.floor(Math.random() * (max - 1 - 0 + 1)) + 0;
        number.add(this.copyForOptios[randomNumber][key]);
      }
      orderOptions.push(this.shuffleArray(Array.from(number)));
    }
    return orderOptions;
  }
  levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        const cost = a[j - 1] === b[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[b.length][a.length];
  }
}

module.exports = Test;

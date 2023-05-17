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
    if(key != false){
    this.orderOptions = this.randomAnswersOptions(this.copyForOptios, key);
    }
  }

  async checkAnswer(answer, key) {
    console.log(answer);  
    let state = false;
    if (answer.toLowerCase() === this.data[this.order[this.chetQuestions]][key].toLowerCase()) {
      this.progress[this.chetQuestions] = false;
      state = true;
    } else {
      this.progress[this.chetQuestions] = true;
    }
    this.chetQuestions++;
    await this.checkQuestionsEnd(this.chetQuestions);
    return state;
  }
  async checkQuestionsEnd(chetQuestions){
    if(chetQuestions == this.data.length){
      for(let i = 0; i < this.data.length; i++){
        if(this.progress[i]){
          this.copyData.push(this.data[this.order[i]]);
        }
      }
      this.chetQuestions = 0;
      this.data.splice(0, this.data.length, ...this.copyData);
      this.order = this.randomArray(this.data.length);
      this.copyData = [];
      this.progress = new Array(this.data.length).fill(null);
      if(this.key != false){
        this.orderOptions = this.randomAnswersOptions(this.data, this.key);
        }
    }

  }
  randomArray(max) {
    const numbers = new Set();
    while (numbers.size < max) {
      const randomNumber = Math.floor(Math.random() * ((max-1) - 0 + 1)) + 0;
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
        let randomNumber = Math.floor(Math.random() * ((max-1) - 0 + 1)) + 0;
        number.add(this.copyForOptios[randomNumber][key]);
      }
      orderOptions.push(this.shuffleArray(Array.from(number)));
    }
    return orderOptions;
  }
}

module.exports = Test;

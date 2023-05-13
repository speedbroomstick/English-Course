class Test {
  constructor(data, key) {
    this.data = data;
    this.order = this.randomArray(data.length);
    if(key != false){
    this.orderOptions = this.randomAnswersOptions(data, key);
    }
  }

  async checkAnswer(answer, chetQuestions, key) {
    console.log(answer.toLowerCase());
    console.log(this.data[this.order[chetQuestions]][key].toLowerCase());
    if (answer.toLowerCase() == this.data[this.order[chetQuestions]][key].toLowerCase()) {
      return true;
    }
    return false;
  }

  randomArray(max) {
    const numbers = new Set();
    while (numbers.size < max) {
      const randomNumber = Math.floor(Math.random() * (max - 0 + 1)) + 0;
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
    let max = data.length - 1;
    for (let i = 0; i < max; i++) {
      let number = new Set();
      number.add(data[this.order[i]][key]);
      while (number.size < 4) {
        let randomNumber = Math.floor(Math.random() * (max - 0 + 1)) + 0;
        number.add(data[randomNumber][key]);
      }
      orderOptions.push(this.shuffleArray(Array.from(number)));
    }
    return orderOptions;
  }
}

module.exports = Test;

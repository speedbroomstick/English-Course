class Words {
    constructor(mySql) {
      this.mySql = mySql;
    }
    async getAllWords(idGroup){
      let result = await this.mySql.query("SELECT * FROM words WHERE idGroup = " + idGroup);
      return result;
     }
    async getWords(idGroup,ofset,limit){
     let result = await this.mySql.query("SELECT * FROM words WHERE idGroup = " + idGroup+ " LIMIT "+ ofset + ", "+ limit);
     return result;
    }
    async insertUser(login, password){
      let result = await this.mySql.query("INSERT INTO users (login,password) VALUES ('"+login+"','"+password+"')");
      return true;
     }
  }
  
  module.exports = Words;
  
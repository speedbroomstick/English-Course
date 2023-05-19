class Users {
  constructor(mySql) {
    this.mySql = mySql;
  }

  async getUser(login, password){
   let result = await this.mySql.query("SELECT * FROM users WHERE login = '" + login + "' and password = '" +password+"'");
   if(result && result.length > 0){
   return true;
   }
  }
  async getUserInformation(login, password){
    let result = await this.mySql.query("SELECT * FROM users WHERE login = '" + login + "' and password = '" +password+"'");
    if(result && result.length > 0){
    return result;
    }
   }
  async getUserForLogin(login){
    let result = await this.mySql.query("SELECT * FROM users WHERE login = '" + login + "'");
    if(result && result.length > 0){
    return true;
    }
    return false;
  }
  async insertUser(login, password){
    if(await this.getUserForLogin(login)==true){return "Такой логин уже занят, выберите другой!";}
    let result = await this.mySql.query("INSERT INTO users (login,password) VALUES ('"+login+"','"+password+"')");
    return true;
   }
}

module.exports = Users;

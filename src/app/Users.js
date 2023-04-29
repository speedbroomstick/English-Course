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
  async insertUser(login, password){
    let result = await this.mySql.query("INSERT INTO users (login,password) VALUES ('"+login+"','"+password+"')");
    return true;
   }
}

module.exports = Users;

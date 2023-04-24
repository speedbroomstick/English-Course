class Users {
  constructor(mySql) {
    this.mySql = mySql;
  }

  async getUser(login, password){
   let result = await this.mySql.get("SELECT * FROM users WHERE login = '" + login + "' and password = '" +password+"'");
    console.log(result);
  }
}

module.exports = Users;

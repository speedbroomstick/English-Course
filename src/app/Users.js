class Users {
  constructor(mySql) {
    this.mySql = mySql;
  }

  async getUser(login, password){
   let result = await this.mySql.query("SELECT * FROM users WHERE login = '" + login + "' and password = '" +password+"'");
   if(result && result.length > 0){
   alert("Вы успешно вошли!");
   }else{
    alert("Ошибка входа!");
   }
  }
  async insertUser(login, password){
    let result = await this.mySql.query("INSERT INTO users (login,password) VALUES ('"+login+"','"+password+"')");
    alert("Пользователь успешно добавлен!");
   }
}

module.exports = Users;

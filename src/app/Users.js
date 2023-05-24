class Users {
  constructor(mySql) {
    this.mySql = mySql;
  }
  async getAllUser(){
    let result = await this.mySql.query("SELECT * FROM users");
    return result;
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
    let query = "INSERT INTO `CompletedCourses` (idUser,idCourse,procent) VALUES";
    let courses = await this.mySql.query("SELECT * FROM `courses` ");
    courses.forEach(element => {
      query += "("+ result.insertId +","+ element.id_course +",0),";
    });
    query = query.substring(0, query.length - 1) + ";";
    await this.mySql.query(query);
    return true;
   }
}

module.exports = Users;

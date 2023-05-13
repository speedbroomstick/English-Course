class Courses {
    constructor(mySql,fireBase) {
      this.mySql = mySql;
      this.fireBase = fireBase;
    }
  
    async getCourses(){
     let result = await this.mySql.query("SELECT * FROM courses");
     return this.decodeUrl(result);
    }
    async getTests(idTest){
      let result = await this.mySql.query("SELECT * FROM tests WHERE idtest = "+idTest);
      return result;
     }
    async getQuestionForTests(idTest){
      let result = await this.mySql.query("SELECT * FROM questionForTest WHERE test_id = "+ idTest);
      return result;
     }
    async decodeUrl(data){
        for(let i=0; i<data.length;i++){
            data[i].photo = await this.fireBase.getPictureUrl(data[i].photo);
        }
        return data;
    }
  }
  
  module.exports = Courses;
  
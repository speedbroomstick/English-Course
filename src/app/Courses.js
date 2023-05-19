class Courses {
    constructor(mySql,fireBase) {
      this.mySql = mySql;
      this.fireBase = fireBase;
    }
  
    async getCourses(){
     let result = await this.mySql.query("SELECT * FROM courses");
     return this.decodeUrl(result,'photo');
    }
    async getTests(idTest){
      let result = await this.mySql.query("SELECT * FROM tests WHERE idtest = "+idTest);
      return result;
     }
    async getQuestionForTests(idTest){
      let result = await this.mySql.query("SELECT * FROM questionForTest WHERE test_id = "+ idTest);
      return result;
     }
     async getVideo(idTest){
      let result = await this.mySql.query("SELECT * FROM `video` WHERE test_id = "+ idTest);
      return  this.decodeUrl(result,'link');;
     }
    async decodeUrl(data,key){
        for(let i=0; i<data.length;i++){
            data[i][key] = await this.fireBase.getPictureUrl(data[i][key]);
        }
        return data;
    }
  }
  
  module.exports = Courses;
  
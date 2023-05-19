class Courses {
    constructor(mySql,fireBase) {
      this.mySql = mySql;
      this.fireBase = fireBase;
    }
  
    async getCourses(){
     let result = await this.mySql.query("SELECT * FROM courses");
     return this.decodeUrl(result,'photo');
    }
    async getProgres(idUser){
      let result = await this.mySql.query("SELECT * FROM  `CompletedCourses` WHERE idUser = "+idUser);
      return result;
    }
    async getTests(id_course){
      let result = await this.mySql.query("SELECT * FROM tests WHERE id_course = "+id_course);
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
     async changeProcent(procent, idUser, idCourse){      
      let result = await this.mySql.query("UPDATE CompletedCourses SET procent = "+ procent +" WHERE idCourse = "+ idCourse +" AND idUser = "+ idUser +";");
      return result;
     }
    async decodeUrl(data,key){
        for(let i=0; i<data.length;i++){
            data[i][key] = await this.fireBase.getPictureUrl(data[i][key]);
        }
        return data;
    }
  }
  
  module.exports = Courses;
  
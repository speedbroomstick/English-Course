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
    async getAllTests(){
      let result = await this.mySql.query("SELECT * FROM tests");
      return result;
     }
    async getTests(id_course){
      let result = await this.mySql.query("SELECT * FROM tests WHERE id_course = "+id_course);
      return result;
     }
    async getAllQuestionForTests(){
      let result = await this.mySql.query("SELECT * FROM questionForTest");
      return result;
     }
    async getQuestionForTests(idTest){
      let result = await this.mySql.query("SELECT * FROM questionForTest WHERE test_id = "+ idTest);
      return result;
     }
     async getVideo(idTest){
      let result = await this.mySql.query("SELECT * FROM `video` WHERE test_id = "+ idTest);
      return  this.decodeUrl(result,'link');
     }
     async getRule(idTest){
      let result = await this.mySql.query("SELECT * FROM `rule` WHERE test_id = "+ idTest);
      return result;
     }
    async getAllRule(){
      let result = await this.mySql.query("SELECT * FROM `rule`");
      return result;
     }
     async getAllVideo(){
      let result = await this.mySql.query("SELECT * FROM `video`");
      return  this.decodeUrl(result,'link');
     }
     async changeProcent(procent, idUser, idCourse){      
      let result = await this.mySql.query("UPDATE CompletedCourses SET procent = "+ procent +" WHERE idCourse = "+ idCourse +" AND idUser = "+ idUser +";");
      return result;
     }

     async addCourseWithoutFoto(name,description,level){  
      let result = await this.mySql.query("INSERT INTO `courses` (name,description,level) VALUES ('"+ name +"','"+ description +"',"+ level +");");
      let query = "INSERT INTO `CompletedCourses` (idUser,idCourse,procent) VALUES";
      let users = await this.mySql.query("SELECT * FROM `users` ");
      users.forEach(element => {
        query += "("+ element.idUser +","+ result.insertId +",0),";
        });
      query = query.substring(0, query.length - 1) + ";";
      await this.mySql.query(query);
      return result;
      }
     async addCourse(name,description,level,file){  
     let result = await this.mySql.query("INSERT INTO `courses` (name,description,level,photo) VALUES ('"+ name +"','"+ description +"',"+ level +",'"+ await this.fireBase.uploadPicture(file) +"');");
     let query = "INSERT INTO `CompletedCourses` (idUser,idCourse,procent) VALUES";
     let users = await this.mySql.query("SELECT * FROM `users` ");
     users.forEach(element => {
       query += "("+ element.idUser +","+ result.insertId +",0),";
       });
     query = query.substring(0, query.length - 1) + ";";
     await this.mySql.query(query);
     return result;
     }
     async updateCourseWithoutFoto(name,description,level,id_course){      
      let result = await this.mySql.query("UPDATE `courses` SET name = '"+ name +"' ,description = '"+ description +"' , level = "+ level +" WHERE id_course = "+ id_course +";");
      return result;
     }
     async updateCourse(name,description,level,id_course,file){      
      let url = await this.fireBase.uploadPicture(file);
      let result = await this.mySql.query("UPDATE `courses` SET name = '"+ name +"' ,description = '"+ description +"' , level = "+ level +", photo = '"+ url +"' WHERE id_course = "+ id_course +";");
      return result;
     }
     async deleteCourse(id_course){      
      let result = await this.mySql.query("DELETE FROM `courses` WHERE id_course = "+ id_course +";");
      return result;
     }

     async addTest(name,description,course){      
      let resultCourse = await this.mySql.query("SELECT * FROM `courses` WHERE name = '"+ course +"';");
      let result = await this.mySql.query("INSERT INTO `tests` (name,id_course,description) VALUES ('"+ name +"',"+ resultCourse[0].id_course +",'"+ description +"');");
      return result;
     }
     async updateTest(name,description,course,idTest){
      let resultCourse = await this.mySql.query("SELECT * FROM `courses` WHERE name = '"+ course +"';");      
      let result = await this.mySql.query("UPDATE `tests` SET name = '"+ name +"' ,description = '"+ description +"' , id_course = "+ resultCourse[0].id_course +" WHERE idtest = "+ idTest +";");
      return result;
     }
     async deleteTest(idTest){      
      let result = await this.mySql.query("DELETE FROM `tests` WHERE idtest = "+ idTest +";");
      return result;
     }

     async addQuestion(question,answer,inputType,outputType,testID){      
      let resultTest =  await this.mySql.query("SELECT * FROM tests WHERE name = '"+testID+"';");
      let result = await this.mySql.query("INSERT INTO `questionForTest` (question,answer,type_i,type_oi,test_id) VALUES ('"+ question +"','"+ answer +"','"+ inputType +"','"+ outputType +"',"+ resultTest[0].idtest +");");
      return result;
     }
     async updateQuestion(question,answer,inputType,outputType,testID,questionId){
      let resultTest =  await this.mySql.query("SELECT * FROM tests WHERE name = '"+testID+"';");
      let result = await this.mySql.query("UPDATE `questionForTest` SET question = '"+ question +"' ,answer = '"+ answer +"' , type_i = '"+ inputType + "', type_oi = '"+ outputType +"', test_id = "+ resultTest[0].idtest +" WHERE idquestion = "+ questionId +";");
      return result;
     }
     async deleteQuestion(questionId){      
      let result = await this.mySql.query("DELETE FROM `questionForTest` WHERE idquestion = "+ questionId +";");
      return result;
     }

     async addWord(word,translation,wordTest,example){ 

      let result = await this.mySql.query("INSERT INTO words (word, translation, example, idGroup) VALUES ('"+ word +"', '"+ translation +"', '"+ example +"', "+ wordTest +");");
      return result;
     }
     async updateWord(word,translation,wordTest,example,idWords){
      let result = await this.mySql.query("UPDATE `words` SET word = '"+ word +"' ,translation = '"+ translation +"' , example = '"+ example + "', idGroup = "+ wordTest +" WHERE idWords = "+ idWords +";");
      return result;
     }
     async deleteWord(idWords){      
      let result = await this.mySql.query("DELETE FROM `words` WHERE idWords = "+ idWords +";");
      return result;
     }

     async addVideo(description,testId,file){  
      let result = await this.mySql.query("INSERT INTO `video` (link,description,test_id) VALUES ('"+ await this.fireBase.uploadPicture(file) +"','"+ description +"',"+ parseInt(testId) +");");
      return result;
      }
      async updateVideo(description,testId,videoID,file){    

       if (typeof file === 'undefined') {
        let result = await this.mySql.query("UPDATE `video` SET description = '"+ description +"' ,test_id = "+ testId +" WHERE idvideo = "+ videoID +";");
      } else {
        let result = await this.mySql.query("UPDATE `video` SET link = '"+ await this.fireBase.uploadPicture(file) +"',description = '"+ description +"' ,test_id = "+ testId +" WHERE idvideo = "+ videoID +";");
      }
       return result;
      }
      async deleteVideo(videoID){      
       let result = await this.mySql.query("DELETE FROM `video` WHERE idvideo = "+ videoID +";");
       return result;
      }


      async addRule(ruleTitle,ruleName,ruleText,testid){  
        ruleText = ruleText.replace(/['"]/g, '*');
        let result = await this.mySql.query("INSERT INTO `rule` (name,title,ruleText,test_id) VALUES ('"+ ruleName +"','"+ ruleTitle +"','"+ ruleText +"',"+ testid +");");
        return result;
      }
      async updateRule(ruleTitle,ruleName,ruleText,testid,ruleID){  
        ruleText = ruleText.replace(/['"]/g, '*');  
        let result = await this.mySql.query('UPDATE `rule` SET name = "'+ ruleName +'",title = "'+ ruleTitle +'" ,ruleText = "'+ ruleText +'",test_id = '+ testid +' WHERE idrule = '+ ruleID +';');
         return result;
      }
      async deleteRule(ruleID){      
         let result = await this.mySql.query("DELETE FROM `rule` WHERE idrule = "+ ruleID +";");
         return result;
      }




      async addGroupWithoutFoto(groupName,groupDesc){  
        let result = await this.mySql.query("INSERT INTO `group` (name,description) VALUES ('"+ groupName +"','"+ groupDesc +"');");
        return result;
        }
       async addGroup(groupName,groupDesc,idGroup,file){  
        let result = await this.mySql.query("INSERT INTO `group` (name,photo,description) VALUES ('"+ groupName +"','"+ await this.fireBase.uploadPicture(file) +"','"+ groupDesc +"');");
       return result;
       }
       async updateGroupWithoutFoto(groupName,groupDesc,idGroup){      
        let result = await this.mySql.query("UPDATE `group` SET name = '"+ groupName +"' ,description = '"+ groupDesc +"' WHERE idGroup = "+ idGroup +";");
        return result;
       }
       async updateGroup(groupName,groupDesc,idGroup,file){      
        let url = await this.fireBase.uploadPicture(file);
        let result = await this.mySql.query("UPDATE `group` SET name = '"+ groupName +"' ,description = '"+ groupDesc +"', photo = '"+ url +"' WHERE idGroup = "+ idGroup +";");
        return result;
       }
       async deleteGroup(idGroup){      
        let result = await this.mySql.query("DELETE FROM `group` WHERE idGroup = "+ idGroup +";");
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
  
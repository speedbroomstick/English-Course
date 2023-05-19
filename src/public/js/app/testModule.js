export class testModule {
  constructor() {
    this.width = 0;
  }

  async checkAnswer(isAnswerCorrect, data,countToAdd,url,path,note="Правильный ответ:") {
    if (isAnswerCorrect) {
      this.width += countToAdd;
      $(".progress-bar").css("width", this.width + "%");
      if (Math.abs(this.width - 100) < 0.0001) {
        let end =
          '<div id="notification">' +
          '<span id="text">Тренировка успешно окончена:' +
          "</span>" +
          "</div>";
        $(end).prependTo("body").fadeIn(500).fadeOut(4000);
        fetch("http://localhost:3000/"+url, {
          method: "GET",
        })
          .then((response) => {
            if (response.ok) {
              window.location.href = "/"+path;
            } else {
              console.error("Ошибка при получении ответа от сервера.");
            }
          })
          .catch((error) => {
            console.error("Произошла ошибка при выполнении запроса:", error);
          });
      }
    } else {
      let wrongHTML =
        '<div id="notification">' +
        '<span id="text">'+ note +' '+
        data +
        "</span>" +
        "</div>";
      $(wrongHTML).prependTo("body").fadeIn(500).fadeOut(3000);
    }
  }

  async sendAudioInformation(chunks, url){
    const audioBlob = new Blob(chunks, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("audioStream", audioBlob);
    formData.append("numberQuestion", $("#number_question").val());
    formData.append("chetQuestions", $("#chet_questions").val());

    fetch(url, {
      method: "POST",
      body: formData
    })
      .then(function (response) {
        console.log("Audio upload response:", response);
      })
      .catch(function (error) {
        console.error("Audio upload error:", error);
      });
  }

  async sendAnswerToServer(answer, url) {
    $.ajax({
      url: url, //"http://localhost:3000/chek_answer_level1",
      method: "GET",
      data: {
        answer: answer,
      },
      success: function (response) {
        console.log(response);
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });
  }
}

const startButton = document.getElementById("circlein");
const outlineElement = document.querySelector(".outline");

let mediaRecorder;
let chunks = [];
let switcher = true;

startButton.addEventListener("click", function () {
  if (switcher) {
    switcher = false;
    chunks = [];

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = function (e) {
          outlineElement.classList.remove("active"); 
          const audioBlob = new Blob(chunks, { type: "audio/webm" });
          const formData = new FormData();
          formData.append("audioStream", audioBlob);

          fetch("http://localhost:3000/upload-audio", {
            method: "POST",
            body: formData
          })
            .then(function (response) {
              console.log("Audio upload response:", response);
            })
            .catch(function (error) {
              console.error("Audio upload error:", error);
            });
        };

        mediaRecorder.start();
        outlineElement.classList.add("active");
      })
      .catch(function (error) {
        console.error("Ошибка доступа к микрофону:", error);
      });
  } else {
    switcher = true;
    mediaRecorder.stop();
    outlineElement.classList.remove("active");
  }
});
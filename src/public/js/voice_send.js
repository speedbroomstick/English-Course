const startButton = document.getElementById('start-recording');
const stopButton = document.getElementById('stop-recording');
const recordedAudio = document.getElementById('recorded-audio');

let mediaRecorder;
let chunks = [];

// запустить запись
startButton.addEventListener('click', function() {
  startButton.disabled = true;
  stopButton.disabled = false;
  chunks = [];

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      }

      mediaRecorder.onstop = function(e) {
        const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
        const audioURL = URL.createObjectURL(blob);
        recordedAudio.src = audioURL;

        const formData = new FormData();
        formData.append('audio', blob, 'audio.ogg');

        fetch('/upload-audio', {
          method: 'POST',
          body: formData
        })
        .then(function(response) {
          console.log('Аудио файл успешно отправлен на сервер');
        })
        .catch(function(error) {
          console.error('Ошибка при отправке аудио файла на сервер:', error);
        });
      }

      mediaRecorder.start();
    })
    .catch(function(error) {
      console.error('Ошибка доступа к микрофону:', error);
    });
});

// остановить запись
stopButton.addEventListener('click', function() {
  startButton.disabled = false;
  stopButton.disabled = true;

  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
});
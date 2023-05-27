const { initializeApp } = require("firebase/app");
const { getStorage, ref,uploadBytes, getDownloadURL } = require("firebase/storage");
class FireBase {
  constructor() {
     this.firebaseConfig = {
        apiKey: "AIzaSyA6dd8ex3UhNtHWCLxpycKuWr79ereq7Bw",
        authDomain: "english-course-18e54.firebaseapp.com",
        projectId: "english-course-18e54",
        storageBucket: "english-course-18e54.appspot.com",
        messagingSenderId: "660270000252",
        appId: "1:660270000252:web:418467d0ceb6b2e76601f9",
        measurementId: "G-FERLK5TE2F",
      };
       this.app = initializeApp(this.firebaseConfig);
      this.storage = getStorage(this.app);
  }

  async uploadPicture(file) {
    const storageRef = ref(this.storage, 'photo/'+ file.originalname);
    /** @type {any} */
    const metadata = {
      contentType: 'image/png',
    };
    const uploadTask = uploadBytes(storageRef, file.buffer, metadata).then((snapshot) => {});
    return  'photo/'+ file.originalname +'.png';
  }

  async getPictureUrl(fileUrl) {
    try {
      const storageRef = ref(this.storage, fileUrl);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Ошибка получения ссылки на файл:', error);
      return null;
    }
  }
}
module.exports = FireBase;

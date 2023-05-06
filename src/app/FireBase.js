const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");
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
    const filePath = `${Date.now()}-${file.originalname}`;
    const uploadTask = ref(this.storage, filePath).put(file.buffer);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (err) => {
          console.error(err);
          reject("Failed to upload file.");
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        }
      );
    });
  }

  async getPictureUrl(filename) {
    const fileRef = ref(this.storage, filename);

    try {
      const downloadUrl = await getDownloadURL(fileRef);
      return downloadUrl;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get download URL.");
    }
  }
}
module.exports = FireBase;

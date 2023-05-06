module.exports = (io) => {
  const express = require("express");
  const router = express.Router();
  const { initializeApp } = require("firebase/app");
  const { getAnalytics } = require("firebase/analytics");
  const firebaseConfig = {
    apiKey: "AIzaSyA6dd8ex3UhNtHWCLxpycKuWr79ereq7Bw",
    authDomain: "english-course-18e54.firebaseapp.com",
    projectId: "english-course-18e54",
    storageBucket: "english-course-18e54.appspot.com",
    messagingSenderId: "660270000252",
    appId: "1:660270000252:web:418467d0ceb6b2e76601f9",
    measurementId: "G-FERLK5TE2F",
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const storage = getStorage(app);

  const multer = require("multer");

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });

  app.post("/upload", upload.single("image"), async (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const filePath = `${Date.now()}-${file.originalname}`;

    const uploadTask = ref(storage, filePath).put(file.buffer);

    uploadTask.on(
      "state_changed",
      null,
      (err) => {
        console.error(err);
        res.status(500).send("Failed to upload file.");
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        res.status(200).send(downloadUrl);
      }
    );
  });
  return router;
};

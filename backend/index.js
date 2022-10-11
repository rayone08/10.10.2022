const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
var path = require("path");
const Pusher = require("pusher");

const app = express();

// import routes
const employeeRoutes = require("./routes/employee");
const bankaccountRoute = require("./routes/bankaccount");
const departmentRoute = require("./routes/department");
const chatRoute = require("./routes/chat");

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(fileupload());

// route middleware
app.use(employeeRoutes);
app.use(bankaccountRoute);
app.use(departmentRoute);
app.use(chatRoute);

const pusher = new Pusher({
  appId: "1488965",
  key: "804e94585cde1b22f4d5",
  secret: "7bb2fcfb200e500caf2a",
  cluster: "ap2",
  useTLS: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database connected");

  const msgCollection = db.collection("chats");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        chatId: messageDetails.chatId,
        message: messageDetails.message,
        arisedBy: messageDetails.arisedBy,
        timestamp: messageDetails.timestamp,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});

const PORT = 8400;
const DB_URL =
"mongodb+srv://admin:admin123@cluster0.hhh8ale.mongodb.net/?retryWrites=true&w=majority";


mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log("DB Connection error", err));

app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;
  const destination = path.join(
    __dirname,
    "../frontend/src/Components/Employee/components/Images",
    Date.now() + file.name
  );

  file.mv(destination, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ filePath: destination, type: file.mimetype });
    console.log({ filePath: destination, type: file.mimetype });
  });
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/User");
const feedRouter = require("./Routes/Feed");
const multer = require("multer");

const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public"));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

// ///////////////////////////////
const url =
  "mongodb+srv://Pushkar3698:pushi123@cluster0.qytoiff.mongodb.net/?retryWrites=true&w=majority";
// ////////////////////////
require("dotenv").config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *"
  );
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());
app.use(upload.single("image"));

app.use(userRoutes);
app.use("/feed", feedRouter);

mongoose
  .connect(url, { useNewUrlParser: true })
  .then((res) => console.log("db-connected"))
  .then(() => {
    const server = app.listen(PORT);
    const data = {
      cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PUT"],
      },
    };
    const io = require("./socket io/io").init(server, data);
    io.on("connection", (socket) => {
      console.log("Client connected " + socket.id);
      console.log(path.join(__dirname, "public"));
    });
  })
  .catch((err) => console.log(err));

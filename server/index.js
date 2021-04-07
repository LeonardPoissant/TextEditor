"use strict"


const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs")
require('dotenv').config();


const { CreatePost, getPost, getPostMetaData, getSinglePost, getNextPostsPage, getNumOfDocuments } = require(path.join(
  __dirname,
  "./Handlers/test"
));

const PORT = 5000

let app = express();


app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("tiny"));
app.use(express.static("./server"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "../../client/build"));
app.use(function (req, res, next) {
  req.db = db;
  next();
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "../../client/build/index.html"));
})

app.post("/test", CreatePost)
app.get("/testGet", getPost)
app.get("/posts", getNumOfDocuments)
app.get("/posts/:page", getPostMetaData)
app.get("posts/:page", getNextPostsPage)
app.get("/post/:id/:title", getSinglePost)

var MongoClient = require('mongodb').MongoClient;
var db;
let connectionString = process.env.MONGO_URL;

// Initialize connection once
MongoClient.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, function (err, database) {
  if (err) throw err;
  db = database;

  // Start the application after the database connection is ready
  app.listen(PORT, () => console.info(`Listening on port ${PORT}`))
});


app.get("/Editor", (req, res) => {
  console.log('test', test)
  const filePath = path.resolve(__dirname, "../client/build/index.html")

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err)
    }
    data = data
      .replace(/__TWITTER-TITLE__/g, "sdfsdf")
      .replace(/__TWITTER-DESCRIPTION__/g, "sdfsdf")

    console.log('data', data)

    res.send(data)
  })
})



// Reuse database object in request handlers
app.get("/", async function (req, res) {

  const count = await req.db.db('test').collection("Post").estimatedDocumentCount()

  console.log('count----', count)


  res.json({
    count: count

  })
});


"use strict"


const express = require("express");
const morgan = require("morgan");
const path = require("path");



const { CreatePost, getPost, getPostMetaData, getSinglePost, getNextPostsPage, getNumOfDocuments } = require(path.join(
  __dirname,
  "./Handlers/test"
));

const PORT = 4000

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

// Initialize connection once
MongoClient.connect("mongodb+srv://Leonard:d1234567@cluster0.owjm6.mongodb.net/test?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, function (err, database) {
  if (err) throw err;
  db = database;

  // Start the application after the database connection is ready
  app.listen(PORT, () => console.info(`Listening on port ${PORT}`))
});



// Reuse database object in request handlers
app.get("/", async function (req, res) {

  const count = await req.db.db('test').collection("Post").estimatedDocumentCount()

  console.log('count----', count)


  res.json({
    count: count

  })
});


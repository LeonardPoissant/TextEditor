"use strict"

const express =require("express");

const morgan =require("morgan");



const PORT = 4000

let app=express();


app.use((req, res, next)=>{
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
app.use("/", express.static(__dirname + "/"));

app.listen(PORT, ()=>console.info(`Listening on port ${PORT}`))
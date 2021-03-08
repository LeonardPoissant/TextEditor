const { MongoClient } = require("mongodb");
const ObjectID = require('mongodb').ObjectID;

const uri = process.env.MONGO_URI;



const CreatePost = async (req, res) => {
  const db = req.db.db('test');
  const post = req.body
  const id = new ObjectID

  try {
    const createDB = await db
      .collection("Post")
      .insertOne({
        post,
        id
      }
      );
    res.status(201).json({
      status: 201,
      data: post
    });

  } catch (err) {
    res.status(500).json({
      data: post,
      message: "Something went wrong",
      err: err,
    });
    console.log(err);
  }
};

const getPostMetaData = async (req, res) => {
  const db = req.db.db('test');
  const pageNumber = req.params.page;
  const nPerPage = 5;

  try {
    const projection = { ObjectId: 1, title: 1, description: 1, category: 1, date: 1 };
    const posts = await db
      .collection("Post")
      .find({}, { projection }).skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0).limit(5).sort({ 'date': 1 }).toArray()

    //.limit(5).sort({ 'date': 1 }).toArray()

    res.status(201).json({
      status: 201,
      data: posts
    });

  } catch (err) {
    res.status(500).json({
      data: "post,",
      message: "Something went wrong",
      err: err,
    });
    console.log(err);
  }
}

const getNumOfDocuments = async (req, res) => {
  const db = req.db.db('test');

  let n = 5

  let arrayOfPages;

  /*if (numOfPages % n != 0) {
    arrayOfPages = [...Array(numOfPages % n + 1).keys()]
  } else {
    arrayOfPages = [...Array(numOfPages % n).keys()]
  }*/


  try {
    const numOfDocuments = await db.collection("Post").estimatedDocumentCount()

    if (numOfDocuments % n != 0) {
      arrayOfPages = [...Array(numOfDocuments % n + 1).keys('a')]
    } else {
      arrayOfPages = [...Array(numOfDocuments % n).keys('a')]
    }

    console.log(arrayOfPages)




    res.status(201).json({
      status: 201,
      data: arrayOfPages
    });
  } catch (err) {
    res.status(500).json({
      data: "post,",
      message: "Something went wrong",
      err: err,
    });

  }

}

const getNextPostsPage = async (req, res) => {
  const db = req.db.db('test');
  try {
    const createDB = await db
      .collection("Post")
      .find().toArray()

    res.status(201).json({
      status: 201,
      data: createDB
    });

  } catch (err) {
    res.status(500).json({
      data: "post,",
      message: "Something went wrong",
      err: err,
    });
    console.log(err);
  }
}

const getPost = async (req, res) => {
  const db = req.db.db('test');

  try {
    const createDB = await db
      .collection("Post")
      .find().toArray()

    res.status(201).json({
      status: 201,
      data: createDB
    });

  } catch (err) {
    res.status(500).json({
      data: "post,",
      message: "Something went wrong",
      err: err,
    });
    console.log(err);
  }


}

const getSinglePost = async (req, res) => {
  const db = req.db.db('test');
  const get = req.params
  console.log(get)

  try {

  } catch (err) {
    console.log('er0', err)
  }
}

module.exports = {
  CreatePost,
  getPost,
  getPostMetaData,
  getSinglePost,
  getNextPostsPage,
  getNumOfDocuments
}
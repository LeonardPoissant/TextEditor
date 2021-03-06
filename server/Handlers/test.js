const { MongoClient } = require("mongodb");
const ObjectID = require('mongodb').ObjectID;

const uri = process.env.MONGO_URI;



const CreatePost = async (req, res) => {
  const db = req.db.db('test');
  const post = req.body
  const id = new ObjectID

  console.log('post', post)

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
  const pageNumber = req.params.page;
  const db = req.db.db('test');

  const nPerPage = 5;


  try {
    const projection = { ObjectId: 1, "post.title": 1, "post.description": 1, "post.category": 1, "post.date": 1 };
    const posts = await db
      .collection("Post")
      .find({}, { projection })
      .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0).limit(5)
      .sort({ 'post.date': -1 }).toArray()

    console.log('POSTS--------', posts)

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

const numOfPages = async (req, res) => {
  const db = req.db.db('test');
  let maxBlogPostsPerPage = 5;
  let arrayOfPages = [];

  try {
    const numOfBlogPosts = await db.collection("Post").estimatedDocumentCount();
    if (numOfBlogPosts % maxBlogPostsPerPage != 0) {
      arrayOfPages = [...Array(Math.ceil(numOfBlogPosts / maxBlogPostsPerPage)).keys('a')];
    } else {
      arrayOfPages = [...Array(numOfBlogPosts / maxBlogPostsPerPage).keys('a')];
    }



    res.status(201).json({
      status: 201,
      data: arrayOfPages
    });
  } catch (err) {
    console.log('ERR', err)
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
  console.log('TITLE', get)

  try {

    const post = await db
      .collection("Post")
      .findOne({ _id: ObjectID(get.id) })

    console.log('post-----, ', post)


    res.status(201).json({
      status: 201,
      data: post
    });

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
  numOfPages
}
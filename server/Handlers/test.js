const { MongoClient } = require("mongodb");
const ObjectID = require('mongodb').ObjectID;

const uri = process.env.MONGO_URI;



const CreatePost = async (req, res) => {


  const client = new MongoClient("mongodb+srv://Leonard:d1234567@cluster0.owjm6.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });


  const post = req.body

  const id = new ObjectID




  try {

    await client.connect();
    const db = client.db('test');

    const createDB = await db
      .collection("Post")
      .insertOne({
        post,
        id
      }

      );

    client.close();
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
  const client = new MongoClient("mongodb+srv://Leonard:d1234567@cluster0.owjm6.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });


  const param = req.params



  const pageNumber = req.params.page;
  const nPerPage = 5;

  console.log('PARAM', (pageNumber - 1) * nPerPage)
  try {
    await client.connect();
    const db = client.db('test');
    const projection = { ObjectId: 1, title: 1, description: 1, category: 1, date: 1 };
    const posts = await db
      .collection("Post")
      .find({}, { projection }).skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0).limit(5).sort({ 'date': 1 }).toArray()
    // LIMIT NUM OF RETURNS PER PAGE
    //.aggregate([{ limit: 2 }]).toArray()
    //.sort({ 'date': 1 })
    console.log('POSTS', posts)
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

const getNextPostsPage = async (req, res) => {
  const client = new MongoClient("mongodb+srv://Leonard:d1234567@cluster0.owjm6.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  try {

    await client.connect();
    const db = client.db('test');
    const createDB = await db
      .collection("Post")
      .find().toArray()

    client.close();
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
  const client = new MongoClient("mongodb+srv://Leonard:d1234567@cluster0.owjm6.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  try {

    await client.connect();
    const db = client.db('test');
    const createDB = await db
      .collection("Post")
      .find().toArray()

    client.close();
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
  const client = new MongoClient("mongodb+srv://Leonard:d1234567@cluster0.owjm6.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const get = req.params
  console.log(get)
}

module.exports = {
  CreatePost,
  getPost,
  getPostMetaData,
  getSinglePost,
  getNextPostsPage
}
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;



const CreatePost = async (req, res) => {


  const client = new MongoClient("mongodb+srv://Leonard:d1234567@cluster0.owjm6.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });


  const post = req.body


  try {

    await client.connect();
    const db = client.db('test');

    const createDB = await db
      .collection("Post")
      .insertOne(
        post,

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

  try {
    await client.connect();
    const db = client.db('test');
    const projection = { _id: 1, title: 1, description: 1, category: 1, date: 1 };
    const posts = await db
      .collection("Post")
      .find({}, { projection }).toArray()


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

module.exports = {
  CreatePost,
  getPost,
  getPostMetaData
}
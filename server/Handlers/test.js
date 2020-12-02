const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;



const CreatePost =async(req, res)=>{

    console.log("IM HER@@@E")
    const client = new MongoClient("mongodb+srv://Leonard:d1234567@cluster0.owjm6.mongodb.net/<dbname>?retryWrites=true&w=majority", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });


      const post = req.body
console.log("IM HERE", post)

      try{
        console.log("IM HERE")
        await client.connect();
        const db = client.db('test');
        console.log("IM HERE")
    const createDB = await db
      .collection("Post")
      .insertOne(
        { post: post },
       
      );
      console.log("IM HERE")
    client.close();
    res.status(201).json({
      status: 201,
     data: post
    });

      }catch(err){
        res.status(500).json({
            data: post,
            message: "Something went wrong",
            err: err,
          });
          console.log(err);
      }
};

const getPost = async(req, res)=>{
    const client = new MongoClient("mongodb+srv://Leonard:d1234567@cluster0.owjm6.mongodb.net/<dbname>?retryWrites=true&w=majority", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });

      try{
        console.log("IM HERE")
        await client.connect();
        const db = client.db('test');
    const createDB = await db
      .collection("Post")
      .find().toArray()
      console.log("IM HERE")
    client.close();
    res.status(201).json({
      status: 201,
     data: createDB
    });

      }catch(err){
        res.status(500).json({
            data: "post,",
            message: "Something went wrong",
            err: err,
          });
          console.log(err);
      }


}

module.exports ={
    CreatePost,
    getPost
}
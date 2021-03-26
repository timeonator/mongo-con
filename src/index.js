const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Replace the uri string with your MongoDB deployment's connection string.
// Connection URL
//   "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
const uri = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myDB';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const articles = db.collection("articles");
    // query for movies that have a runtime less than 15 minutes
    const query = {};
    const options = {
    //   // sort returned documents in ascending order by title (A->Z)
     //   sort: { name: 1 },
    // // Include only the `title` and `imdb` fields in each returned document
    //   projection: { _id: 0, title: 1, imdb: 1 },
    };
    const cursor = articles.find(query, options);
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }
    let i = 0
    while (await cursor.hasNext()) {
        console.log(i++);
        console.log(await cursor.next());
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://@localhost:27017/TodoApp', (err, client) => {
  if (err) {
    console.log('Unable to connect to MongoDb server')
  }
  const db = client.db('TodoApp'); // different from video for V3
  console.log('Connected to MongoDB server'); 

  db.collection('Users').findOneAndUpdate({
    name: 'Jen'
  }, {
    $inc: {
      age: 1
    },
    $set: {
      name: 'Harry'
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

 
  //client.close(); // different from video for V3
});
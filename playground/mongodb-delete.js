const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://@localhost:27017/TodoApp', (err, client) => {
  if (err) {
    console.log('Unable to connect to MongoDb server')
  }
  const db = client.db('TodoApp'); // different from video for V3
  console.log('Connected to MongoDB server');

 // deleteMany
  db.collection('Users').deleteMany({name: 'Harry'}).then((result) => {
    console.log(result);
  });

//  deleteOne
  db.collection('Users').deleteOne({
    _id: new ObjectID('5b507a7fa4f4e77ae0e0b1dc')
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

 // findOneAndDelete
//  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
//   console.log(result);
//  });

  client.close(); // different from video for V3
});
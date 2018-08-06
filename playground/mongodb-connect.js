const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://@localhost:27017/TodoApp', (err, client) => {
  if (err) {
    console.log('Unable to connect to MongoDb server')
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp'); // different from video for V3


  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert todo', err)
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)

  // db.collection('Users').insertOne({
  //   name: 'Harry',
  //   Age: 33,
  //   location: 'Denver'
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert into Users', err)
  //   }

  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  // client.close();
});
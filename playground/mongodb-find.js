const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://@localhost:27017/TodoApp', (err, client) => {
  if (err) {
    console.log('Unable to connect to MongoDb server')
  }
  const db = client.db('TodoApp'); // different from video for V3
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5b4fed2f79b4687786374953')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({name: 'Mike'}).toArray().then((docs) => {
    console.log(`Total: ${docs.length} users found`)
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch users', err);
  });


  //client.close(); // different from video for V3
});
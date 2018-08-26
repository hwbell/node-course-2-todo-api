const ObjectId = require('mongodb').ObjectId;

const mongoose = require('./../server/db/mongoose').mongoose;
const Todo = require('./../server/models/todo').Todo;
const User = require('./../server/models/user').User;

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove


// Todo.findOneAndRemove({_id: '5b82902c4aa3bb897c10110c'});

Todo.findByIdAndRemove('5b82902c4aa3bb897c10110c').then((todo) => {
  console.log(todo);
});
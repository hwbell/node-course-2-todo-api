const ObjectId = require('mongodb').ObjectId;

const mongoose = require('./../server/db/mongoose').mongoose;
const Todo = require('./../server/models/todo').Todo;
const User = require('./../server/models/user').User;

var id = '5b698612334e5ec11c513d05';

if (!ObjectId.isValid(id)) {
  console.log('ID not valid');
}

User.findById(id).then((user) => {
  if (!user) {
    console.log('User with ID not found');
  } else {
    console.log(`User: ${user}`)
  }
}).catch((e) => console.log(e));
// User.findById
// case 1 query works, but no user - "user not found"
// user found - "User: ${User}"
// error - consol.elog(e)



// var id = '5b6b464420aa0ad11148ff6811';

// if (!ObjectId.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));
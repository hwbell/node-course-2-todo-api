require('./config/config.js')

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;

var mongoose = require('./db/mongoose.js').mongoose;
var Todo = require('./models/todo.js').Todo;
var User = require('./models/user.js').User;

var app = express();
const port = process.env.PORT;
console.log(`env port: ${port}`)
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
})

// GET /todos/1234324
app.get('/todos/:id', (req, res) => {
  
  var id = req.params.id;
  
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

    Todo.findById(id).then((todo) => {
      if (todo) {
        res.send({"todo": todo});
      } else {
        res.status(404).send();
      }
    }).catch((e) => res.status(400).send());

});

app.delete('/todos/:id', (req, res) => {
  //get the id
  var id = req.params.id;
  
  // validate id
  if (!ObjectId.isValid(id)) {
    return res.status(404).send('id not valid');
  }

  //remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    
    if (!todo) {
      res.status(404).send('todo not found');
    } 
    else {
      res.status(200).send(todo);
    }
  }).catch((e) => {
    res.status(400).send();
  })
  
})

app.patch('/todos/:id', (req, res) => {
  // get id
  var id = req.params.id;

  // get only properties to update
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
     body.completed = false;
     body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send()
  })

})

// POST /users

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then((user) => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth').send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })

});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
})

module.exports = {app};
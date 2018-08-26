var express = require('express');
var bodyParser = require('body-parser');

const ObjectId = require('mongodb').ObjectId;

var mongoose = require('./db/mongoose.js').mongoose;
var Todo = require('./models/todo.js').Todo;
var User = require('./models/user.js').User;

var app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
})

module.exports = {app};
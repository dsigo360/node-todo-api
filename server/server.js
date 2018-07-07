const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);

  const todo = new Todo({
    text: req.body.text,
  });

  todo.save().then(
    doc => {
      console.log(doc);
      res.send(doc);
    },
    e => {
      console.log('There was an error');
      res.status(400).send(e);
    },
  );
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
    return res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        res.status(404).send();
        return console.log('Not found');
      }

      console.log('It has been found');
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    },
  );
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    console.log('Id is not valid');
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        console.log('No doc was found');
        return res.status(404).send();
      }

      res.send(todo);
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});

module.exports = { app };

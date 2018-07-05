const express = require('express');
const bodyParser = require('body-parser');

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

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});

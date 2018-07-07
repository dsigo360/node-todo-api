const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}) removes multiple
// Todo.remove({}).then(result => {
//   console.log(result);
// });

Todo.findByIdAndRemove('5b404220dfbb82a119760fe8').then(todo => {
  console.log(todo);
});

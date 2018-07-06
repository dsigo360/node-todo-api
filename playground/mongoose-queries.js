const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

const id = '5b3eeceb71913a6cb593ff2a1';
const userId = '5b3c4df6235871a07254449c';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }
// Todo.find({
//   _id: id,
// }).then(todos => {
//   console.log(`Todos ${todos}`);
// });

// Todo.findOne({
//   _id: id,
// }).then(todo => {
//   console.log(`Todo ${todo}`);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log('Id not found');
//     }
//     console.log(`Todo by id ${todo}`);
//   })
//   .catch(e => console.log(e));

User.findById(userId)
  .then(user => {
    if (!user) {
      return console.log('User not found.');
    }

    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch(e => console.log(e));

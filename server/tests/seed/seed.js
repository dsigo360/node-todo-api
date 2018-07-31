const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'somebody@example.com',
    password: 'aReallyEasyPassword',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET)
          .toString(),
      },
    ],
  },
  {
    _id: userTwoId,
    email: 'anotherperson@example.com',
    password: 'anotherPassword123',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET)
          .toString(),
      },
    ],
  },
];

const todos = [
  {
    _id: new ObjectID(),
    _creator: userOneId,
    text: 'First test todo',
  },
  {
    _id: new ObjectID(),
    _creator: userTwoId,
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
  },
];

const populateTodos = done => {
  Todo.remove({})
    .then(() => Todo.insertMany(todos))
    .then(() => done());
};

const populateUsers = done => {
  User.remove({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers,
};

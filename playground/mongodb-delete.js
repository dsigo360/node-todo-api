const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB Server');
    }

    console.log('Connected to MongoDB server');

    // DeleteMany
    // db.collection('Todos')
    //   .deleteMany({ text: 'Eat lunch' })
    //   .then(result => {
    //     console.log(result);
    //   });

    // deleteOne
    // db.collection('Todos')
    //   .deleteOne({ text: 'Eat lunch' })
    //   .then(result => {
    //     console.log(result);
    //   });

    // // findOneAndDelete
    // db.collection('Todos')
    //   .findOneAndDelete({ completed: false })
    //   .then(result => {
    //     console.log(result);
    //   });

    // db.collection('Users').deleteMany({ name: 'Ducky' });

    db.collection('Users')
      .findOneAndDelete({
        _id: new ObjectID('5b366af672b5a529652e9f97'),
      })
      .then(results => {
        console.log(JSON.stringify(results, undefined, 2));
      });

    // db.close();
  },
);

const mongoose = require('mongoose'),
      { execFile } = require('child_process');

mongoose.connect('mongodb://localhost/test');
mongoose.set('debug', notify)

function done() {
  process.exit();
}

function notify(coll, op, docs, opts) {
  const nDocs = Array.isArray(docs)? docs.length : 0,
        text = `display notification "${nDocs} docs" with title "${coll}" subtitle "${op}"`;

  execFile('osascript', ['-e', text]);
}

const bird = mongoose.model('bird', {name: String}),
      mike = new bird({name: 'mike'}),
      theo = new bird({name: 'theo'}),
      lucy = new bird({name: 'lucy'});

bird.insertMany([mike, theo, lucy], done);
//bird.count(done);

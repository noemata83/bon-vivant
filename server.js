const express = require('express'),
      app = express(),
      expressGraphQL = require('express-graphql'),
      mongoose = require('mongoose'),
      schema = require('./graphql/schema'),
      config = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);  
mongoose.connect(config.mongoURI, { useNewUrlParser: true});

app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema
}));

app.listen(4000, () => {
  console.log('Bon Vivant API server running on Port 4000');
})
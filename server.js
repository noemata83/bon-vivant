const express = require('express'),
      app = express(),
      expressGraphQL = require('express-graphql'),
      mongoose = require('mongoose'),
      schema = require('./graphql/schema'),
      config = require('./config/keys'),
      logger = require('./shared/logger'),
      jwt = require('express-jwt')
      bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);  
mongoose.connect(config.mongoURI, { useNewUrlParser: true});

const auth = jwt({
  secret: config.JWT_SECRET,
  credentialsRequired: false,
});

app.use('/graphql', bodyParser.json(), auth, expressGraphQL((request) => ({
  graphiql: true,
  schema,
  context: {
    user: request.user
  }})
));

app.listen(4000, () => {
  logger.info('Bon Vivant Cocktail API running on port 4000');
})
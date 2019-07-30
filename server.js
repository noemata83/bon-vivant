const express = require('express'),
      app = express(),
      expressGraphQL = require('express-graphql'),
      mongoose = require('mongoose'),
      schema = require('./graphql/schema'),
      config = require('./config/keys'),
      logger = require('./shared/logger');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);  
mongoose.connect(config.mongoURI, { useNewUrlParser: true});

app.use('/graphql', expressGraphQL((request, response, graphQLParams) => ({
  graphiql: true,
  schema,
  context: {
    request
  }})
));

app.listen(4000, () => {
  logger.info('Bon Vivant Cocktail API running on port 4000');
})
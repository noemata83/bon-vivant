const express = require('express'),
      app = express(),
      expressGraphQL = require('express-graphql')
      schema = require('./graphql/schema');

app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema
}));

app.listen(4000, () => {
  console.log('Bon Vivant API server running on Port 4000');
})
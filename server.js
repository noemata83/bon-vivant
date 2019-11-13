const express = require('express'),
  app = express(),
  expressGraphQL = require('express-graphql'),
  mongoose = require('mongoose'),
  schema = require('./graphql/schema'),
  config = require('./config/keys'),
  logger = require('./shared/logger'),
  jwt = require('express-jwt'),
  bodyParser = require('body-parser'),
  cors = require('cors')

const corsConfig = {
  origin: config.frontendOrigin,
  credentials: true
}

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const auth = jwt({
  secret: config.JWT_SECRET,
  credentialsRequired: false
})

app.use(
  '/graphql',
  cors(corsConfig),
  bodyParser.json(),
  auth,
  expressGraphQL((request, res) => ({
    graphiql: true,
    schema,
    context: {
      user: request.user,
      res
    }
  }))
)

app.listen(4000, () => {
  logger.info('Bon Vivant Cocktail API running on port 4000')
})

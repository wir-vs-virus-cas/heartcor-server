var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,

  mongoose = require('mongoose'),
  Audiofile = require('./api/models/messagesModel'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/audiodb', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/messagesRoutes'); 
 
routes(app);

app.listen(port);

console.log('Messages and Audio File RESTful API server started on: ' + port);

const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/user.model');
require('./models/survey.model');
require('./services/passport');

const DB = config.get('DATABASE_URI').replace('<password>', config.get('DATABASE_PASSWORD'));

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Connected to mongo db`))
  .catch(err => console.log(err));

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.get('COOKIE_KEY')],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth.routes')(app);
require('./routes/billing.routes')(app);
require('./routes/survey.routes')(app);

if(process.env.NODE_ENV === 'production'){
  // Express will serve up production assets
  // like our main.js file, or main.css file 
  app.use(express.static('./client/build'));

  const path = require('path');

  app.get('*' , (req, resp) => {
    resp.sendFile(path.resolve(__dirname, 'client' , 'build' , 'index.html'))
  })
}

const PORT = config.get('PORT') || 5000;

app.listen(PORT, () => console.log(`Running on port : ${PORT}`));

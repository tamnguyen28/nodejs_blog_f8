const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const route = require('./routes');
const db =  require('./config/db');

//Connect to DB
db.connect();

app.use(
  express.urlencoded({
    extended: true,
  }),
); //dạng form đã có urlencode xử lý

app.use(express.json()); //xử lý javascript

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

//HTTP logger
// app.use(morgan('combined'));

//Templates engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: { 
      sum: (a, b) => a + b,
    }
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

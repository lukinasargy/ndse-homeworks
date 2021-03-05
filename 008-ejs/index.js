const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const booksApiRouter = require('./routes/api/books');
const userRouter = require('./routes/user');
const booksRouter = require('./routes/books')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(cors());
app.use(loggerMiddleware);

app.use('/public', express.static(__dirname+"/public"));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/api/books', booksApiRouter);
app.use('/api/user', userRouter);

app.use(errorMiddleware);

app.listen(3000);
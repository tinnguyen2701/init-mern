const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// init app
const app = express();

// connect db
// mongoose
//   .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
//   .then(() => console.log('connected db'))
//   .catch(err => console.log(err));

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// router
app.get('/', (req, res) => {
  res.send(process.env.REACT_APP_TIN_DEP_TRAI);
});

app.get('/api/ss/data', (req, res) => {
  return res.json({ data: ['1', '2', '69'] });
});

// start server
app.listen(process.env.PORT_SERVER, () =>
  console.log(`server is running on port ${process.env.PORT_SERVER}`),
);

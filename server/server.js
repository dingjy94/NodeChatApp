require('./config/config');

const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '/../public');
const app = express();
const PORT = process.env.PORT;

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render(`index.html`);
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
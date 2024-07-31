const express = require('express');
const mongoose = require('mongoose');
const Item = require('./db/db');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/task', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(async () => {
    console.log('Connected to the database');

  });
  
app.get('/', async (req, res) => {
  try {
    const items = await Item.find({});
    res.render('app', { items });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/items', (req, res) => {
  res.render('form');
});

app.post('/items', async (req, res) => {
  const { name, price, brand, category } = req.body;
  const newItem = new Item({ name, price, brand, category });

  try {
    await newItem.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error saving item:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/items/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, brand, category } = req.body;
      await Item.findByIdAndUpdate(id, { name, price, brand, category });
    res.redirect('/');

});

app.post('/items/delete/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await Item.findByIdAndDelete(id);
        res.redirect('/');
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(9000, () => {
  console.log('Server is running on port 9000');
});
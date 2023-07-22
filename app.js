const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.get('/getShoppingList', (req, res) => {
  res.send(fs.readFileSync('./shoppingList.json'));
});

app.get('/test', (req, res) => {
  res.send('Test Request Called');
});

app.delete('/deleteItem/:item', (req, res) => {
  try {
    const itemToDelete = req.params.item;

    let data = JSON.parse(fs.readFileSync('./shoppingList.json'));

    const index = data.List.indexOf(itemToDelete);

    if (index !== -1) {
      data.List.splice(index, 1);
    }

    fs.writeFileSync('./shoppingList.json', JSON.stringify(data));

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    // If there's an error, send a 500 Internal Server Error
    res.status(500).json({ error: 'Server Error' });
  }
});

app.post('/addItem', (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync('./shoppingList.json'));

    let newItem = req.body.AddedItem;

    data.List.push(newItem);

    fs.writeFileSync('./shoppingList.json', JSON.stringify(data));

    res.status(200);
  } catch (error) {
    // If there's an error, send a 500 Internal Server Error
    res.status(500).json({ error: 'Server Error' });
  }
});

app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, () => {
  console.log('Running on port 3000');
});

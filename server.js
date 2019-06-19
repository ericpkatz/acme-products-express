const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const { readData, writeData } = require('./db');

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

const FILE = path.join(__dirname, 'products.json');

app.get('/api/products', async(req, res, next)=> {
  try{
    const products = await readData(FILE);
    res.send(products);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/products/:id', async(req, res, next)=> {
  try{
    const products = await readData(FILE);
    const product = products.find( p => p.id === req.params.id*1);
    if(!product){
      const error = new Error(`no product found with ${req.params.id}`);
      throw error;
    }
    res.send(product);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/products/:id', async(req, res, next)=> {
  try{
    const products = await readData(FILE);
    const filtered = products.filter( p => p.id !== req.params.id*1);
    await writeData(FILE, filtered);
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});


app.post('/api/products', async(req, res, next)=> {
  try{
    const products = await readData(FILE);
    const product = {...req.body, id: Math.random()};
    await writeData(FILE, [...products, product]);
    res.send(product);
  }
  catch(ex){
    next(ex);
  }
});


const port = process.env.PORT || 3000;

app.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});

const products = [
  {
    id: 1,
    name: 'Foo'
  },
  {
    id: 2,
    name: 'Bar'
  }
];

writeData(FILE, products);



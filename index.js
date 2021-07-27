const express = require('express')
const path = require('path')

const prd_repo = require('./prd-repo')

const port = 8080

const app = express()

// to server static pages
app.use(express.static(path.join(__dirname, '/')))

// for POST json 
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get('/product', async(req, res) => {
    const products = await  prd_repo.getAllProducts();
    res.status(200).json({ products})
});

app.get('/product/:prd_id', async(req, res) => {
    const prd_id = req.params.prd_id
    const product = await prd_repo.getProductById(prd_id); 
    res.status(200).json({ product})
});

app.delete('/product/:prd_id', async(req, res) => {
    try
    {
        const prd_id = req.params.prd_id
        const result = await prd_repo.deleteProduct(prd_id)
        res.status(200).json({
            res: 'success',
            url: `localhost:8080/product/${prd_id}`,
            result
        })
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
});

app.put('/product/:prd_id', async(req, res) => {
    try
    {
        const prd_id = req.params.prd_id
        prd = req.body
        const result = await prd_repo.updateProduct(prd, prd_id)
        res.status(201).json({
            res: 'success',
            url: `localhost:8080/product/${prd.ID}`,
            result
        })
    
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
});

app.post('/product', async (req, res) => {
    try
    {
        prd = req.body
        const result = await prd_repo.addProduct(prd)
        res.status(201).json({
            res: 'success',
            url: `localhost:8080/product/${result[0]}`,
        })
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
})

app.listen(port, () => console.log(`Listening to port ${port}`));
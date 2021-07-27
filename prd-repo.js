// prd-repo.js
const connectedKnex = require('./knex-connector');

function getAllProducts() {
    return connectedKnex('product').select('*');
}

function getProductById(id) {
    return connectedKnex('product').select('*').where('id', id).first();
}

function addProduct(product) {
    return connectedKnex("product").insert(product).returning('id');
}

function updateProduct(product, id) {
    return connectedKnex("product").where('id', id).update(product);
}

function deleteProduct(id) {
    return connectedKnex("product").where('id', id).del()
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}
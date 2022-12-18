const fs = require("fs");

class ProductModelFile {
  nombreArchivo = "products.json";

  async readFileProducts() {
    try {
      let ready = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      let products = await JSON.parse(ready);
      return products;
    } catch (error) {
      let products = [];
      return products;
    }
  }
  async saveFileProducts(products) {
    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(products, null, "\t")
    );
  }

  getId(products) {
    return products.length ? products[products.length - 1].id + 1 : 1;
  }
  //CREATE
  async createProduct(product) {
    let products = await this.readFileProducts();

    product.id = this.getId(products);
    products.push(product);

    await this.saveFileProducts(products);
  }
  //READ aLL
  async readProducts() {
    const products = await this.readFileProducts();
    return products;
  }
  // READ one
  async readProduct(id) {
    const products = await this.readFileProducts();
    const product = products.find((product) => product.id == id) || {};
    return products;
  }
  //update
  async updateProduct(id, product) {
    const products = await this.readFileProducts();
    product.id = id;
    const index = products.findIndex((product) => product.id == id);
    products.splice(index, 1, products);
  }

  async deleteProduct(id) {
    const products = await this.readFileProducts();

    const index = products.findIndex((product) => product.id == id);
    const product = products.splice(index, 1)[0];
    await this.saveFileProducts(products);
    return product;
  }

  /*async readProducts(){
    const products = await this.
  }*/
}

module.exports = ProductModelFile;

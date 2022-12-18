class ProductService {
  URL_PRODUCTS = "https://633ccbeff2b0e623dc67cf47.mockapi.io/productos";
  async getProductsService() {
    let products = await http.get(this.URL_PRODUCTS);
    return products;
  }

  async saveProductService(product) {
    let saveProduct = await http.post(this.URL_PRODUCTS, product);
    return saveProduct;
  }

  async updateProductService() {
    let updateProduct = await http.put(this.URL_PRODUCTS, id, product);
    return updateProduct;
  }

  async deleteProductService() {
    let deleteProduct = await http.del(this.URL_PRODUCTS, id);
    return deleteProduct;
  }
}
const productService = new ProductService();

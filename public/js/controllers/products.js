class ProductController extends ProductModel {
  constructor() {
    super();
    this.saveProduct = this.saveProduct.bind(this);
  }

  async getProducts() {
    this.products = await productService.getProductsService();
    return this.products;
  }

  async saveProduct(product) {
    const productSave = await productService.saveProductService(product);
    //console.log(productSave)

    this.products.push(productSave);

    renderTableList(null, this.products);
  }

  async updateProduct(id) {
    console.log("actualizarProducto", id);

    const product = formList.readProductSend();
    formList.cleanForm();

    const productUpdate = await productService.updateProductService(
      id,
      product
    );
    // console.log(productUpdate)

    const index = this.products.findIndex(
      (product) => product.id == productUpdate.id
    );
    this.products.splice(index, 1, productUpdate);

    renderTableList(null, this.products);
  }

  async deleteProduct(id) {
    console.log("borrarProducto", id);

    let productDelete = await productService.deleteProductService(id);

    const index = this.products.findIndex(
      (product) => product.id == productDelete.id
    );
    this.products.splice(index, 1);

    renderTableList(null, this.products);
  }
}

const productController = new ProductController();

class WhishListController extends WhishListModel {
  constructor() {
    super();

    try {
      // console.log(JSON.parse(localStorage.getItem('whishList')))
      this.whishList = JSON.parse(localStorage.getItem("whishList")) || [];
    } catch (error) {
      console.error("something hapend with the localStorage", error);
      this.whishList = [];
      localStorage.setItem("whishList", this.whishList);
    }
  }

  theProductIsInList(product) {
    return this.whishList.filter((prod) => prod.id == product.id).length;
  }

  getProductOfList(product) {
    return this.whishList.find((prod) => prod.id == product.id);
  }

  AddtoCarrito(product) {
    console.log(product);

    if (!this.theProductIsInList(product)) {
      product.cantidad = 1;
      this.whishList.push(product);
    } else {
      const productofList = this.getProductOfList(product);
      productofList.count++;
    }

    localStorage.setItem("whishList", JSON.stringify(this.whishList));
  }

  async deleteProductList(id) {
    try {
      const index = this.whishList.findIndex((prod) => prod.id == id);
      this.whishList.splice(index, 1);
      localStorage.setItem("whishList", JSON.stringify(this.whishList));

      await renderlist(this.whishList);
    } catch (error) {
      console.log(error);
    }
  }

  async sendWhisList() {
    try {
      const elemSectionlist =
        document.getElementsByClassName("section-whishList")[0];

      elemSectionlist.innerHTML = "<h2>send whishList...</h2>";
      await whishListService.saveWhisListService(this.whishList);
      this.whishList = [];
      localStorage.setItem("whishList", JSON.stringify(this.whishList));

      elemSectionlist.innerHTML = "<h2>Send whishList <b>OK!</b></h2>";
    } catch (error) {
      console.error(error);
    }
  }
}

const whisListController = new WhishListController();

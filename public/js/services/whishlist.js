class WhishlistService {
  URL_WHISHLIST = "https://633ccbeff2b0e623dc67cf47.mockapi.io/productos";

  async saveListSave(list) {
    const listSave = await http.post(this.URL_WHISHLIST.list, list);
    return listSave;
  }
}

const whishlistService = new WhishlistService();

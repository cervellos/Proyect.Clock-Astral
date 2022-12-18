async function renderTemplateList(list) {
  try {
    const res = await fetch("templates/init.hbs");
    const templateHbs = await res.text();
    const template = Handlebars.compile(templateHbs);

    const html = template({ list });

    document.getElementsByClassName("cards-container")[0].innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

function addWhishList(e, id, ref) {
  e.preventDefault();
  //console.log(id)
  //console.log(ref)

  const product = productController.products.find(
    (product) => product.id == id
  );
  whishListController.addToList(product);
}

async function initInit() {
  console.warn("initInit()");

  const products = await productController.getProducts();

  await renderTemplateList(products);

  document.querySelector(
    ".section-cards__header p"
  ).innerHTML = `We find ${products.length} products`;
}

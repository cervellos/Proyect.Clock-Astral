let showList = false;

async function renderList(list) {
  console.log(list);
  try {
    const elemSectionList =
      document.getElementsByClassName("section-whishList")[0];
    const res = await fetch("templates/whishlist.hbs");
    const templateHbs = await res.text();
    const template = Handlebars.compile(templateHbs);
    const html = template({ list });
    console.log(html);

    elemSectionList.innerHTML = html;
    elemSectionList.classList.add("section-list--visible");
  } catch (err) {
    console.error("este error" + err);
  }
}

function initWhishList() {
  console.warn("initwhishList()");

  const btnWhisList = document.getElementsByClassName(
    "search-bar__whishList-container"
  )[0];
  const elemSectionList = document.getElementsByClassName("section-list")[0];

  btnWhisList.addEventListener("click", async () => {
    showList = !showList;

    try {
      if (showList) {
        await renderList(whishListController.list);
      } else {
        elemSectionList.classList.remove("section-list--visible");
      }
    } catch (error) {
      console.error(error);
    }
    const closeWhislist = document.getElementById("btn_closewhislist");
    closeWhislist.addEventListener("click", () => {
      elemSectionList.classList.remove("section-carrito--visible");
    });
  });
}

initWhishList();

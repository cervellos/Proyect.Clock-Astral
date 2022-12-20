class Main {
  //AJAX
  async ajax(url, metodo = "get") {
    try {
      const respuesta = await fetch(url, { method: metodo });
      const resultado = await respuesta.text();
      return resultado;
    } catch (err) {
      console.error(err);
    }
  }
  // Property
  //llama el archivo
  getNameArch(id) {
    return "views/" + id + ".html";
  }
  //señala el archivo que esta activo
  markLink(id) {
    const links = document.querySelectorAll("header nav a");
    links.forEach((link) => {
      if (link.id === id) link.classList.add("active");
      else link.classList.remove("active");
    });
  }
  //arranca el respectivo JS de su archivo html
  initJS(id) {
    if (id === "list") {
      initList();
    } else if (id === "init") {
      initInit();
    } else if (id === "we") {
      initWe();
    } else if (id === "contact") {
      initContact();
    }
  }
  //Carga las plantillas
  async ChargerTemplate(id) {
    let archived = this.getNameArch(id);

    let template = await this.ajax(archived);

    // Carga del código de la vista (HTML) de la platilla
    let main = document.querySelector("main");
    main.innerHTML = template;

    // Carga dle código script (JS) de la plantilla
    this.initJS(id);
  }

  async ChargerTemplates() {
    // Carga inicial de la vista deteminada por la url visitada
    let id = location.hash.slice(1) || "init"; // #inicio => slice(1) => inicio
    this.markLink(id);
    await this.ChargerTemplate(id);

    // Carga de cada uno de los contenidos según la navegación local
    const links = document.querySelectorAll("header nav a");
    //console.log(links)

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        let id = link.id;
        //console.log(id)
        location.hash = id;
      });
    });

    window.addEventListener("hashchange", async () => {
      // console.log('Cambió la URL')

      let id = location.hash.slice(1) || "init";
      this.markLink(id);
      await this.ChargerTemplate(id);
    });
  }

  //estable la funcion syncronica que inicializa TODO el main
  async start() {
    await this.ChargerTemplates();
  }
}
//llamando a las clase...

const main = new Main();
main.start();

class FormList {
  inputs = null;
  form = null;
  button = null;
  inpustValid = [false, false, false, false, false, false, false];
  regExpValid = [
    /^.+$/, // regexp name
    /^.+$/, // regexp price
    /^[0-9]+$/, // regexp stock
    /^.+$/, // regexp mark
    /^.+$/, // regexp category
    /^.+$/, // regexp details
    /^.+$/, // regephotooto
  ];
  /**drag and drop */
  imagenUp = "";
  dropArea = null;
  progressbar = null;
  /**drag and drop */
  constructor(renderTableList, saveProduct) {
    // Referencias de las funciones
    this.inputs = document.querySelectorAll("main form input");
    this.form = document.querySelector("main form");
    this.button = document.querySelector("main form button");

    this.button.disabled = true;

    this.inputs.forEach((input, index) => {
      if (input.type != "checkbox") {
        input.addEventListener("input", () => {
          this.validity(input.value, this.regExpValid[index], index);
          if (renderTableList)
            renderTableList(
              !this.someInputsValid(),
              productController.products
            );
        });
      }
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const product = this.readSendProduct();
      this.cleanForm();

      if (saveProduct) saveProduct(product);
    });
    /**drag and drop */

    this.dropArea = document.getElementById("drop-area");
    this.progressBar = document.getElementById("progress-bar");

    //para cancerlar el evento automatica
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      this.dropArea.addEventListener(eventName, (e) => e.preventDefault());
      document.body.addEventListener(eventName, (e) => e.preventDefault());
    });
    //para remarcar la zoan de drop al arrastarr una imagen dentro de ella
    ["dragenter", "dragover"].forEach((eventName) => {
      this.dropArea.addEventListener(eventName, () => {
        this.dropArea.classList.add("highlight");
      });
    });
    ["dargleave", "drop"].forEach((eventName) => {
      this.dropArea.addEventListener(eventName, () => {
        this.dropArea.classList.add("highlight");
      });
    });

    this.dropArea.addEventListener("drop", () => {
      console.log(e);
      const dataTransf = e.dataTransfer;
      const files = dataTransf.files;
      this.handleFiles(files);
    });

    /**drag and drop */
  }

  // Para comprobar la validez de los campos
  someInputsValid() {
    let validity =
      this.inpustValid[0] &&
      this.inpustValid[1] &&
      this.inpustValid[2] &&
      this.inpustValid[3] &&
      this.inpustValid[4] &&
      this.inpustValid[5] &&
      this.inpustValid[6];

    return !validity;
  }

  // Validar campos
  validity(value, validator, index) {
    //console.log(value, validator, index)

    if (!validator.test(value)) {
      this.setCustomValidityJS("Este campo no es válido", index);
      this.inpustValid[index] = false;
      this.button.disabled = true;
      return null; // break
    }

    this.inpustValid[index] = true;
    this.button.disabled = this.someInputsValid(); // boolea

    this.setCustomValidityJS("", index);
    return value;
  }

  // Mostrar u ocultar el mensaje
  setCustomValidityJS(messaje, index) {
    let divs = document.querySelectorAll("form .mns-valid"); //.mensaje de validacion
    divs[index].innerHTML = messaje;
    divs[index].style.display = messaje ? "block" : "none";
  }

  // Producto ingresado en el formulario
  readSendProduct() {
    return {
      name: this.inputs[0].value,
      price: this.inputs[1].value,
      stock: this.inputs[2].value,
      mark: this.inputs[3].value,
      category: this.inputs[4].value,
      details: this.inputs[5].value,
      photo: this.imagenUp ? `/uploads/${this.imagenUp}` : "", // TODO dejar imagen por defecto
      sending: this.inputs[7].checked,
    };
  }

  // Limpiamos los imputs del formulario
  cleanForm() {
    // borro todos los inputs
    this.inputs.forEach((input) => {
      if (input.type != "checkbox") input.value = "";
      else if (input.type == "checkbox") input.checked = false;
    });

    this.button.disabled = true;
    this.inpustValid = [false, false, false, false, false, false, false];

    const img = document.querySelector("#gallery img");
    img.src = "";

    this.initializeProgress();
    this.imagenUp = "";
  }
  /**drag and drop */
  initializeProgress() {
    this.progressBar.value = 0;
  }
  updateProgress(porcentaje) {
    this.progressBar.value = porcentaje;
  }

  previewFile(file) {
    const reader = new FileReader(); //
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const image = document.querySelector("#gallery img");
      img.src = reader.result;
    };
  }
  handleFiles = (files) => {
    const file = files[0];
    this.initializeProgress();
    this.uploadFiles(file);
    this.previewFile(file);
  };
  uploadFiles = (file) => {
    const url = "/api/upload";

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.open("POST", url);
    xhr.upload.addEventListener("progress", (e) => {
      let porcentaje = (e.loaded * 100.0) / e.total || 100;
      this.updateProgress(porcentaje);
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        this.objImagen = JSON.parse(xhr.response);
        this.imagenUp = objImagen.nombre;
      }
    });

    formData.append("foto");
    xhr.send(formData);
  };
  /**drag and drop */
}

// Rendereabamos la plantilla
const renderTableList = (valids, products) => {
  const xhr = new XMLHttpRequest();
  xhr.open("get", "templates/list.hbs");
  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      let templateHbs = xhr.response;

      let template = Handlebars.compile(templateHbs);

      console.warn(products);
      let html = template({ products, valids });
      document.getElementById("list-products").innerHTML = html;
    }
  });

  xhr.send();
};

/* ------------------------------------------------------- */
/* Inicializaciones para el funcionamiento del módulo      */
/* ------------------------------------------------------- */
let formList = null;

async function initList() {
  console.warn("initList()");

  formList = new FormList(renderTableList, productController.saveProduct);

  const products = await productController.getProducts();
  renderTableList(null, products);
}

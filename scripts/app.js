// Función para calcular la fecha de vencimiento de un derecho de propiedad industrial
const calculateExpiration = (propertyRight, registrationDate) => {
    const registrationDateObj = new Date(registrationDate);
    let deadline;
    switch (propertyRight) {
      case 'marca':
        deadline = new Date(registrationDateObj.getFullYear() + 10, registrationDateObj.getMonth(), registrationDateObj.getDate());
        break;
      case 'patente':
        deadline = new Date(registrationDateObj.getFullYear() + 20, registrationDateObj.getMonth(), registrationDateObj.getDate());
        break;
      case 'diseno-industrial':
        deadline = new Date(registrationDateObj.getFullYear() + 15, registrationDateObj.getMonth(), registrationDateObj.getDate());
        break;
      case 'modelo-utilidad':
        deadline = new Date(registrationDateObj.getFullYear() + 10, registrationDateObj.getMonth(), registrationDateObj.getDate());
        break;
    }
    const today = new Date();
    const expired = today > deadline;
  
    if (expired) {
      return `El registro de su ${getFormattedPropertyRight(propertyRight)} está vencido desde el ${deadline.toLocaleDateString()}.`;
    } else {
      return `El registro de su ${getFormattedPropertyRight(propertyRight)} aún se encuentra vigente. Su fecha de vencimiento es el ${deadline.toLocaleDateString()}.`;
    }
};
  
// Función auxiliar para obtener el formato deseado de los nombres de los derechos de propiedad
const getFormattedPropertyRight = (propertyRight) => {
    const propertyRightMap = {
      'marca': 'Marca',
      'patente': 'Patente',
      'diseno-industrial': 'Diseño Industrial',
      'modelo-utilidad': 'Modelo de Utilidad'
    };
    return propertyRightMap[propertyRight] || propertyRight;
};
  
// Evento de envío del formulario
const formVencimientos = document.querySelector("#vencimientos-form").addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe
  
// Captura los valores ingresados en el formulario
const propertyRight = document.querySelector('input[name="gridRadios"]:checked').value;
const registrationDate = document.querySelector("#inputDate").value;

// Llama a la función calculateExpiration con los valores capturados
const result = calculateExpiration(propertyRight, registrationDate);

// Muestra el resultado en el DOM
const resultContainer = document.querySelector("#resultContainer");
resultContainer.textContent = result;
});


// Definir una clase Product para representar un producto

function Product(name, price, description, image, id) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.id = id;
  }

// Definir una clase Service para representar un servicio

function Service(name, price, description, image, id) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.id = id;
  }

// Crear una lista de productos y servicios

const products = [
    new Product(
        "Propiedad Industrial e Intelectual",
        50,
        "Libro Físico",
        "./images/img-p1.jpg",
        "P1"
    ),
    new Product(
        "Manual de Propiedad Industrial",
        85,
        "Libro Digital",
        "./images/img-p2.jpg",
        "P2"
    ),
    new Product(
        "La Propiedad Intelectual en la Era Digital",
        45,
        "Libro Físico",
        "./images/img-p3.jpg",
        "P3"
    ),
    new Product(
        "¡Quiero esta marca!",
        100,
        "Libro Físico",
        "./images/img-p4.jpg",
        "P4"
    ),
    new Product(
        "Totem",
        90,
        "Libro Físico",
        "./images/img-p5.jpg",
        "P5"
    ),
];

const services = [
    new Service(
        "Búsqueda de identidad de marcas simple",
        50,
        "Incluye únicamente un listado de identidad de marcas",
        "./images/img-sv1.jpg",
        "S1"
    ),
    new Service(
        "Búsqueda de identidad de marcas completa",
        150,
        "Incluye análisis de registrabilidad con indicación de chances de éxito",
        "./images/img-sv2.jpg",
        "S2"
    ),
    new Service(
        "Orientación sobre requisitos legales y pasos para el registro",
        300,
        "Registro de marcas fácil y seguro con nuestra ayuda",
        "./images/img-sv3.jpg",
        "S3"
    ),
    new Service(
        "Evaluación de fortaleza distintiva de una marca propuesta",
        250,
        "Análisis de la distintividad y viabilidad de marca",
        "./images/img-sv4.jpg",
        "S4"
    ),
];  

const productListElement = document.querySelector("#productList");     
const serviceListElement = document.querySelector("#serviceList");

// Crear un carrito vacío

let cart = []

// Obtener productos almacenados en el Local Storage

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

// Funciones para agregar un producto o servicio al carrito

function addToCartProduct(product) {
    const existingItem = cart.find((cartItem) => cartItem.id === product.id);
  
    existingItem ? (existingItem.quantity += 1) : cart.push({ ...product, quantity: 1 });
  
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartUI();
}

function addToCartService(service) {
    const existingItem = cart.find((cartItem) => cartItem.id === service.id);
  
    existingItem ? (existingItem.quantity += 1) : cart.push({ ...service, quantity: 1 });
  
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartUI();
}

// Función para generar un elemento de carrito
function generateCartItemElement(item) {
    const cartItem = document.createElement("li");
    cartItem.classList.add("nav-item");
  
    const name = document.createElement("h5");
    name.textContent = item.name;
    cartItem.appendChild(name);
  
    const price = document.createElement("p");
    price.classList.add("price");
    price.textContent = `$${item.price.toFixed(2)}`;
    cartItem.appendChild(price);
  
    const quantity = document.createElement("p");
    quantity.textContent = `Cantidad: ${item.quantity}`;
    cartItem.appendChild(quantity);

    // Botón de eliminar
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-from-cart", "btn", "btn-dark");
    removeButton.textContent = "Eliminar";
    cartItem.appendChild(removeButton);

    // Event listener para eliminar el elemento del carrito
    removeButton.addEventListener("click", () => {
        removeFromCart(item);
    });
  
    return cartItem;
}

// Función para eliminar elemento del carrito

function removeFromCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  
    existingItem ? existingItem.quantity > 1 ? existingItem.quantity -= 1 : cart.splice(cart.indexOf(existingItem), 1) : null;
  
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}
  
// Función para actualizar los elementos del carrito en la interfaz
function updateCartUI() {
    const cartTotalElement = document.querySelector("#cartTotal");
    const cartItemsElement = document.querySelector("#cartItems");
  
    // Limpiar elementos actuales del carrito
    cartItemsElement.innerHTML = "";
  
    // Generar elementos del carrito
    cart.forEach((item) => {
        const cartItemElement = generateCartItemElement(item);
        cartItemsElement.appendChild(cartItemElement);
    });
  
    // Calcular y mostrar el total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

function handleBuyButtonClick() {
    // Verificar si hay elementos en el carrito
    const cartIsEmpty = cart.length === 0;
    if (cartIsEmpty) {
        Swal.fire('El carrito está vacío. Agrega productos o servicios antes de comprar.');
        return;
    }
  
    // Generar el mensaje de compra
    const productList = [];
    const serviceList = [];
  
    cart.forEach((item) => {
        if (item.hasOwnProperty("description")) {
          const productItem = document.createElement("div");
          productItem.classList.add("product-item");
      
          const productName = document.createElement("h5");
          productName.classList.add("product-name");
          productName.textContent = item.name;
      
          const productQuantity = document.createElement("p");
          productQuantity.classList.add("product-quantity");
          productQuantity.textContent = `(Cantidad: ${item.quantity})`;
      
          productItem.appendChild(productName);
          productItem.appendChild(productQuantity);
      
          productList.push(productItem);
        } else if (item.hasOwnProperty("price")) {
          const serviceItem = document.createElement("div");
          serviceItem.classList.add("service-item");
      
          const serviceName = document.createElement("h5");
          serviceName.classList.add("service-name");
          serviceName.textContent = item.name;
      
          const serviceQuantity = document.createElement("p");
          serviceQuantity.classList.add("service-quantity");
          serviceQuantity.textContent = `(Cantidad: ${item.quantity})`;
      
          serviceItem.appendChild(serviceName);
          serviceItem.appendChild(serviceQuantity);
      
          serviceList.push(serviceItem);
        }
    });
  
    const productMessage = productList.length > 0 ? `Muchas gracias por tu compra. Has comprado los productos: ${productList.map(item => item.outerHTML).join(" ")}.` : "";
    const serviceMessage = serviceList.length > 0 ? `Has adquirido los servicios: ${serviceList.map(item => item.outerHTML).join(" ")}.` : "";
  
    const purchaseMessage = `${productMessage} ${serviceMessage}`;
  
    // Vaciar el carrito
    cart = [];
    localStorage.removeItem("cart");
    updateCartUI();
  
    // Mostrar el mensaje en el DOM
    const messageContainer = document.querySelector("#cartItems");
    if (messageContainer) {
        messageContainer.innerHTML = purchaseMessage;
    } else {
        console.error("No se pudo encontrar el contenedor 'cartItems'.");
    }
}
  

/* function handleBuyButtonClick() {
    // Verificar si hay elementos en el carrito
    const cartIsEmpty = cart.length === 0;
    if (cartIsEmpty) {
        Swal.fire('El carrito está vacío. Agrega productos o servicios antes de comprar.');
        return;
    }
  
    // Generar el mensaje de compra
    const productList = [];
    const serviceList = [];
  
    cart.forEach((item) => {
      item.hasOwnProperty("description")
        ? productList.push(`${item.name} 
        (Cantidad: ${item.quantity})`)
        : item.hasOwnProperty("price")
        ? serviceList.push(`${item.name} 
        (Cantidad: ${item.quantity})`)
        : null;
    });
  
    const productMessage = productList.length > 0 ? `Muchas gracias por tu compra. Has comprado los productos: ${productList.join(", ")}.` : "";
    const serviceMessage = serviceList.length > 0 ? `Has adquirido los servicios: ${serviceList.join(", ")}.` : "";
  
    const purchaseMessage = `${productMessage} ${serviceMessage}`;
  
    // Vaciar el carrito
    cart = [];
    localStorage.removeItem("cart");
    updateCartUI();
  
    // Mostrar el mensaje en el DOM
    const messageContainer = document.querySelector("#cartItems");
  if (messageContainer) {
    messageContainer.textContent = purchaseMessage;
    document.querySelector("#cartItems").appendChild(messageContainer);
  } else {
    console.error("No se pudo encontrar el contenedor 'cartItems'.");
  }
} */

// Asignar evento click al botón de compra
const buyButton = document.querySelector("#buyButton");
buyButton.addEventListener("click", handleBuyButtonClick);

// Actualizar elementos del carrito en la interfaz al cargar la página
updateCartUI();
  
// Generar tarjetas de productos

products.forEach((product) => {
    generateProductCard(product);
});

// Función para generar una tarjeta de producto

function generateProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("product-card", "col-sm-12", "col-lg-4", "card");
  
    const image = document.createElement("img");
    image.src = product.image;
    image.classList.add("card-img-top")
    card.appendChild(image);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
  
    const name = document.createElement("h5");
    name.classList.add("card-title");
    name.textContent = product.name;
    cardBody.appendChild(name);
  
    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = product.description;
    cardBody.appendChild(description);
  
    const price = document.createElement("p");
    price.classList.add("card-text", "price");
    price.textContent = `$${product.price}`;
    cardBody.appendChild(price);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-body");
  
    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart" , "btn" , "btn-dark");
    addToCartButton.textContent = "Agregar al carrito";
    cardFooter.appendChild(addToCartButton);

    cardBody.appendChild(cardFooter);

    card.appendChild(cardBody);
  
    productListElement.appendChild(card);

    // Event listener para agregar el producto al carrito
    addToCartButton.addEventListener("click", () => {
        addToCartProduct(product);
    });
}

// Generar tarjetas de servicios

services.forEach((service) => {
    generateServiceCard(service);
});

// Función para generar una tarjeta de servicio

function generateServiceCard(service) {
    const card = document.createElement("div");
    card.classList.add("service-card", "col-sm-12", "col-lg-4", "card");

    const image = document.createElement("img");
    image.src = service.image;
    image.classList.add("card-img-top");
    card.appendChild(image);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
  
    const name = document.createElement("h5");
    name.classList.add("card-title");
    name.textContent = service.name;
    cardBody.appendChild(name);
  
    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = service.description;
    cardBody.appendChild(description);
  
    const price = document.createElement("p");
    price.classList.add("card-text", "price");
    price.textContent = `$${service.price}`;
    cardBody.appendChild(price);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-body");
  
    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart" , "btn" , "btn-dark");
    addToCartButton.textContent = "Agregar al carrito";
    cardFooter.appendChild(addToCartButton);

    cardBody.appendChild(cardFooter);

    card.appendChild(cardBody);
  
    serviceListElement.appendChild(card);

    // Event listener para agregar el servicio al carrito
    addToCartButton.addEventListener("click", () => {
        addToCartService(service);
      });
}

// Función para renderizar los resultados de búsqueda
function renderSearchResults(results) {
    productListElement.innerHTML = '';
    serviceListElement.innerHTML = '';
  
    if (results.products.length > 0 || results.services.length > 0) {
        results.products.forEach((product) => {
            generateProductCard(product);
        });
    
        results.services.forEach((service) => {
            generateServiceCard(service);
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontraron productos o servicios que coincidan con la búsqueda, por favor ingrese otro parámetro de búsqueda.'
        });
    }
}

  // Función de búsqueda
  function buscar(event) {
    event.preventDefault();
  
    const searchTerm = searchInput.value.toLowerCase();
  
    // Filtrar los productos y servicios que coincidan con el término de búsqueda
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  
    const filteredServices = services.filter((service) =>
      service.name.toLowerCase().includes(searchTerm)
    );
  
    // Crear un objeto con los resultados de búsqueda
    const searchResults = {
      products: filteredProducts,
      services: filteredServices,
    };
  
    // Renderizar los resultados de búsqueda
    renderSearchResults(searchResults);
  }
  
  // Evento de escucha del formulario de búsqueda
  const searchForm = document.querySelector("#btn-search");
  const searchInput = document.querySelector(".form-control");
  
  searchForm.addEventListener('submit', buscar);

/* const searchForm = document.querySelector('.d-flex');
searchForm.addEventListener('submit', buscar); */


// Función para capturar la información del formulario y almacenarla en el Local Storage
function capturarInformacion(event) {
    event.preventDefault(); // Evita que el formulario se envíe
  
    // Obtener los valores de los campos del formulario
    const nombres = document.querySelector('#exampleInputName1')?.value;
    const apellidos = document.querySelector('#exampleInputName2')?.value;
    const correo = document.querySelector('#exampleInputEmail1')?.value;
    const telefono = document.querySelector('#exampleInputPhoneNumber')?.value;
    const mensaje = document.querySelector('#exampleFormControlTextarea1')?.value;
  
    // Crear un objeto con la información capturada
    const informacion = {
      nombres,
      apellidos,
      correo,
      telefono,
      mensaje
    };
  
    // Obtener el array almacenado en el Local Storage
    const storedData = JSON.parse(localStorage.getItem('contactData')) || [];
  
    // Agregar la nueva información al array
    storedData.push(informacion);
  
    // Guardar el array en el Local Storage
    localStorage.setItem('contactData', JSON.stringify(storedData));
  
    // Mostrar el mensaje de agradecimiento en la sección correspondiente
    const contactContainer = document.querySelector('.contact-container');
    const mensajeHTML = `
      <p>Su solicitud ha sido recibida. Nos comunicaremos con usted pronto para brindarle la información que necesita.</p>
      <button class="btn btn-light" id="revisarConsulta">Revisar consulta</button>
    `;
  
    contactContainer.innerHTML = mensajeHTML;
  
    // Vaciar el Local Storage al hacer clic en "Revisar consulta"
    const revisarConsultaBtn = document.getElementById('revisarConsulta');
    revisarConsultaBtn.addEventListener('click', () => {
      localStorage.removeItem('contactData');
      mostrarMensajeAgradecimiento(storedData);
    });
  }
  
  // Función para mostrar el mensaje de agradecimiento en la sección correspondiente
  function mostrarMensajeAgradecimiento(storedData) {
    const contactContainer = document.querySelector('.contact-container');
    const mensajeHTML = `
      <p>Muchas gracias por ponerse en contacto con nosotros, hemos recibido la siguiente información:</p>
      <ul>
        ${storedData.map(item => `
          <li>Nombres: ${item.nombres}</li>
          <li>Apellidos: ${item.apellidos}</li>
          <li>Correo Electrónico: ${item.correo}</li>
          <li>Número de Teléfono o Celular: ${item.telefono}</li>
          <li>¿En qué podemos ayudarte?: ${item.mensaje}</li>
        `).join('')}
      </ul>
      <p>Pronto recibirá noticias nuestras. ¡Estamos emocionados por hablar con usted!</p>
    `;
  
    contactContainer.innerHTML = mensajeHTML;
  }
  
  // Asociar la función capturarInformacion al evento submit del formulario
  const formContact = document.querySelector('.contacto form');
  formContact.addEventListener('submit', capturarInformacion);
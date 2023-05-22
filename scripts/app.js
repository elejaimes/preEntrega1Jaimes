//declara funciones

const greeting = () => {
    let fullName = prompt('Por favor, ingrese su primer nombre y su primer apellido');
    let nameSurname = fullName.split(' ');
    let firstName = nameSurname[0];
    let lastName = nameSurname[1];
    let message = `¡Hola ${fullName}! Es un agrado tenerte en nuestro sitio, esperamos poder entregarte la información que necesitas`;
    alert(message);
};
greeting ();

let calculateExpiration = (propertyRight, registrationDate) => {
    let validProperties = ['patente', 'diseño industrial', 'modelo de utilidad', 'marca'];
    propertyRight = propertyRight.toLowerCase();
    if (!validProperties.includes(propertyRight)) {
        return 'El Valor ingresado no es válido, por favor, ingrese una de las opciones señaladas';       
    } else {
        let dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateFormat.test(registrationDate)) {
            return 'El formato de fecha no es válido. Por favor, ingrese la fecha en formato dd/mm/aaaa';
        } else {
            let registrationDateObj = new Date(Date.parse(registrationDate.split('/').reverse().join('-')));
            let deadline;
            switch (propertyRight) {
                case 'patente':
                    deadline = new Date(registrationDateObj.getFullYear() +20, registrationDateObj.getMonth(), registrationDateObj.getDate());
                    break;
                case 'diseño industrial':
                    deadline = new Date(registrationDateObj.getFullYear() +15, registrationDateObj.getMonth(), registrationDateObj.getDate());
                    break;
                case 'modelo de utilidad':
                    deadline = new Date(registrationDateObj.getFullYear() +10, registrationDateObj.getMonth(), registrationDateObj.getDate());
                    break;
                case 'marca':
                    deadline = new Date(registrationDateObj.getFullYear() +10, registrationDateObj.getMonth(), registrationDateObj.getDate());
                    break;                
            }
            let today = new Date();
            let expired = today > deadline;
            if (expired) {
                return `El registro de ${propertyRight} está vencido desde el ${deadline.toLocaleDateString()}.`;
            } else {
                return `El registro de ${propertyRight} aun se encuentra vigente. Su fecha de vencimiento es el ${deadline.toLocaleDateString()}.`;
            }
        }
    }
}
let propertyRight = prompt('¿Qué tipo de derecho industrial desea calcular su fecha de vencimiento? \nPatente \nDiseño Industrial \nModelo de Utilidad \nMarca');
let registrationDate = prompt('Ingrese la fecha de registro de su derecho de propiedad insdustrial en formalo dd/mm/aaaa:');
let result = calculateExpiration(propertyRight, registrationDate);
alert(result);

function Product(name, price, id) {
    this.name = name;
    this.price = price;
    this.id = id;
}
  
function Service(name, price, description, id) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.id = id;    
}
let products = [
    new Product(
        "Artículo sobre el proceso de registro de una marca", 
        5, 
        "P1"
    ),
    new Product(
        "Artículo sobre el proceso de registro de una patente", 
        10,
        "P2"
    ),
    new Product(
        "Artículo sobre el registro de un dominio", 
        5,
        "P3"
    )
];
let services = [
    new Service(
      "Búsqueda de identidad de marcas completa",
      100,
      "Incluye análisis de registrabilidad",
      "S1"
    ),
    new Service(
      "Búsqueda de identidad de marcas simple",
      50,
      "Incluye únicamente un listado de identidad de marcas",
      "S2"
    )
];

let cart = []

function generateMessage(products, services, formatProdutcs, formatServices) {
    let message = "Ofrecemos los siguientes productos y servicios:\n\n";
    message = message.concat(formatProdutcs(products), formatServices(services));
    alert(message);

    let selection = prompt("Ingrese el ID del producto o servicio que desea agregar al carrito (separe los IDs por comas si desea agregar varios):")

    if (selection) {
        let ids = selection.split(",");
        ids.forEach((id) => {
            let selectedProduct = products.find((product) => product.id === id.trim());
            let selectedService = services.find((service) => service.id === id.trim());
            
            if (selectedProduct) {
                cart.push(selectedProduct);
            } else if (selectedService) {
                cart.push(selectedService)
            }
        });

        alert("Los productos y servicios seleccionados han sido agregados al carrito");

        showCart();
    }
}

function calculateTotal() {
    let subtotal = cart.reduce((accumulator, item) => {
        if (item instanceof Product) {
            return accumulator + item.price;
        } else if (item instanceof Service) {
            return accumulator + item.price;
        }
    }, 0);

    let iva = subtotal * 0.19; 

    let total = subtotal + iva;

    total = Math.round(total);

    return total;
}

function showCart() {
    let cartMessage = "Productos agregados al carrito:\n";
    cart.forEach((item, index) => {
        if (item instanceof Product) {
            cartMessage += `${index + 1}. Producto: ${item.name} - USD ${item.price}\n`;
        } else if (item instanceof Service) {
            cartMessage += `${index + 1}. Servicio: ${item.name} - USD ${item.price}\n`;
        }
    });

    alert(cartMessage);

    let total = calculateTotal();
    let totalMessage = `Monto total a pagar (incluido el 19% de IVA): USD ${total}`;
    alert(totalMessage);
}


function formatProducts(products) {
    let formattedMessage = "PRODUCTOS:\n";
    products.forEach((product, index) => {
        formattedMessage += `${index + 1}. ${product.name} - USD ${product.price} (ID: ${product.id})\n` ;        
    });
    return formattedMessage;
}

function formatServices(services) {
    let formattedMessage = "\nSERVICIOS:\n";
    services.forEach((service, index) => {
        formattedMessage += `${index + 1}. ${service.name} (${service.description}) - USD ${service.price} (ID: ${service.id})\n`;            
    });
    return formattedMessage;
}

products.push(
    new Product(
        "Artículos especializados sobre marcas comerciales", 
        25,
        "P4"
    ),
    new Product(
        "Ensayos y estudios de casos", 
        50,
        "P5"
    ),
    new Product(
        "Libros electrónicos sobre estrategias de protección de marcas", 
        99,
        "P6"
    )
);

services.push(
    new Service(
        "Evaluación de fortaleza distintiva de una marca propuesta",
        250,
        "por evaluación",
        "S3"
    ),
    new Service(
        "Orientación sobre requisitos legales y pasos para el registro", 
        150,
        "por consulta",
        "S4"
    ),
    new Service(
        "Recomendaciones de estrategias de protección de marcas", 
        200,
        "por recomendación",
        "S5"
    ),
    new Service(
        "Consejos para la redacción y presentación de solicitudes", 
        100,
        "por sesión de asesoramiento",
        "S6"
    )
)

generateMessage(products, services, formatProducts, formatServices);


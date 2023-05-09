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

function Product(name, price) {
    this.name = name;
    this.price = price;
 }
  
function Service(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;    
}
let products = [
    new Product("Artículo sobre el proceso de registro de una marca", 5),
    new Product("Artículo sobre el proceso de registro de una patente", 10),
    new Product("Artículo sobre el registro de un dominio", 5),
];
let services = [
    new Service(
      "Búsqueda de identidad de marcas completa",
      100,
      "Incluye análisis de registrabilidad"
    ),
    new Service(
      "Búsqueda de identidad de marcas simple",
      50,
      "Incluye únicamente un listado de identidad de marcas"
    ),
];
let message = "Ofrecemos los siguientes productos y servicios:\n\n";
message += "PRODUCTOS:\n";
for (let i = 0; i < products.length; i++) {
    message += `${i + 1}. ${products[i].name} - USD ${products[i].price}\n`;
}
message += "\nSERVICIOS:\n";
for (let i = 0; i < services.length; i++) {
    message += `${i + 1}. ${services[i].name}, USD ${services[i].description} (${services[i].price})\n `;
}
alert(message);




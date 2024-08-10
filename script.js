// Precio por kilogramo
const pricePerKg = 13;

// Evento para manejar el cálculo del importe total cuando se cambia el peso de la tarta
document.getElementById("cakeWeight").addEventListener("input", function() {
    const weight = parseFloat(this.value);
    const total = weight * pricePerKg;
    document.getElementById("totalAmount").value = total.toFixed(2);
});

// Evento para manejar el envío del formulario de pedido
document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que se recargue la página
    
    // Obtener los datos del pedido
    const customerName = document.getElementById("customerName").value;
    const deliveryDate = document.getElementById("deliveryDate").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const cakeWeight = parseFloat(document.getElementById("cakeWeight").value);
    const filling = Array.from(document.getElementById("filling").selectedOptions).map(option => option.value);
    const cover = Array.from(document.getElementById("cover").selectedOptions).map(option => option.value);
    const photoOption = document.getElementById("photoOption").checked;
    const candles = Array.from(document.getElementById("candles").selectedOptions).map(option => option.value);
    const notes = document.getElementById("notes").value;
    const totalAmount = parseFloat(document.getElementById("totalAmount").value);
    const advance = parseFloat(document.getElementById("advance").value) || 0;
    const remainingBalance = totalAmount - advance;

    // Crear objeto de pedido
    const order = {
        customerName,
        deliveryDate,
        phoneNumber,
        cakeWeight,
        filling,
        cover,
        photoOption,
        candles,
        notes,
        totalAmount,
        advance,
        remainingBalance
    };

    // Guardar el pedido en el historial
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Mostrar el historial de pedidos
    displayOrders();

    alert("Pedido añadido con éxito.");
});

// Función para mostrar el historial de pedidos
function displayOrders() {
    const ordersList = document.getElementById("ordersList");
    ordersList.innerHTML = ''; // Limpiar la lista actual
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.forEach((order, index) => {
        const orderElement = document.createElement("div");
        orderElement.classList.add("order-item");
        orderElement.innerHTML = `
            <h3>Pedido #${index + 1}</h3>
            <p><strong>Cliente:</strong> ${order.customerName}</p>
            <p><strong>Fecha de Entrega:</strong> ${order.deliveryDate}</p>
            <p><strong>Teléfono:</strong> ${order.phoneNumber}</p>
            <p><strong>Peso:</strong> ${order.cakeWeight} kg</p>
            <p><strong>Relleno:</strong> ${order.filling.join(', ')}</p>
            <p><strong>Cubierta:</strong> ${order.cover.join(', ')}</p>
            <p><strong>Foto:</strong> ${order.photoOption ? 'Sí' : 'No'}</p>
            <p><strong>Velas:</strong> ${order.candles.join(', ')}</p>
            <p><strong>Anotaciones:</strong> ${order.notes}</p>
            <p><strong>Importe Total:</strong> ${order.totalAmount} €</p>
            <p><strong>Anticipo:</strong> ${order.advance} €</p>
            <p><strong>Importe Pendiente:</strong> ${order.remainingBalance} €</p>
        `;
        ordersList.appendChild(order

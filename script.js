// Store data
let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Save functions
function saveVehicles() {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
}

function saveOrders() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Tab Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove active class from all tabs
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        link.classList.add('active');
        document.getElementById(`${link.dataset.tab}-tab`).classList.add('active');
    });
});

// Vehicle Management
document.getElementById('showAddVehicleForm').addEventListener('click', () => {
    document.getElementById('addVehicleForm').classList.remove('hidden');
});

document.getElementById('cancelAddVehicle').addEventListener('click', () => {
    document.getElementById('addVehicleForm').classList.add('hidden');
    document.getElementById('vehicleForm').reset();
});

// Display vehicles
function displayVehicles() {
    const vehiclesGrid = document.querySelector('.vehicles-grid');
    const selectVehicle = document.getElementById('selectVehicle');
    
    vehiclesGrid.innerHTML = '';
    selectVehicle.innerHTML = '<option value="">Select a vehicle</option>';
    
    vehicles.forEach((vehicle, index) => {
        // Create vehicle card
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-card';
        vehicleCard.innerHTML = `
            <h3>${vehicle.type.toUpperCase()}</h3>
            <p>License Plate: ${vehicle.licensePlate}</p>
            <p>Capacity: ${vehicle.capacity} kg</p>
            <p>Driver: ${vehicle.driverName}</p>
            <button onclick="deleteVehicle(${index})">Delete</button>
        `;
        vehiclesGrid.appendChild(vehicleCard);

        // Add to select dropdown
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${vehicle.type} - ${vehicle.licensePlate}`;
        selectVehicle.appendChild(option);
    });
}

// Vehicle form submission
document.getElementById('vehicleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const vehicle = {
        type: document.getElementById('vehicleType').value,
        licensePlate: document.getElementById('licensePlate').value,
        capacity: document.getElementById('capacity').value,
        driverName: document.getElementById('driverName').value
    };
    
    vehicles.push(vehicle);
    saveVehicles();
    displayVehicles();
    
    this.reset();
    document.getElementById('addVehicleForm').classList.add('hidden');
});

// Order Management
document.getElementById('showNewOrderForm').addEventListener('click', () => {
    document.getElementById('newOrderForm').classList.remove('hidden');
});

document.getElementById('cancelNewOrder').addEventListener('click', () => {
    document.getElementById('newOrderForm').classList.add('hidden');
    document.getElementById('orderForm').reset();
});

// Display orders
function displayOrders(filterType = 'all') {
    const ordersGrid = document.querySelector('.orders-grid');
    ordersGrid.innerHTML = '';
    
    const filteredOrders = filterType === 'all' 
        ? orders 
        : orders.filter(order => order.type === filterType);
    
    filteredOrders.forEach((order, index) => {
        const orderCard = document.createElement('div');
        orderCard.className = 'vehicle-card';
        orderCard.innerHTML = `
            <h3>${order.type.toUpperCase()}</h3>
            <p>Address: ${order.address}</p>
            <p>Date: ${new Date(order.date).toLocaleString()}</p>
            <p>Vehicle: ${order.vehicle}</p>
            <button onclick="deleteOrder(${index})">Delete</button>
        `;
        ordersGrid.appendChild(orderCard);
    });
}

// Order form submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const order = {
        type: document.getElementById('orderType').value,
        address: document.getElementById('address').value,
        date: document.getElementById('orderDate').value,
        vehicle: document.getElementById('selectVehicle').options[
            document.getElementById('selectVehicle').selectedIndex
        ].text
    };
    
    orders.push(order);
    saveOrders();
    displayOrders();
    
    this.reset();
    document.getElementById('newOrderForm').classList.add('hidden');
});

// Filter orders
document.getElementById('orderFilter').addEventListener('change', function(e) {
    displayOrders(e.target.value);
});

// Delete functions
function deleteVehicle(index) {
    if(confirm('Are you sure you want to delete this vehicle?')) {
        vehicles.splice(index, 1);
        saveVehicles();
        displayVehicles();
    }
}

function deleteOrder(index) {
    if(confirm('Are you sure you want to delete this order?')) {
        orders.splice(index, 1);
        saveOrders();
        displayOrders();
    }
}

// Initialize displays
document.addEventListener('DOMContentLoaded', () => {
    displayVehicles();
    displayOrders();
}); 
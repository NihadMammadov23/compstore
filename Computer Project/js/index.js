var users = [];
var computers = [];
var categories = [];
var orders = [];

function onLogin() {
    window.location.href = "login.html"
}

function onSettings() {
    window.location.href = "settings.html"
}

var adminPageButton = document.getElementById('admin-page-button');
adminPageButton.addEventListener('click', function () {
    window.location.href = 'admin.html';
});

var myComputersButton = document.getElementById('my-computers-button');
myComputersButton.addEventListener('click', function () {
    window.location.href = 'computers.html';
});

var myOrdersButton = document.getElementById('my-orders-button');
myOrdersButton.addEventListener('click', function () {
    window.location.href = 'orders.html';
});

var myShoppingButton = document.getElementById('my-shopping-button');
myShoppingButton.addEventListener('click', function () {
    window.location.href = 'shopping.html';
});

var loginButton = document.getElementById('login-page-button');

var logoutButton = document.getElementById('logout-page-button');

var userLoggedIn = false;

var loggedInUserId = localStorage.getItem('logged-in-user-id')
if (loggedInUserId == null) {
    userLoggedIn = false;
} else {
    userLoggedIn = true;
}

var showSuccessLoginMessage = localStorage.getItem('show-success-login-message');
if (showSuccessLoginMessage == null) {

} else {
    document.getElementById('success-logout-alert').style.display = 'none';
    localStorage.removeItem('show-success-login-message');

    document.getElementById('success-login-alert').style.display = 'block';
    setTimeout(() => {
        document.getElementById('success-login-alert').style.display = 'none';
    }, 3000);
}

function showButtons() {
    if (userLoggedIn) {
        loginButton.style.display = 'none';
        myComputersButton.style.display = 'inline-block';
        myOrdersButton.style.display = 'inline-block';
        logoutButton.style.display = 'inline-block';
        myShoppingButton.style.display = 'inline-block';
    } else {
        logoutButton.style.display = 'none';
        myComputersButton.style.display = 'none';
        myOrdersButton.style.display = 'none';
        myShoppingButton.style.display = 'none';
        loginButton.style.display = 'inline-block';
    }
}

showButtons();

function onLogout() {
    setTimeout(() => {
        userLoggedIn = false;
        localStorage.removeItem('logged-in-user-id');
        localStorage.removeItem('logged-in-user-name');
        showButtons();
        document.getElementById('success-logout-alert').style.display = 'block';
        setTimeout(() => {
            document.getElementById('success-logout-alert').style.display = 'none';
        }, 2000);
    }, 1000);
}

function addObjects() {
    users.push({ id: 1, name: 'User-1', phone: '055-555-55-55', username: 'u1', password: 'p1' });
    users.push({ id: 2, name: 'User-2', phone: '055-555-55-55', username: 'u2', password: 'p2' });
    users.push({ id: 3, name: 'User-1', phone: '055-555-55-55', username: 'u3', password: 'p3' });
    users.push({ id: 4, name: 'User-1', phone: '055-555-55-55', username: 'u4', password: 'p4' });
    users.push({ id: 5, name: 'User-1', phone: '055-555-55-55', username: 'u5', password: 'p5' });
    users.push({ id: 1, name: 'Admin', phone: '055-555-55-55', username: 'admin', password: 'admin' });

    //Add categories

    categories.push({ id: 1, name: 'Acer' });
    categories.push({ id: 2, name: 'Hp' });
    categories.push({ id: 3, name: 'Asus' });
    categories.push({ id: 4, name: 'Dell' });
    categories.push({ id: 5, name: 'Lenovo' });
    categories.push({ id: 6, name: 'Lg' });
    categories.push({ id: 7, name: 'Casper' });
    categories.push({ id: 8, name: 'Fujitsu' });
    categories.push({ id: 9, name: 'Nexus' });
    categories.push({ id: 10, name: 'Samsung' });
    categories.push({ id: 11, name: 'Toshiba' });
    categories.push({ id: 12, name: 'Sony' });

    //Add computers
    computers.push({ id: 1, name: 'Acer-1', price: 570, description: 'Acer-1 desc', isNew: false, imagePath: 'images/acer.jpg', userId: 1, categoryId: 1 });
    computers.push({ id: 2, name: 'Acer-2', price: 570, description: 'Acer-2 desc', isNew: false, imagePath: 'images/acer.jpg', userId: 1, categoryId: 1 });
    computers.push({ id: 3, name: 'Acer-3', price: 570, description: 'Acer-3 desc', isNew: false, imagePath: 'images/acer.jpg', userId: 1, categoryId: 1 });
    computers.push({ id: 4, name: 'Acer-4', price: 570, description: 'Acer-4 desc', isNew: false, imagePath: 'images/acer.jpg', userId: 1, categoryId: 1 });
    computers.push({ id: 5, name: 'Acer-5', price: 570, description: 'Acer-5 desc', isNew: false, imagePath: 'images/acer.jpg', userId: 1, categoryId: 1 });
    computers.push({ id: 6, name: 'Acer-6', price: 570, description: 'Acer-6 desc', isNew: false, imagePath: 'images/acer.jpg', userId: 1, categoryId: 1 });
    computers.push({ id: 7, name: 'Acer-7', price: 570, description: 'Acer-7 desc', isNew: false, imagePath: 'images/acer.jpg', userId: 1, categoryId: 1 });
    computers.push({ id: 8, name: 'Acer-8', price: 570, description: 'Acer-8 desc', isNew: false, imagePath: 'images/acer.jpg', userId: 1, categoryId: 1 });
    computers.push({ id: 9, name: 'Acer-9', price: 570, description: 'Acer-9 desc', isNew: false, imagePath: 'images/acer.jpg', userId: 1, categoryId: 1 });
    computers.push({ id: 10, name: 'Acer-10', price: 570, description: 'Acer-10 desc', isNew: false, imagePath: 'images/acer.jpg', userId: 1, categoryId: 1 });

    var idCounter = 0;
    for (let i = 0; i < 40; i++) {
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'Acer-' + idCounter,
            price: computers[i].price,
            description: 'Acer-' + idCounter + ' desc',
            isNew: computers[i].isNew,
            imagePath: 'images/acer.jpg',
            userId: computers[i].userId,
            categoryId: 1
        })
    }


    // HP komputerleri elave et


    for (let i = 0; i < 200; i++) {
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'Hp-' + idCounter,
            price: computers[i].price,
            description: 'Hp-' + idCounter + ' desc',
            isNew: computers[i].isNew,
            imagePath: 'images/hp.jpg',
            userId: computers[i].userId,
            categoryId: 2
        })
    }

    for (let i = 0; i < 200; i++) {
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'Asus-' + idCounter,
            price: computers[i].price,
            description: 'Asus-' + idCounter + ' desc',
            isNew: computers[i].isNew,
            imagePath: 'images/asus.jpg',
            userId: computers[i].userId,
            categoryId: 3
        })
    }

    for (let i = 0; i < 200; i++) {
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'Dell-' + idCounter,
            price: computers[i].price,
            description: 'Dell-' + idCounter + ' desc',
            isNew: computers[i].isNew,
            imagePath: 'images/dell.jpg',
            userId: computers[i].userId,
            categoryId: 4
        })
    }

    for (let i = 0; i < 200; i++) {
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'Lenovo-' + idCounter,
            price: computers[i].price,
            description: 'Lenovo-' + idCounter + ' desc',
            isNew: computers[i].isNew,
            imagePath: 'images/lenovo.jpg',
            userId: computers[i].userId,
            categoryId: 5
        })
    }

    for (let i = 0; i < computers.length; i++) {
        const c = computers[i];
        c.ram = 8;
        c.cpu = 'Core i 9'
        c.drive = 500;
        c.driveType = (i % 2 == 0) ? 'hdd' : 'sdd';
        c.os = 'Windows 10';
        c, videoCard = 3;
    }

    for (let i = 0; i < computers.length; i++) {
        const c = computers[i];

        for (let j = 0; j < computers.length; j++) {
            const u = users[j];
            if (u.id === c.userId) {
                c.phone = u.phone;
                break;
            }


        }
    }
}

addObjects();

function loadDataFromLocalStorage() {
    var userString = localStorage.getItem('users');
    var categoriesString = localStorage.getItem('categories');
    var computersString = localStorage.getItem('computers');

    if (userString == null) {
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        users = JSON.parse(userString);
    }

    if (categoriesString == null) {
        localStorage.setItem('categories', JSON.stringify(categories));
    } else {
        categories = JSON.parse(categoriesString);
    }

    if (computersString == null) {
        localStorage.setItem('computers', JSON.stringify(computers));
    } else {
        computers = JSON.parse(computersString);
    }
}
loadDataFromLocalStorage();

console.log('Number of all Computers:' + computers.length);
console.log('Number of users:' + users.length);

function onClearLocalStorage() {
    localStorage.removeItem('users');
    localStorage.removeItem('categories');
    localStorage.removeItem('computers');
    localStorage.removeItem('basketComputers');
    localStorage.removeItem('orders');
    localStorage.removeItem('customers');
    localStorage.removeItem('order-customer');
    localStorage.removeItem('logged-in-user-id');
    window.location.reload();
}

var customers = [];
customers.push({id: 1,name:'Customer-1', address: 'Customer-1 adress', phone: '050-842-5395', email: 'customer@gmail.com'});
customers.push({id: 2,name:'Customer-2', address: 'Customer-2 adress', phone: '050-842-5395', email: 'customer@gmail.com'});
customers.push({id: 3,name:'Customer-3', address: 'Customer-3 adress', phone: '050-842-5395', email: 'customer@gmail.com'});
customers.push({id: 4,name:'Customer-4', address: 'Customer-4 adress', phone: '050-842-5395', email: 'customer@gmail.com'});


var customersString = localStorage.getItem('customers');

if(customersString == null){
    localStorage.setItem('customers', JSON.stringify(customers));
}else{
    customers = JSON.parse(customersString);
}

var order1 = {};
order1.id = 1;
order1.note = "2 gun erzinde catdirilsin";
var order1BasketComputers = [];
order1BasketComputers.push({id:1, count:7, computer: computers[1]});
order1BasketComputers.push({id:2, count:4, computer: computers[2]});
order1BasketComputers.push({id:3, count:2, computer: computers[3]});
order1.basketComputers = order1BasketComputers;
order1.customer = customers[1];
order1.userId = 1;
order1.register = new Date(2020, 06, 26);
order1.totalPrice = calculateOrderTotalPrice(order1);


var order2 = {};
order2.id = 1;
order2.note = "2 gun erzinde catdirilsin elave mousda olsun";
var order2BasketComputers = [];
order2BasketComputers.push({id:1, count:5, computer: computers[225]});
order2BasketComputers.push({id:2, count:6, computer: computers[45]});
order2BasketComputers.push({id:3, count:2, computer: computers[90]});
order2.basketComputers = order2BasketComputers;
order2.customer = customers[2];
order2.userId = 1;
order2.register = new Date(2020, 06, 26);
order2.totalPrice = calculateOrderTotalPrice(order2);


var order3 = {};
order3.id = 1;
order3.note = "2 gun erzinde catdirilsin elave klaviatura olsun";
var order3BasketComputers = [];
order3BasketComputers.push({id:1, count:5, computer: computers[325]});
order3BasketComputers.push({id:2, count:6, computer: computers[145]});
order3BasketComputers.push({id:3, count:2, computer: computers[490]});
order3.basketComputers = order3BasketComputers;
order3.customer = customers[3];
order3.userId = 1;
order3.register = new Date(2020, 06, 26);
order3.totalPrice = calculateOrderTotalPrice(order3)


orders.push(order1);
orders.push(order2);
orders.push(order3);

var ordersString = localStorage.getItem('orders');

if(ordersString == null){
    localStorage.setItem('orders',JSON.stringify(orders));
}else{
    orders = JSON.parse(ordersString)
}


function calculateOrderTotalPrice(order){
    var totalPrice = 0 ;
    for(let i = 0; i< order.basketComputers.length; i++){
        const b = order.basketComputers[i];
        totalPrice += b.count * b.computer.price;
    }

    return totalPrice;
}
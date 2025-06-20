var computerCategoriesElement = document.getElementById('computer-categories-div');
var computersElement = document.getElementById('computers-div');
var computersLoading = document.getElementById('computers-loading');
var basketComputersCount = document.getElementById('basket-computer-count');
var openBasketButton = document.getElementById('open-basket-button');
var computerModalName = document.getElementById('computer-modal-name');
var computerModalDescription = document.getElementById('computer-modal-description');
var computerModalPrice = document.getElementById('computer-modal-price');
var computerModalPhone = document.getElementById('computer-modal-phone');
var computerModalNew = document.getElementById('computer-modal-isNew');
var computerModalRam = document.getElementById('computer-modal-ram');
var computerModalCpu = document.getElementById('computer-modal-cpu');
var computerModalDrive = document.getElementById('computer-modal-drive');
var computerModalDriveType = document.getElementById('computer-modal-drive-type');
var computerModalOS = document.getElementById('computer-modal-os');
var computerModalVideoCard = document.getElementById('computer-modal-video-card');
var computersDetailsModal = document.getElementById('computer-details-modal');
var computersDetailsModalContent = document.getElementById('computer-details-modal-content');
var basketModalElement = document.getElementById('basket-modal');
var basketModalCloseButton = document.getElementById('basket-modal-close-button');
var basketComputersTableBodyElement = document.getElementById('basket-computers-table-body');
var basketTotalPriceContentElement = document.getElementById('basket-total-price-content');
var confirmOrderModalElement = document.getElementById('confirm-order-modal');
var confirmOrderModalCloseButtonElement = document.getElementById('confirm-order-modal-close-button');
var customerNameElement = document.getElementById('customer-name');
var customerAdressElement = document.getElementById('customer-adress');
var customerPhoneElement = document.getElementById('customer-phone');
var customerEmailElement = document.getElementById('customer-mail');
var customerOrderNoteElement = document.getElementById('customer-order-note');
var computerSearchInputElement = document.getElementById('computer-search-input');
var computerModalImageContainer = document.getElementById('computer-modal-image-container');
var computersLoadingNext = document.getElementById('computers-loading-next');

var users = [];
var categories = [];
var categoriesGlobal = [];
var computers = [];
var computersGlobal = [];
var computersSelectedGlobal = [];
var computersSelectedGlobalForSearch = [];
var basketComputers = [];
var currentSelectedCategoryId = 0;

var allComputersLoaded = false;
var begin = 0;
var length = 25;
var allowScroll = false;

function loadDataFromLocalStorage() {
    var usersString = localStorage.getItem('users');
    var categoriesString = localStorage.getItem('categories');
    var computersString = localStorage.getItem('computers');
    var basketComputersString = localStorage.getItem('basketComputers');

    if (usersString == null) {
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        users = JSON.parse(usersString);
    }

    if (categoriesString == null) {
        localStorage.setItem('categories', JSON.stringify(categories));
    } else {
        categories = JSON.parse(categoriesString);
        categoriesGlobal = categories.slice();
    }

    if (computersString == null) {
        localStorage.setItem('computers', JSON.stringify(computers));
    } else {
        computers = JSON.parse(computersString);
        computersGlobal = computers.slice();
    }

    if (basketComputersString == null) {
        localStorage.setItem('basketComputers', '[]');
    } else {
        basketComputers = JSON.parse(basketComputersString);
    }

    showBasketComputerCount();
}

loadDataFromLocalStorage();

function showBasketComputerCount() {
    basketComputersCount.innerHTML = basketComputers.length;
}

function loadComputerCategories() {
    computerCategoriesElementHTML = "<ul class = 'list-group'>";
    for (let i = 0; i < categories.length; i++) {
        const c = categories[i];
        computerCategoriesElementHTML += "<li class = 'list-group-item list-group-item-action' id = 'computer-category-" + c.id + "' onclick = 'onCategorySelected(" + c.id + ")'>" + c.name + "</li>";
    }

    computerCategoriesElementHTML += "</ul>";
    computerCategoriesElement.innerHTML = computerCategoriesElementHTML;
}

loadComputerCategories();

function onCategorySelected(categoryId) {
    if (currentSelectedCategoryId === categoryId) {

    } else {
        currentSelectedCategoryId = categoryId;
        computersLoading.style.display = 'block';
        computersElement.innerHTML = '';
        computersElement.style.display = 'none';
        begin = 0;
        allComputersLoaded = false;
        allowScroll = true;

        for (let i = 0; i < categories.length; i++) {
            const c = categories[i];
            if (c.id == categoryId) {
                document.getElementById('computer-category-' + c.id).style.color = 'blue';
                document.getElementById('computer-category-' + c.id).style.fontWeight = 'bold';
            } else {
                document.getElementById('computer-category-' + c.id).style.color = 'black';
                document.getElementById('computer-category-' + c.id).style.fontWeight = 'normal';
            }

            setTimeout(() => {
                computersLoading.style.display = 'none';
                var computersSelected = [];
                for (let i = 0; i < computers.length; i++) {
                    const c = computers[i];
                    if (c.categoryId === categoryId) {
                        computersSelected.push(c);
                    }
                }

                for (let i = 0; i < computersSelected.length; i++) {
                    const c = computersSelected[i];
                    for (let j = 0; j < users.length; j++) {
                        const u = users[j];
                        if (u.id === c.userId) {
                            c.phone = u.phone;
                            break;
                        }
                    }
                }

                computersSelectedGlobal = computersSelected.slice();
                computersSelectedGlobalForSearch = computersSelected.slice();
                computersElementHTML = '';

                if (computersSelected.length <= length) {
                    allComputersLoaded = true;
                }

                computersSelected = computersSelected.slice(begin, length);

                for (var i = 0; i < computersSelected.length; i++) {
                    const c = computersSelected[i];
                    computersElementHTML += "<div class='computer-card-container' >" +
                        "<div class='computer-card' >" +
                        "<div class='computer-image' onclick='onComputerSelected(" + c.id + ")' style='background-image:url(" + c.imagePath + ");'></div>" +
                        "<div class='computer-data'><div class='computer-name' title='" +
                        c.name + "'>" + c.name + "</div>" +
                        "<div class='computer-description' title='" +
                        c.description + "'>" + c.description + "</div>" +
                        "<div class='computer-price' title='" + c.price + " AZN'>" +
                        c.price + " AZN</div>" +
                        "<div class='computer-new'>" + (c.isNew ? 'Bəli' : 'Xeyr') + "</div>" +
                        "<div class='user-phone' title='" + c.phone + "'>" + c.phone + "</div>" +
                        "<div class='add-to-basket-div'><button class='btn btn-primary' " +
                        "onclick='onAddToBasket(" +
                        c.id + ")'>Səbətə at</button></div>" +
                        "</div></div></div>";
                }

                computersElement.innerHTML = computersElementHTML;
                computersElement.style.display = 'block';

                if (computersSelected.length == 0) {
                    computersElement.innerHTML = "<h2 class = 'not-found'>There is no computer in this category</h2>"
                }
            }, 500);
        }
    }
}

onCategorySelected(1);


function onComputerSelected(computerId) {
    computersDetailsModal.style.display = 'block';
    var selectedComputer = null;
    for (let i = 0; i < computers.length; i++) {
        const c = computers[i];
        if (c.id === computerId) {
            selectedComputer = c;
            break;
        }
    }

    computerModalImageContainer.style.backgroundImage = "url('" + selectedComputer.imagePath + "')";
    computerModalName.innerHTML = selectedComputer.name;
    computerModalDescription.innerHTML = selectedComputer.description;
    computerModalPrice.innerHTML = selectedComputer.price;
    computerModalPhone.innerHTML = selectedComputer.phone;
    computerModalNew.innerHTML = (selectedComputer.isNew ? 'Yes' : 'No');
    computerModalRam.innerHTML = selectedComputer.ram + " GB";
    computerModalCpu.innerHTML = selectedComputer.cpu;
    computerModalDrive.innerHTML = selectedComputer.drive;
    computerModalDriveType.innerHTML = selectedComputer.drivetype == 'hdd' ? "HDD" : "SDD";
    computerModalOS.innerHTML = selectedComputer.os;
    computerModalVideoCard.innerHTML = selectedComputer.videoCard + " GB";
}

window.addEventListener('click', function () {
    if (event.target === computersDetailsModal) {
        computersDetailsModal.style.display = 'none';
    }
});

function onAddToBasket(computerId) {
    openBasketButton.style.display = 'none';
    setTimeout(() => {
        openBasketButton.style.display = 'inline-block';
        var existsInBasket = false;
        for (let i = 0; i < basketComputers.length; i++) {
            const b = basketComputers[i];
            if (b.computerId === computerId) {
                b.count++;
                existsInBasket = true;
                break;
            }
        }
        if (existsInBasket) {

        } else {
            var selectedComputer = null;
            for (let i = 0; i < computers.length; i++) {
                const c = computers[i];
                if (c.id === computerId) {
                    selectedComputer = c;
                    break;
                }
            }

            basketComputers.push({ count: 1, computer: selectedComputer });
        }

        showBasketComputerCount();
        saveBasketComputersToLocaStorage()

    }, 200);
}

function saveBasketComputersToLocaStorage() {
    localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
}

function refreshComputersBasket() {
    basketComputersTableBodyElement.innerHTML = '';
    basketComputersTableBodyElementHtml = '';
    for (let index = 0; index < basketComputers.length; index++) {
        const b = basketComputers[index];
        basketComputersTableBodyElementHtml += '<tr><td>' + b.computer.id;
        basketComputersTableBodyElementHtml += '</td><td><img class="basket-computer-image" src="' +
            b.computer.imagePath + '"/>';
        basketComputersTableBodyElementHtml += '</td><td>' + b.computer.name;
        basketComputersTableBodyElementHtml += '</td><td>' + b.computer.price;
        basketComputersTableBodyElementHtml += ' AZN</td><td><input min="1" max="10000" type="number" value="' +
            b.count + '" ' +
            ' onchange="computerCountChanged(this,' + b.computer.id + ')" onkeypress="checkCount(event)" />';
        basketComputersTableBodyElementHtml += '</td><td id="computer-total-price-' +
            b.computer.id + '">' + (b.computer.price * b.count);
        basketComputersTableBodyElementHtml += ' AZN</td><td><button onclick="deleteBasketComputer(' +
            b.computer.id +
            ')" class="btn btn-danger">Sil</button></td><tr>';
    }
    basketComputersTableBodyElement.innerHTML = basketComputersTableBodyElementHtml;
}

function calculateBasketTotalPrice() {
    var totalPrice = 0;
    for (let i = 0; i < basketComputers.length; i++) {
        const b = basketComputers[i];
        totalPrice += b.count * b.computer.price;
    }
    basketTotalPriceContentElement.innerHTML = totalPrice;
}

calculateBasketTotalPrice();

function onOpenBasket() {
    if (basketComputers.length === 0) {
        showAlertMessage('Basket is empty!', 1000)
    } else {
        basketModalElement.style.display = 'block';
        refreshComputersBasket();
        calculateBasketTotalPrice();
    }
}

basketModalCloseButton.addEventListener('click', function () {
    closeBasket();
});

function closeBasket() {
    setTimeout(() => {
        basketModalElement.style.display = 'none';
    }, 200);
}

function showAlertMessage(message, duration) {
    var messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('alert-message');

    var fixedElements = document.getElementById('fixed-elements');
    fixedElements.appendChild(messageElement);
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
        messageElement.remove();
    }, duration);
}


function computerCountChanged(countInput, computerId) {
    if (countInput.value == '' || countInput.value == '0') {
        countInput.value = '1';
    }

    for (let i = 0; i < basketComputers.length; i++) {
        const b = basketComputers[i];
        if (b.computer.id === computerId) {
            b.count = Number(countInput.value);
            document.getElementById('computer-total-price-' + b.computer.id).innerHTML = "" + (b.count * b.computer.price) + "AZN";
            break;
        }
    }

    localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
    calculateBasketTotalPrice();
}

function deleteBasketComputer(computerId) {
    for (let i = 0; i < basketComputers.length; i++) {
        const b = basketComputers[i];
        if (b.computer.id === computerId) {
            basketComputers.splice(i, 1);
            break;
        }
    }

    refreshComputersBasket();
    localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
    calculateBasketTotalPrice();
    hideAndShowBasketButton();
    if (basketComputers.length === 0) {
        closeBasket();
    }
}

function hideAndShowBasketButton() {
    openBasketButton.style.display = 'none';
    setTimeout(() => {
        openBasketButton.style.display = 'block';
        showBasketComputerCount();
    }, 200);
}

function clearBasket() {
    basketComputers.splice(0, basketComputers.length);
    refreshComputersBasket();
    localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
    calculateBasketTotalPrice();
    hideAndShowBasketButton();
    setTimeout(() => {
        closeBasket();
    }, 500);
}

function confirmOrder() {
    closeBasket();
    setTimeout(() => {
        openConfirmOrderModalPage();
    }, 200);
}

function fillCustomerInformation() {
    var customersString = localStorage.getItem('order-customer');
    var orderCustomer = {};
    if (customersString == null) {

    } else {
        orderCustomer = JSON.parse(customersString);
        customerNameElement.value = orderCustomer.name;
        customerAdressElement.value = orderCustomer.adress;
        customerPhoneElement.value = orderCustomer.phone;
        customerEmailElement.value = orderCustomer.email;
        customerOrderNoteElement.value = orderCustomer.orderNote;
    }
}

function openConfirmOrderModalPage() {
    confirmOrderModalElement.style.display = 'block';
    fillCustomerInformation();
}

confirmOrderModalCloseButtonElement.addEventListener('click', function () {
    closeConfirmOrder();
})

function closeConfirmOrder() {
    setTimeout(() => {
        confirmOrderModalElement.style.display = 'none';
    }, 100);
}

function onOrderSubmit() {
    event.preventDefault();
    var orderObject = {};
    orderObject.note = customerOrderNoteElement.value;
    orderObject.basketComputers = basketComputers;
    var customer = {};
    customer.name = customerNameElement.value;
    customer.adress = customerAdressElement.value;
    customer.phone = customerPhoneElement.value;
    customer.email = customerEmailElement.value;
    orderObject.customer = customer;
    orderObject.register = new Date();
    var orders = [];
    var orderString = localStorage.getItem('orders');
    if (orderString == null) {
        localStorage.setItem('orders', '[]');
    } else {
        orders = JSON.parse(orderString);
    }

    var userIdList = [];
    for (let i = 0; i < orderObject.basketComputers.length; i++) {
        const b = orderObject.basketComputers[i];
        if (userIdList.includes(b.computer.userId)) {

        } else {
            userIdList.push(b.computer.userId);

        }
    }

    var orderId = 0;
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        if (order.id > orderId) {
            orderid = order.id;
        }
    }

    for (let i = 0; i < userIdList.length; i++) {
        var orderObjectLocal = {};
        orderId++;
        orderObjectLocal.id = orderId;
        orderObjectLocal.note = orderObject.note;
        orderObjectLocal.basketComputers = [];
        orderObjectLocal.userId = userIdList[i];

        for (let j = 0; j < orderObject.basketComputers.length; j++) {
            const b = orderObject.basketComputers[j];
            if (b.computer.userId === userIdList[i]) {
                orderObjectLocal.basketComputers.push(b);
            }
        }

        orderObjectLocal.customer = orderObject.customer;
        orderObjectLocal.register = orderObject.register;
        orderObjectLocal.totalPrice = calculateOrderTotalPrice(orderObjectLocal);
        orders.push(orderObjectLocal);
    }

    localStorage.setItem('orders', JSON.stringify(orders));
    customer.orderNote = orderObject.note;
    endOrderRegistration(customer);
}

function endOrderRegistration(customer) {
    basketComputers.splice(0, basketComputers.length);
    localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
    hideAndShowBasketButton();
    localStorage.setItem('order-customer', JSON.stringify(customer));
    closeConfirmOrder();

    setTimeout(() => {
        showAlertMessage('Sifarisiniz qeyde alindi!', 1500);
    }, 1000);
}

function calculateOrderTotalPrice(order) {
    var totalPrice = 0;
    for (let i = 0; i < order.basketComputers; i++) {
        const b = order.basketComputers[i];
        totalPrice += b.count * b.computer.price;
    }

    return totalPrice;
}

var computersElementHTML = "";


function addComputersToPage(computersLocal) {

    for (var i = 0; i < computersLocal.length; i++) {
        const c = computersLocal[i];
        computersElementHTML += "<div class='computer-card-container' >" +
            "<div class='computer-card' >" +
            "<div class='computer-image' onclick='onComputerSelected(" + c.id + ")' style='background-image:url(" + c.imagePath + ");'></div>" +
            "<div class='computer-data'><div class='computer-name' title='" +
            c.name + "'>" + c.name + "</div>" +
            "<div class='computer-description' title='" +
            c.description + "'>" + c.description + "</div>" +
            "<div class='computer-price' title='" + c.price + " AZN'>" +
            c.price + " AZN</div>" +
            "<div class='computer-new'>" + (c.isNew ? 'Bəli' : 'Xeyr') + "</div>" +
            "<div class='user-phone' title='" + c.phone + "'>" + c.phone + "</div>" +
            "<div class='add-to-basket-div'><button class='btn btn-primary' " +
            "onclick='onAddToBasket(" +
            c.id + ")'>Səbətə at</button></div>" +
            "</div></div></div>";
    }
    computersElement.innerHTML = computersElementHTML;
}

function onSearchKeyDown(event) {
    if (event.keyCode = 13) {
        begin = 0;
        allComputersLoaded = true;
        computersElement.innerHTML = '';
        computersElement.style.display = 'none';
        computersLoading.style.display = 'block';
        setTimeout(() => {
            computersLoading.style.display = 'none';
            computersElementHTML = '';
            var searchValue = event.target.value.toLowerCase();
            searchValue = searchValue.trim();
            var findedComputers = [];
            computersSelectedGlobal = computers.slice();
            for (let i = 0; i < computersSelectedGlobal.length; i++) {
                const c = computersSelectedGlobal[i];
                if (c.name.toLowerCase().includes(searchValue)) {
                    findedComputers.push(c);
                }
            }

            if (findedComputers.length <= length) {
                allComputersLoaded = true;
            }

            console.log("Finded computers length: " + findedComputers.length);
            computersGlobal = findedComputers.slice();
            findedComputers = findedComputers.slice(begin, length);
            addComputersToPage(findedComputers);
            computersElement.style.display = 'block';
            if (findedComputers.length == 0) {
                computersElement.innerHTML = '<h2 class = "not-found">Bu axtarisa uygun netice tapilmadi!</h2>';
            }
        }, 500);
    }
}

function searchCategory(searchInput) {
    var searchText = searchInput.value.trim();
    searchText = searchText.toLowerCase();
    categories = [];
    for (let i = 0; i < categoriesGlobal.length; i++) {
        const c = categoriesGlobal[i];
        if (c.name.toLowerCase().includes(searchText)) {
            categories.push(c);
        }
    }

    loadComputerCategories();
}


window.addEventListener('scroll', function () {
    if (allComputersLoaded) {
        console.log('Butun computerler yuklenib!')
    } else {
        if (allowScroll) {
            const distanceToBottom = document.body.getBoundingClientRect().bottom;
            const clientHeight = document.documentElement.clientHeight;
            if (distanceToBottom < clientHeight + 150) {
                allowScroll = false;
                computersLoadingNext.style.display = 'block';
                setTimeout(() => {
                    if (computersSelectedGlobal.length <= (begin + length)) {
                        allComputersLoaded = true;
                        computersLoadingNext.style.display = 'none';
                    } else {
                        begin += length;
                        var nextComputers = computersSelectedGlobal.slice(begin, begin + length);
                        addComputersToPage(nextComputers);
                        computersLoadingNext.style.display = 'none';
                    }

                    allowScroll = true;
                }, 1000);
            }
        }
    }
})

window.addEventListener('load',()=>{
    setTimeout(() => {
        allowScroll = true;
    }, 500);
})
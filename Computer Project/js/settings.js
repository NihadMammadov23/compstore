function onClearLocalStorage(){
    var result = confirm('Are you sure?');
    if(result){
        localStorage.removeItem('users');
        localStorage.removeItem('categories');
        localStorage.removeItem('logged-in-user-id');
        localStorage.removeItem('logged-in-user-name');
        localStorage.removeItem('computers');
        localStorage.removeItem('basketComputers');
        localStorage.removeItem('orders');
        localStorage.removeItem('customers');
        localStorage.removeItem('order-customer');
        alert('Informations Deleted!')
    }
}

var totalStepMarkElement = document.getElementById('total-step-mark');

function calculateTotalStepMark(){
    var totalStepMark = 0;
    var stepMarkElements = document.getElementsByClassName('step-mark');

    for(let i = 0; i < stepMarkElements.length; i++){
        const stepMarkElement = stepMarkElements[i];
        totalStepMark += Number(stepMarkElement.innerHTML)
    }

    totalStepMarkElement.innerHTML = totalStepMark;
}

calculateTotalStepMark();
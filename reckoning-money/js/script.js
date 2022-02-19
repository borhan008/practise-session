//Sending Error Messages
function errMsg(id, msg) {
    err = document.getElementById(id);
    err.innerText = msg;
    err.classList.remove('hidden');
}
//Removing Error Message
function errRemove(id) {
    document.getElementById(id).classList.add('hidden');
}
//Error in Placeholder
function placeholderErr(inputData, errText) {
    inputData.classList.add('border-red-500');
    inputData.value = "";
    inputData.setAttribute('placeholder', errText);
}


//Form Validation
function formValidation() {
    for (let i = 0; i < arguments.length; i++) {
        const input = document.getElementById(arguments[i]);
        if (input.value == "") {
            errMsg('err', "Form Shouldn't be empty.");
            placeholderErr(input, "It shouldn't be empty.");
            return false;
        } else if (isNaN(input.value)) {
            errMsg('err', "Form should be all number");
            placeholderErr(input, "It should be a number.");
            return false;
        } else if (parseFloat(input.value) < 0) {
            errMsg('err', "Form should be positive number");
            placeholderErr(input, "This is should be a positive number.");
            return false;
        }
        else {
            errRemove('err');
            input.classList.remove('border-red-500');
        }
    }
    return true;
}

//Function for showing the calculation(s)
function showCalculation(value, idName) {
    document.getElementById(idName).parentNode.parentNode.
        classList.remove('hidden');
    document.getElementById(idName).innerText = value;
}
//Hide all before the first Calculation
function hideAfterCalcDiv(className) {
    const afterCalcClass = document.getElementsByClassName(className);
    for (i = 0; i < afterCalcClass.length; i++) {
        afterCalcClass[i].classList.add('hidden');
    }
}

//Hide all before the first Calculation
function shoAfterCalcDiv(className) {
    const afterCalcClass = document.getElementsByClassName(className);
    for (i = 0; i < afterCalcClass.length; i++) {
        afterCalcClass[i].classList.remove('hidden');
    }
}

//Getting Expenses Function
function getExpenses(income, expenses) {
    let totalExpenses = 0;
    const incomeFloat = parseFloat(document.getElementById(income).value);
    for (i = 0; i < expenses.length; i++) {
        totalExpenses += parseFloat(document.getElementById(expenses[i]).value);
    }
    if (incomeFloat < totalExpenses) {
        errMsg('err', "Income is less than total expenses.");
        hideAfterCalcDiv('after-calculate');
    }
    else {
        const balance = incomeFloat - totalExpenses;
        shoAfterCalcDiv('after-calculate');
        errRemove('err');

        //returning the total expenses and balance
        const calulations = {
            allExpenses: totalExpenses,
            totalBalance: balance
        };
        return calulations;
    }
}


//Calculating Saving and remaining Balance
function saveCalculation(savePercentage, income, balance) {
    const totalSavings = (savePercentage * income) / 100;
    if (totalSavings > balance) {
        errMsg('err', "Savings is greater than balance.");
        return false;
    } else {
        showCalculation(totalSavings, 'saving-amount');
        showCalculation((balance - totalSavings), 'remaining-balance');
        return true;
    }
}



//Calculation Event: Expenses and Balance
document.getElementById('btn-calculate').addEventListener('click', function () {
    const formValidate = formValidation('income-input', 'food-input', 'rent-input', 'clothes-input');
    if (formValidate == true) {
        const expensesCalculations = getExpenses('income-input', ['food-input', 'rent-input', 'clothes-input']);
        //updating the values of expenses and balance
        showCalculation(expensesCalculations.allExpenses, 'total-expenses');
        showCalculation(expensesCalculations.totalBalance, 'total-balance');
        //enabling Save button
        document.getElementById('btn-save').removeAttribute('disabled');
    } else {
        //hiding the values of expenses and balance
        hideAfterCalcDiv('after-calculate');
        hideAfterCalcDiv('after-saving-calc');
        //disabling Save button
        document.getElementById('btn-save').setAttribute('disabled', 'true');

    }
})


//Calculation Event: Saving and Remaing Balance
document.getElementById('btn-save').addEventListener('click', function () {
    const saveValidate = formValidation('save-input');
    if (saveValidate == true) {
        const balance = parseFloat(document.getElementById('total-balance').innerText);
        const totalIncome = balance + parseFloat(document.getElementById('total-expenses').innerText);
        const savingValidate = saveCalculation(parseFloat(document.getElementById('save-input').value), totalIncome, balance);

        if (savingValidate == true) {
            shoAfterCalcDiv('after-saving-calc');
        } else {
            placeholderErr(document.getElementById('save-input'), "Savings is greater than Balance");
            hideAfterCalcDiv('after-saving-calc');
        }
    } else {
        hideAfterCalcDiv('after-saving-calc');
    }
});
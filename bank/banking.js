function getInput(inputId) {
    const inputField = document.getElementById(inputId);
    const inputAmountText = inputField.value;
    const inputAmountFloat = parseFloat(inputAmountText);
    inputField.value = "";
    return inputAmountFloat;
}

function updateTotalField(totalFieldId, amountF) {
    const totalField = document.getElementById(totalFieldId);
    const totalFieldFloat = parseFloat(totalField.innerText);
    let totalFieldAmount = amountF + totalFieldFloat;
    totalField.innerHTML = totalFieldAmount;
}

function getCurrentBlanace() {
    const balance = document.getElementById('total-balance');
    const balanceFloat = parseFloat(balance.innerText);
    return balanceFloat;
}

function updateBalance(totalAmount, isAdd) {
    const balance = document.getElementById('total-balance');

    const previousBalance = getCurrentBlanace();
    if (isAdd == true) {
        let totalBalance = totalAmount + previousBalance;
        balance.innerText = totalBalance;

    } else {
        let totalBalance = previousBalance - totalAmount;
        balance.innerText = totalBalance;

    }

}

document.getElementById('deposit-btn').addEventListener('click', function () {
    const depositAmoutF = getInput("deposit-field");
    if (depositAmoutF > 0) {
        updateTotalField('deposit-amount', depositAmoutF);
        updateBalance(depositAmoutF, true);
    }
});

document.getElementById('withdraw-btn').addEventListener('click', function () {
    const withdrawAmount = getInput('withdraw-field');
    const previousBalance = getCurrentBlanace();
    if (withdrawAmount > 0 && withdrawAmount <= previousBalance) {
        updateTotalField('withdraw-amount', withdrawAmount);
        updateBalance(withdrawAmount, false);
    }

});
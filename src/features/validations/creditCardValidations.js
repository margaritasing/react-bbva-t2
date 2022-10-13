const validCardNumber = numb => {
    const regex = new RegExp("^[0-9]{13,19}$");
    if (!regex.test(numb)) {
        return false;
    }
    return true;
}

const validCodeLength = code => {
    if(code.length === 3 || code.length === 4 ) {
        return true;
    } else {
        return false
    }
}

const validAmount = amount => {
    if(amount > 1) {
        return true
    } else {
        return false;
    }
}

export { validCardNumber, validCodeLength, validAmount }
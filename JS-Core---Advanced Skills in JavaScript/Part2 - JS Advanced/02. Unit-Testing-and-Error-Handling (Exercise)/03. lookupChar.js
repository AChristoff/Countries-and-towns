function lookupChar(string, index) {

    if (typeof string !== 'string' || !Number.isInteger(index)) {
        return undefined;
    } else if (index >= string.length || index < 0) {
        return 'Incorrect index';
    }

    return string.charAt(index);
}

module.exports = lookupChar;
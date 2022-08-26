const gridChars = 'abcdefghijklmnopqrstuvwxyz0123465789';

const removeDuplicateCharacters = (string) => {
    return string
        .split('')
        .filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
        })
        .join('');
}

const stringCleaner = (string) => {
    string = string.toLowerCase().replace(/[^a-z0-9]/g,'');
    return string;
}

const noDoubleChars = (string) => {
    for (i=1; i < string.length; i++) {
        if (string[i] === string[i-1]) {
            string = string.slice(0,i) + "q" + string.slice(i);
        };
    }
    return string
};

const encrypt = (plainText, keyPhrase) => {
    let output = ""
    plainText = noDoubleChars(plainText);
    plainText = stringCleaner(plainText);

    if (plainText.length % 2 != 0) {
        plainText += 'z';
    };

    let inputArray = [];
    for (let i = 0; i < plainText.length; i += 2) {
        let subArray = [plainText[i], plainText[i + 1]];
        inputArray.push(subArray);
    };

    keyPhrase = stringCleaner(keyPhrase);
    keyPhrase = keyPhrase += gridChars;
    keyPhrase = removeDuplicateCharacters(keyPhrase);

    let playfairArray = [];
    for (let i = 0; i < keyPhrase.length; i += 6) {
        let subArray = [keyPhrase[i], keyPhrase[i + 1], keyPhrase[i + 2], keyPhrase[i + 3], keyPhrase[i + 4], keyPhrase[i + 5]];
        playfairArray.push(subArray);
    }

    const getCoord = (char) => {
        let row;
        let col;
        for (y = 0; y < playfairArray.length; y++) {
            for (x = 0; x < playfairArray[y].length; x++) {
                if (char === playfairArray[y][x]) {
                    row = y;
                    col = x;
                }
            }
        };
        return {row: row, col: col};
    };

    inputArray.forEach(digram => {
        let char1 = digram[0];
        let char2 = digram[1];
    
        let coord1 = getCoord(char1);
        let coord2 = getCoord(char2);
    
        if (coord1.row == coord2.row) {
            coord1.col = (coord1.col + 1)%6;
            coord2.col = (coord2.col + 1)%6;
        } else if (coord1.col == coord2.col) {
            coord1.row = (coord1.row + 1)%6;
            coord2.row = (coord2.row + 1)%6;            
        } else {
            let colDiff = Math.abs(coord1.col - coord2.col);
            if (coord1.col > coord2.col) {
                coord1.col = coord1.col - colDiff;
                coord2.col = coord2.col + colDiff;
            } else if (coord2.col > coord1.col) {
                coord2.col = coord2.col - colDiff;
                coord1.col = coord1.col + colDiff;
            } else return 'large error';
        };
    
        let newChar1 = playfairArray[coord1.row][coord1.col];
        let newChar2 = playfairArray[coord2.row][coord2.col];
        output += newChar1 + newChar2;
    });

    console.log(output);
    return output;
};

const decrypt = (plainText, keyPhrase) => {
    let output = ""

    plainText = stringCleaner(plainText);
    if (plainText.length % 2 != 0) {
        plainText += 'z';
    };

    let inputArray = [];
    for (let i = 0; i < plainText.length; i += 2) {
        let subArray = [plainText[i], plainText[i + 1]];
        inputArray.push(subArray);
    };

    keyPhrase = stringCleaner(keyPhrase);
    keyPhrase = keyPhrase += gridChars;
    keyPhrase = removeDuplicateCharacters(keyPhrase);

    let playfairArray = [];
    for (let i = 0; i < keyPhrase.length; i += 6) {
        let subArray = [keyPhrase[i + 5], keyPhrase[i + 4], keyPhrase[i + 3], keyPhrase[i + 2], keyPhrase[i + 1], keyPhrase[i]];
        playfairArray.unshift(subArray);
    }

    const getCoord = (char) => {
        let row;
        let col;

        for (y = 0; y < playfairArray.length; y++) {
            for (x = 0; x < playfairArray[y].length; x++) {
                if (char === playfairArray[y][x]) {
                    row = y;
                    col = x;
                }
            }
        };
        return {row: row, col: col};
    };

    inputArray.forEach(digram => {
        let char1 = digram[0];
        let char2 = digram[1];
    
        let coord1 = getCoord(char1);
        let coord2 = getCoord(char2);
    
        if (coord1.row == coord2.row) {
            coord1.col = (coord1.col + 1)%6;
            coord2.col = (coord2.col + 1)%6;
        } else if (coord1.col == coord2.col) {
            coord1.row = (coord1.row + 1)%6;
            coord2.row = (coord2.row + 1)%6;            
        } else {
            let colDiff = Math.abs(coord1.col - coord2.col);
            if (coord1.col > coord2.col) {
                coord1.col = coord1.col - colDiff;
                coord2.col = coord2.col + colDiff;
            } else if (coord2.col > coord1.col) {
                coord2.col = coord2.col - colDiff;
                coord1.col = coord1.col + colDiff;
            } else return 'large error';
        };
    
        let newChar1 = playfairArray[coord1.row][coord1.col];
        let newChar2 = playfairArray[coord2.row][coord2.col];
        output += newChar1 + newChar2;
    });

    console.log(output);
    return output;
};

decrypt(encrypt("instrments1234", "Monarchy"), "Monarchy");

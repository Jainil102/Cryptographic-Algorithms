// Variables for encryption
var plaintext = document.getElementById("plain-text")
var key = document.getElementById("key")
var output = document.getElementById("output")

// Variables for decryption
var ciphertext = document.getElementById("cipher-text")
var dkey = document.getElementById("d-key")
var doutput = document.getElementById("d-output")

// Eventlisteners for encryption
plaintext.addEventListener('keyup', () => {
    let key = document.getElementById("key").value
    if (key.length == 0) {
        output.innerHTML = ""
        return
    }

    let cipheredText = encrypt(plaintext.value, key)
    output.innerHTML = cipheredText
})

key.addEventListener('keyup', () => {
    let plaintext = document.getElementById("plain-text").value
    if (plaintext.length == 0) {
        output.innerHTML = ""
        return
    }

    let cipheredText = encrypt(plaintext, key.value)
    output.innerHTML = cipheredText
})

// Eventlisteners for decryption
ciphertext.addEventListener('keyup', () => {
    let dkey = document.getElementById("d-key").value
    if (dkey.length == 0) {
        doutput.innerHTML = ""
        return
    }

    let plaintext = decrypt(ciphertext.value, dkey)
    doutput.innerHTML = plaintext
})

dkey.addEventListener('keyup', () => {
    let ciphertext = document.getElementById("cipher-text").value
    if (ciphertext.length == 0) {
        doutput.innerHTML = ""
        return
    }

    let plaintext = decrypt(ciphertext, dkey.value)
    doutput.innerHTML = plaintext
})

function modInverse(a, m) {
    for (let x = 1; x < m; x++)
        if (((a % m) * (x % m)) % m == 1)
            return x;
}

function encrypt(message, key) {
    var messagelength = message.length;
    let realmessage = "";
    var j;
    for (i = 0; i < messagelength; i++) {
        j = message[i].charCodeAt(0);
        if (j >= 65 && j <= 90) {
            realmessage += message[i];
        }
        else if (j >= 97 && j <= 122) {
            realmessage += message[i].toUpperCase();
        }
        else {
            continue;
        }
    }
    var realmessagelength = realmessage.length;
    var keylength = key.length;

    let keyMatrix = new Array(3);
    var k = 0;
    for (let i = 0; i < 3; i++) {
        keyMatrix[i] = new Array(3);
        for (let j = 0; j < 3; j++) {
            keyMatrix[i][j] = (key[k].charCodeAt(0) % 65);
            k++;
        }
    }
    var a, b, c;
    a = ((keyMatrix[1][1] * keyMatrix[2][2]) - (keyMatrix[1][2] * keyMatrix[2][1]));
    b = ((keyMatrix[1][0] * keyMatrix[2][2]) - (keyMatrix[1][2] * keyMatrix[2][0]));
    c = ((keyMatrix[1][0] * keyMatrix[2][1]) - (keyMatrix[1][1] * keyMatrix[2][0]));
    var mod = (keyMatrix[0][0] * a) - (keyMatrix[0][1] * b) + (keyMatrix[0][2] * c);
    if (mod === 0) {
        return "DECRYPTION IS NOT POSSIBLE BECAUSE VALUE OF MOD A IS ZERO";
    }

    x = 3 - (realmessagelength % 3);
    let messageVector = new Array(realmessagelength + x);
    for (let i = 0; i < realmessagelength + x; i++) {
        if (i < realmessagelength) {
            messageVector[i] = new Array(1);
            messageVector[i][0] = (realmessage[i].charCodeAt(0)) % 65;
        }
        else {
            messageVector[i] = new Array(1);
            messageVector[i][0] = 0;
        }
    }

    let cipherMatrix = new Array(realmessagelength + x);
    for (let i = 0; i < realmessagelength + x; i++) {
        cipherMatrix[i] = new Array(1);
        cipherMatrix[i][0] = 0;
    }

    var i, j, k, m, n, o, p;
    j = 0;
    p = (realmessagelength + x) / 3;
    for (i = 0; i < p; i++) {
        m = messageVector[j][0];
        n = messageVector[j + 1][0];
        o = messageVector[j + 2][0];

        k = j % 3;
        cipherMatrix[j][0] = (keyMatrix[k][0] * m) + (keyMatrix[k][1] * n) + (keyMatrix[k][2] * o);
        k = (j + 1) % 3;
        cipherMatrix[j + 1][0] = (keyMatrix[k][0] * m) + (keyMatrix[k][1] * n) + (keyMatrix[k][2] * o);
        k = (j + 2) % 3;
        cipherMatrix[j + 2][0] = (keyMatrix[k][0] * m) + (keyMatrix[k][1] * n) + (keyMatrix[k][2] * o);
        j = j + 3;
    }


    let ciphertext = "";
    j = 0;
    for (i = 0; i < messagelength; i++) {
        k = message[i].charCodeAt(0);
        if (k >= 65 && k <= 90) {
            l = (cipherMatrix[j][0] % 26) + 65;
            j++;
            ciphertext += String.fromCharCode(l);
        }
        else if (k >= 97 && k <= 122) {
            l = (cipherMatrix[j][0] % 26) + 97;
            j++;
            ciphertext += String.fromCharCode(l);
        }
        else {
            ciphertext += message[i];
        }
    }
    return ciphertext;
}

function decrypt(ciphertext, key) {
    var cipherlength = ciphertext.length;
    let realcipher = "";
    var j;
    for (i = 0; i < cipherlength; i++) {
        j = ciphertext[i].charCodeAt(0);
        if (j >= 65 && j <= 90) {
            realcipher += ciphertext[i];
        }
        else if (j >= 97 && j <= 122) {
            realcipher += ciphertext[i].toUpperCase();
        }
        else {
            continue;
        }
    }
    var realcipherlength = realcipher.length;
    var keylength = key.length;

    let keyMatrix = new Array(3);
    var k = 0;
    for (let i = 0; i < 3; i++) {
        keyMatrix[i] = new Array(3);
        for (let j = 0; j < 3; j++) {
            keyMatrix[i][j] = (key[k].charCodeAt(0) % 65);
            k++;
        }
    }
    var a, b, c, d, e, f, g, h, i;

    a = ((keyMatrix[1][1] * keyMatrix[2][2]) - (keyMatrix[1][2] * keyMatrix[2][1]));
    b = ((keyMatrix[1][0] * keyMatrix[2][2]) - (keyMatrix[1][2] * keyMatrix[2][0]));
    c = ((keyMatrix[1][0] * keyMatrix[2][1]) - (keyMatrix[1][1] * keyMatrix[2][0]));
    let mod = (keyMatrix[0][0] * a) - (keyMatrix[0][1] * b) + (keyMatrix[0][2] * c);

    if (mod === 0) {
        return "DECRYPTION IS NOT POSSIBLE BECAUSE VALUE OF MOD A IS ZERO";
    }

    a = ((keyMatrix[1][1] * keyMatrix[2][2]) - (keyMatrix[1][2] * keyMatrix[2][1]));
    b = ((keyMatrix[1][0] * keyMatrix[2][2]) - (keyMatrix[1][2] * keyMatrix[2][0]));
    c = ((keyMatrix[1][0] * keyMatrix[2][1]) - (keyMatrix[2][0] * keyMatrix[1][1]));
    d = ((keyMatrix[0][1] * keyMatrix[2][2]) - (keyMatrix[0][2] * keyMatrix[2][1]));
    e = ((keyMatrix[0][0] * keyMatrix[2][2]) - (keyMatrix[0][2] * keyMatrix[2][0]));
    f = ((keyMatrix[0][0] * keyMatrix[2][1]) - (keyMatrix[0][1] * keyMatrix[2][0]));
    g = ((keyMatrix[0][1] * keyMatrix[1][2]) - (keyMatrix[1][1] * keyMatrix[0][2]));
    h = ((keyMatrix[0][0] * keyMatrix[1][2]) - (keyMatrix[1][0] * keyMatrix[0][2]));
    i = ((keyMatrix[0][0] * keyMatrix[1][1]) - (keyMatrix[1][0] * keyMatrix[0][1]));

    b = b * (-1);
    d = d * (-1);
    f = f * (-1);
    h = h * (-1);
    inverseMatrix = [[a, d, g], [b, e, h], [c, f, i]];

    x = 3 - (realcipherlength % 3);
    let cipherVector = new Array(realcipherlength + x);
    for (let i = 0; i < realcipherlength + x; i++) {
        if (i < realcipherlength) {
            cipherVector[i] = new Array(1);
            cipherVector[i][0] = (realcipher[i].charCodeAt(0)) % 65;
        }
        else {
            cipherVector[i] = new Array(1);
            cipherVector[i][0] = 0;
        }
    }

    let textMatrix = new Array(realcipherlength + x);
    for (let i = 0; i < realcipherlength + x; i++) {
        textMatrix[i] = new Array(1);
        textMatrix[i][0] = 0;
    }


    var i, j, k, m, n, o, p;
    j = 0;
    p = (realcipherlength + x) / 3;
    for (i = 0; i < p; i++) {
        m = cipherVector[j][0];
        n = cipherVector[j + 1][0];
        o = cipherVector[j + 2][0];

        k = j % 3;
        textMatrix[j][0] = (inverseMatrix[k][0] * m) + (inverseMatrix[k][1] * n) + (inverseMatrix[k][2] * o);
        k = (j + 1) % 3;
        textMatrix[j + 1][0] = (inverseMatrix[k][0] * m) + (inverseMatrix[k][1] * n) + (inverseMatrix[k][2] * o);
        k = (j + 2) % 3;
        textMatrix[j + 2][0] = (inverseMatrix[k][0] * m) + (inverseMatrix[k][1] * n) + (inverseMatrix[k][2] * o);
        j = j + 3;
    }
    var x = modInverse(mod, 26);
    let plaintext = "";
    j = 0;
    for (i = 0; i < cipherlength; i++) {
        k = ciphertext[i].charCodeAt(0);
        if (k >= 65 && k <= 90) {
            l = (((textMatrix[j][0] % 26) * x) % 26) + 65;
            j++;
            plaintext += String.fromCharCode(l);
        }
        else if (k >= 97 && k <= 122) {
            l = (((textMatrix[j][0] % 26) * x) % 26) + 97;
            j++;
            plaintext += String.fromCharCode(l);
        }
        else {
            plaintext += ciphertext[i];
        }
    }
    return plaintext;
}
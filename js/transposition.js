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
    if(dkey.length == 0){
        doutput.innerHTML = ""
        return
    }

    let plaintext = decrypt(ciphertext.value, dkey)
    doutput.innerHTML = plaintext
})

dkey.addEventListener('keyup', () => {
    let ciphertext = document.getElementById("cipher-text").value
    if(ciphertext.length == 0){
        doutput.innerHTML = ""
        return
    }

    let plaintext = decrypt(ciphertext, dkey.value)
    doutput.innerHTML = plaintext
})

function generatelength(key) {
    let result = new Array(key.length);
    j = 0, k = 0;
    while (j < 26) {
        i = 0;
        while (i < key.length) {
            if ((key[i].charCodeAt(0) - 65) == j) {
                result[i] = k;
                k++;
            }
            i++;
        }
        j++;
    }
    return result;
}

function encrypt(plaintext, key) {
    key = key.toString().toUpperCase()
    var keylength = key.length;
    var textlength = plaintext.length;
    var r, c, s, till;
    if (textlength % keylength === 0) {
        c = keylength;
        r = textlength / keylength;
        till = -1;
    }
    else {
        c = keylength;
        s = textlength / keylength;
        r = Math.floor(s);
        till = (s - r) * keylength;
        r += 1;
    }

    if (till === -1) {
        till = keylength;
    }

    answer = generatelength(key);
    answerlength = answer.length;

    var ciphertext = "";

    for (i = 0; i < keylength; i++) {
        k = 0;
        for (j = 0; j < answerlength; j++) {
            if (answer[j] === i) {
                k = j;
                break;
            }
        }
        while (k < textlength) {
            ciphertext += plaintext[k];
            k += keylength;
        }
    }
    return ciphertext;
}

function decrypt(ciphertext, key) {
    if(key.length === 0) return ""

    key = key.toString().toUpperCase()
    var keylength = key.length;
    var cipherlength = ciphertext.length;
    var r, c, s, till;
    if (cipherlength % keylength === 0) {
        c = keylength;
        r = cipherlength / keylength;
        till = 0;
    }
    else {
        c = keylength;
        s = cipherlength / keylength;
        r = Math.floor(s);
        till = cipherlength % keylength;
        r += 1;
    }

    if (till === 0) {
        till = keylength;
    }

    answer = generatelength(key);
    answerlength = answer.length;

    let length = new Array(answerlength);
    for (i = 0; i < answerlength; i++) {
        length[i] = -1;
    }
    var k = 0;
    for (i = 0; i < answerlength; i++) {
        for (j = 0; j < answerlength; j++) {
            if (answer[j] === i) {
                if ((j + 1) <= till) {
                    length[j] = k;
                    k += r;
                    break;
                }
                else {
                    length[j] = k;
                    k += (r - 1);
                    break;
                }
            }
        }
    }

    var j = 0, k;
    var plaintext = "";
    for (i = 0; i < r; i++) {
        for (l = 0; l < c; l++) {
            k = length[l];
            plaintext += ciphertext[k];
            length[l]++;
            j++;
            if (j === cipherlength) {
                return plaintext;
            }
        }
    }

    return plaintext;
}
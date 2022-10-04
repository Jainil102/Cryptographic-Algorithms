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

function generateKey(str, key) {
    key = key.split("");
    if (str.length == key.length)
        return key.join("");
    else {
        let temp = key.length;
        for (let i = 0; i < (str.length - temp); i++) {
            key.push(key[i % ((key).length)])
        }
    }
    return key.join("");
}

function LowerToUpper(s) {
    let str = (s).split("");
    for (let i = 0; i < s.length; i++) {
        if (s[i] == s[i].toLowerCase()) {
            str[i] = s[i].toUpperCase();
        }
    }
    s = str.join("");
    return s;
}

function encrypt(str, key) {
    key = generateKey(str, key)
    key = LowerToUpper(key)

    let cipher_text = "";

    for (let i = 0; i < str.length; i++) {
        let y = str[i].charCodeAt(0);
        let x;
        if (y >= 65 && y <= 90) {
            let x = (str[i].charCodeAt(0) - 65 + key[i].charCodeAt(0) - 65) % 26;
            x += 'A'.charCodeAt(0);
            cipher_text += String.fromCharCode(x);
        }
        else if (y >= 97 && y <= 122) {
            let x = (str[i].charCodeAt(0) - 97 + key[i].charCodeAt(0) - 65) % 26;
            x += 'a'.charCodeAt(0);
            cipher_text += String.fromCharCode(x);
        }
        else {
            cipher_text += str[i];
        }
    }
    return cipher_text;
}

function decrypt(cipher_text, key) {
    key = generateKey(cipher_text, key)
    key = LowerToUpper(key)
    
    let orig_text = "";
    for (let i = 0; i < cipher_text.length; i++) {
        let y = cipher_text[i].charCodeAt(0);
        let x;
        if (y >= 65 && y <= 90) {
            x = (cipher_text[i].charCodeAt(0) - 65 - key[i].charCodeAt(0) + 65 + 26) % 26;
            x += 'A'.charCodeAt(0);
            orig_text += String.fromCharCode(x);
        }
        else if (y >= 97 && y <= 122) {
            x = (cipher_text[i].charCodeAt(0) - 97 - key[i].charCodeAt(0) + 65 + 26) % 26;
            x += 'a'.charCodeAt(0);
            orig_text += String.fromCharCode(x);
        }
        else {
            orig_text += cipher_text[i];
        }
    }
    return orig_text;
}
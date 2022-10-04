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

function modInverse(a, m){
    for(let x = 1; x < m; x++)
        if (((a % m) * (x % m)) % m == 1)
            return x;
}

function encrypt(plaintext, key){
    var plainlength = plaintext.length;
    var a,b,c,d;
    let ciphertext="";
    b = key;
    for(i=0;i<plainlength;i++){
        a = plaintext[i].charCodeAt(0);
        if(a >= 65 && a <= 90){
            a -= 65;
            c = (a*b)%26;
            c += 'A'.charCodeAt(0);
            ciphertext+=String.fromCharCode(c);
        }else if(a >= 97 && a<= 122){
            a -= 97;
            c = (a*b)%26;
            c += 'a'.charCodeAt(0);
            ciphertext+=String.fromCharCode(c);
        }
        else{
            ciphertext += plaintext[i];
        }
    }
    return ciphertext
}

function decrypt(ciphertext, key) {
    var cipherlength = ciphertext.length;
    var a,b,c,d;
    let plaintext="";
    b = modInverse(key,26);
    for(i=0;i<cipherlength;i++){
        a = ciphertext[i].charCodeAt(0);
        if(a >= 65 && a <= 90){
            a -= 65;
            c = (a*b)%26;
            c += 'A'.charCodeAt(0);
            plaintext+=String.fromCharCode(c);
        }else if(a >= 97 && a<= 122){
            a -= 97;
            c = (a*b)%26;
            c += 'a'.charCodeAt(0);
            plaintext+=String.fromCharCode(c);
        }
        else{
            ciphertext += plaintext[i];
        }
    }
    return plaintext;
}
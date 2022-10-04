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
    if(key.length == 0){
        output.innerHTML = ""
        return
    }

    let cipheredText = encrypt(plaintext.value, key)
    output.innerHTML = cipheredText
})

key.addEventListener('keyup', () => {
    let plaintext = document.getElementById("plain-text").value
    if(plaintext.length == 0){
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

// Ceasar encrypt
function encrypt(str, key){
    var cipheredText = ""
    key = parseInt(key)
    for(var i=0; i<str.length; i++){
        let uni = str.charCodeAt(i) 
        if (uni >= 65 && uni <= 90){
            cipheredText += String.fromCharCode((uni + key - 65) % 26 + 65)
        }
        else if (uni >= 97 && uni <= 122) {
            cipheredText += String.fromCharCode((uni + key - 97) % 26 + 97)
        }
        else{
            cipheredText += str[i]
        }
    }
    return cipheredText
}

// Ceasar decrypt
function decrypt(str, key){
    var plainText = ""
    key = parseInt(key) % 26
    for(var i=0; i<str.length; i++){
        let uni = str.charCodeAt(i)
        if (uni >= 65 && uni <= 90){
            plainText += String.fromCharCode((uni - key + 26 - 65) % 26 + 65)
        }
        else if (uni >= 97 && uni <= 122){
            plainText += String.fromCharCode((uni - key + 26 - 97) % 26 + 97)
        }
        else{
            plainText += str[i]
        }
    }
    return plainText
}
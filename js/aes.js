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

    let cipheredText = CryptoJS.AES.encrypt(plaintext.value, key).toString()
    output.innerHTML = cipheredText
})

key.addEventListener('keyup', () => {
    let plaintext = document.getElementById("plain-text").value
    if(plaintext.length == 0){
        output.innerHTML = ""
        return
    }

    let cipheredText = CryptoJS.AES.encrypt(plaintext, key.value).toString()
    output.innerHTML = cipheredText
})

// Eventlisteners for decryption
ciphertext.addEventListener('keyup', () => {
    let dkey = document.getElementById("d-key").value
    if(dkey.length == 0){
        doutput.innerHTML = ""
        return
    }

    let plaintext = CryptoJS.AES.decrypt(ciphertext.value, dkey).toString(CryptoJS.enc.Utf8)
    doutput.innerHTML = plaintext
})

dkey.addEventListener('keyup', () => {
    let ciphertext = document.getElementById("cipher-text").value
    if(ciphertext.length == 0){
        doutput.innerHTML = ""
        return
    }

    let plaintext = CryptoJS.AES.decrypt(ciphertext, dkey.value).toString(CryptoJS.enc.Utf8)
    doutput.innerHTML = plaintext
})
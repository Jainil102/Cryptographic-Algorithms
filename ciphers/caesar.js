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
    console.log(cipheredText)
    return cipheredText
}

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
    console.log(plainText)
    return plainText
}

decrypt(encrypt("Attack Tomorrow 1/1/2022", 3), 3)

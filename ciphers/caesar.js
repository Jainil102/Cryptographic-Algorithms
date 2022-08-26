function encrypt(str, key){
    var cipheredText = ""
    for(var i=0; i<str.length; i++){
        cipheredText += String.fromCharCode(str.charCodeAt(i) + key)
    }
    console.log(cipheredText);
    return cipheredText
}

function decrypt(str, key){
    var plainText = ""
    for(var i=0; i<str.length; i++){
        plainText += String.fromCharCode(str.charCodeAt(i) - key)
    }
    console.log(plainText);
    return plainText
}

decrypt(encrypt("Attack Tomorrow", 3), 3)

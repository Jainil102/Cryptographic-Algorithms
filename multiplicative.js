function modInverse(a, m){
    for(let x = 1; x < m; x++)
        if (((a % m) * (x % m)) % m == 1)
            return x;
}

function Encrypt(plaintext, key){
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

function Decrypt(ciphertext, key) {
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

let plaintext = "ABCDEFGHIabcdefghi";
let key=15;
let cipher_text = Encrypt(plaintext,key);
console.log(cipher_text);

let decipher_text = Decrypt(cipher_text,key);
console.log(decipher_text);
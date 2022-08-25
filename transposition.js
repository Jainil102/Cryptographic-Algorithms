function generatelength(key){
    let result = new Array(key.length);
    j=0,k=0;
    while(j < 26){
        i=0;
        while(i < key.length){
            if((key[i].charCodeAt(0)-65) == j){
                result[i] = k;
                k++;
            }
            i++;
        }
        j++;
    }
    return result;
}

function Encrypt(plaintext, key){
    var keylength = key.length;
    var textlength = plaintext.length;
    var r,c,s,till;
    if(textlength%keylength === 0){
        c = keylength;
        r = textlength/keylength;
        till = -1;
    }
    else{
        c = keylength;
        s = textlength/keylength;
        r = Math.floor(s);
        till = (s-r)*keylength;
        r += 1;
    }

    if(till === -1){
        till = keylength;
    }

    answer = generatelength(key);
    answerlength = answer.length;

    var ciphertext = "";
    
    for(i=0;i<keylength;i++){
        k=0;
        for(j=0;j<answerlength;j++){
            if(answer[j] === i){
                k = j;
                break;
            }
        }
        while(k < textlength){
            ciphertext += plaintext[k];
            k += keylength;
        }
    }
    return ciphertext;
}

function Decrypt(ciphertext, keyword) {
    var keylength = key.length;
    var cipherlength = ciphertext.length;
    var r,c,s,till;
    if(cipherlength%keylength === 0){
        c = keylength;
        r = cipherlength/keylength;
        till = 0;
    }
    else{
        c = keylength;
        s = cipherlength/keylength;
        r = Math.floor(s);
        console.log(s + " " + r)
        till = cipherlength%keylength;
        r += 1;
    }

    if(till === 0){
        till = keylength;
    }
    console.log(r + " " + c + " " + till);

    answer = generatelength(key);
    answerlength = answer.length;
    console.log(answer);

    let length = new Array(answerlength);
    for(i=0;i<answerlength;i++){
        length[i] = -1;
    }
    var k=0;
    for(i=0;i<answerlength;i++){
    for(j=0;j<answerlength;j++){
        if(answer[j] === i){
            if((j+1) <= till){
                length[j] = k;
                k += r;
                break;
            }
            else{
                length[j] = k;
                k += (r-1);
                break;
            }
        }
    }
    // console.log(k);
    // console.log(length);
    }
    console.log(length);
    var j=0,k;
    var plaintext = "";
    for(i=0;i<r;i++){
        for(l=0;l<c;l++){
            k = length[l];
            plaintext+=ciphertext[k];
            length[l]++;
            j++;
            if(j === cipherlength){
                return plaintext;
            }
        }
        console.log(plaintext);
    }
    return plaintext;
}

let plaintext = "ABCDEFGHIJK";
let key = "HACKA";
let cipher_text = Encrypt(plaintext,key);
console.log(cipher_text);

let decipher_text = Decrypt(cipher_text,key);
console.log(decipher_text);
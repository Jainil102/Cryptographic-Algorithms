function generateKey(str,key)
{
	key=key.split("");
	if(str.length == key.length)
		return key.join("");
	else
	{
		let temp=key.length;
		for (let i = 0;i<(str.length-temp) ; i++)
		{
			key.push(key[i % ((key).length)])
		}
	}
	return key.join("");
}

function cipherText(str,key)
{
	let cipher_text="";

	for (let i = 0; i < str.length; i++)
	{
        let y = str[i].charCodeAt(0);
        let x;
        if(y >= 65 && y <= 90){
            let x = (str[i].charCodeAt(0) -65 + key[i].charCodeAt(0) - 65) %26;
            x += 'A'.charCodeAt(0);
            cipher_text+=String.fromCharCode(x);
        }
        else if(y >= 97 && y <= 122){
            let x = (str[i].charCodeAt(0) -97 + key[i].charCodeAt(0) - 65) %26;
            x += 'a'.charCodeAt(0);
            cipher_text+=String.fromCharCode(x);
        }
        else{
            cipher_text+=str[i];
        }
	}
	return cipher_text;
}

function originalText(cipher_text,key)
{
	let orig_text="";
	for (let i = 0 ; i < cipher_text.length ; i++)
	{
        let y = cipher_text[i].charCodeAt(0);
        let x;
        if(y >= 65 && y <= 90){
            x = (cipher_text[i].charCodeAt(0) - 65 - key[i].charCodeAt(0) + 65 + 26) %26;
            x += 'A'.charCodeAt(0);
            orig_text+=String.fromCharCode(x);
        }
        else if(y >= 97 && y <= 122){
            x = (cipher_text[i].charCodeAt(0) - 97 - key[i].charCodeAt(0) + 65 + 26) %26;
            x += 'a'.charCodeAt(0);
            orig_text+=String.fromCharCode(x);
        }
		else{
            orig_text+=cipher_text[i];
        }
	}
	return orig_text;
}

function LowerToUpper(s)
{
	let str =(s).split("");
	for(let i = 0; i < s.length; i++)
	{
		if(s[i] == s[i].toLowerCase())
		{
			str[i] = s[i].toUpperCase();
		}
	}
	s = str.join("");
	return s;
}

let str = "GEEKSFORgeeksfor";
let keyword = "DIVYANSHdivyansh";


let key = generateKey(str, keyword);
let finalkey = LowerToUpper(key);
let cipher_text = cipherText(str, finalkey);
let decipher_text = originalText(cipher_text,finalkey);
console.log(cipher_text);
console.log(decipher_text);

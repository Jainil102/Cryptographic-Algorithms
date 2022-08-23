function gcd(a, b) {
    var r;
    while (b > 0) {
        r = a % b;
        a = b;
        b = r;
    }
    return a;
}

function rel_prime(phi) {
    var rel = 5;
    while (gcd(phi, rel) != 1)
        rel++;
    return rel;
}

function power(a, b) {
    var temp = 1, i;
    for (i = 1; i <= b; i++)
        temp *= a;
    return temp;
}

function calculate_d(phi, e) {
    var x, y, x1, x2, y1, y2, temp, r, orig_phi;
    orig_phi = phi;
    x2 = 1; x1 = 0; y2 = 0; y1 = 1;
    while (e > 0) {
        temp = parseInt(phi / e);
        r = phi - temp * e;
        x = x2 - temp * x1;
        y = y2 - temp * y1;
        phi = e; e = r;
        x2 = x1; x1 = x;
        y2 = y1; y1 = y;
        if (phi == 1) {
            y2 += orig_phi;
            break;
        }
    }
    return y2;
}

function encrypt(N, e, msg) {
    var encryptedMsg = [];
    for(j=0; j<msg.length; j++){
        var M = msg.charCodeAt(j);
        var r, i = 0, prod = 1, rem_mod = 0, e1 = e;
        while (e1 > 0) {
            r = e1 % 2;
            if (i++ == 0)
                rem_mod = M % N;
            else
                rem_mod = power(rem_mod, 2) % N;
            if (r == 1) {
                prod *= rem_mod;
                prod = prod % N;
            }
            e1 = parseInt(e1 / 2);
        }
        encryptedMsg.push(prod)
    }
    console.log(encryptedMsg);
    return encryptedMsg
}

function decrypt(msg, d, N) {
    var decryptedMsg = ""
    for(j=0; j<msg.length; j++){
        var c = msg[j]
        var r, i = 0, prod = 1, rem_mod = 0, d1 = d;
        while (d1 > 0) {
            r = d1 % 2;
            if (i++ == 0)
                rem_mod = c % N;
            else
                rem_mod = power(rem_mod, 2) % N;
            if (r == 1) {
                prod *= rem_mod;
                prod = prod % N;
            }
            d1 = parseInt(d1 / 2);
        }
        decryptedMsg += String.fromCharCode(prod)
    }
    console.log(decryptedMsg)
    return decryptedMsg
}

var p = 53
var q = 61
var N = p * q;
var phi = (p - 1) * (q - 1);
var e = rel_prime(phi);
var d = calculate_d(phi, e);

var msg = "Attack Tomorrow 24/08"
var encryptedMsg = encrypt(N, e, msg);
var decryptedMsg = decrypt(encryptedMsg, d, N)
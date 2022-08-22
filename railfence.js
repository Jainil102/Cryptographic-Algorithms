function encrypt(str, key) {
    if (key === 1) return s;

    var ans = "";
    var n = str.length;
    var cycleLen = 2 * key - 2;

    for (var i = 0; i < key; i++) {
        for (var j = 0; j + i < n; j += cycleLen) {
            ans += str[j + i];
            if (i != 0 && i != key - 1 && j + cycleLen - i < n)
                ans += str[j + cycleLen - i];
        }
    }

    console.log(ans);
    return ans;
}

function decrypt(str, key) {
    var ans = "";
    var a = [];
    for (var i = 0; i < key; i++) {
        var temp = []
        for (var j = 0; j < str.length; j++) {
            temp.push(' ');
        }
        a.push(temp);
    }

    var j = 0, flag = 0, i;
    for (i = 0; i < str.length; i++) {
        a[j][i] = '0';
        if (j == key - 1) {
            flag = 1;
        }
        else if (j == 0)
            flag = 0;
        if (flag == 0) {
            j++;
        }
        else j--;
    }

    var temp = 0;
    for (i = 0; i < key; i++) {
        for (j = 0; j < str.length; j++) {
            if (a[i][j] == '0')
                a[i][j] = str[temp++];
        }
    }

    flag = 0, j = 0;
    for (i = 0; i < str.length; i++) {
        ans += a[j][i];
        if (j == key - 1) {
            flag = 1;
        }
        else if (j == 0)
            flag = 0;
        if (flag == 0) {
            j++;
        }
        else j--;
    }

    console.log(ans);
    return ans;
}

decrypt(encrypt("Attack Tomorrow", 3), 3);
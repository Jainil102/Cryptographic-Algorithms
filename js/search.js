var suggestions = [
    {
        'text': 'Symmetric Key Encryption',
        'display': 'Symmetric Key Encryption',
        'href': 'symmetric.html'
    },
    {
        'text': 'Private Key Encryption',
        'display': 'Private Key Encryption',
        'href': 'symmetric.html'
    },
    {
        'text': 'Hash Functions',
        'display': 'Hash Functions',
        'href': 'hash.html'
    },
    {
        'text': 'Asymmetric Key Encryption',
        'display': 'Asymmetric Key Encryption',
        'href': 'asymmetric.html'
    },
    {
        'text': 'Public Key Encryption',
        'display': 'Public Key Encryption',
        'href': 'asymmetric.html'
    },
    {
        'text': 'Caesar',
        'display': 'Caesar Cipher',
        'href': 'caesar.html'
    },
    {
        'text': 'Rot13',
        'display': 'Caesar Cipher',
        'href': 'caesar.html'
    },
    {
        'text': 'Railfence',
        'display': 'Rail Fence Cipher',
        'href': 'railfence.html'
    },
    {
        'text': 'Rail Fence',
        'display': 'Rail Fence Cipher',
        'href': 'railfence.html'
    },
    {
        'text': 'Playfair',
        'display': 'Playfair Cipher',
        'href': 'playfair.html'
    },
    {
        'text': 'Transposition',
        'display': 'Transposition Cipher',
        'href': 'transposition.html'
    },
    {
        'text': 'Vigenere',
        'display': 'Vigenere Cipher',
        'href': 'vigenere.html'
    },
    {
        'text': 'Multiplicative',
        'display': 'Multiplicative Cipher',
        'href': 'multiplicative.html'
    },
    {
        'text': 'Hill',
        'display': 'Hill Cipher',
        'href': 'hill.html'
    },
    {
        'text': 'AES',
        'display': 'AES',
        'href': 'aes.html'
    },
]; 

var dropdownMenu = document.getElementById('suggestions');
dropdownMenu.style.display = 'none';
var searchInput = document.getElementById('search-input');

searchInput.addEventListener('keyup', () => {
    dropdownMenu.innerHTML = ``;
    dropdownMenu.style.display = 'none';
    let userData = searchInput.value.toLowerCase().split(' ').join('');
    let relatedSuggestions = [];
    if(userData!=''){
        relatedSuggestions = suggestions.filter((obj) =>{
            return obj.text.toLowerCase().split(' ').join('').startsWith(userData);
        });
    }

    const uniqueKeyToRelatedSuggestions = new Map(
        relatedSuggestions.map((relatedSuggestions) => [relatedSuggestions.display, relatedSuggestions])
    );

    relatedSuggestions = [...uniqueKeyToRelatedSuggestions.values()];
    console.log(relatedSuggestions);

    if(relatedSuggestions.length === 0 && userData!=''){
        dropdownMenu.innerHTML = `<li class='dropdown-item'>No search results</li>`;
        dropdownMenu.style.display = 'block';
        dropdownMenu.style.fontSize = "14px";
    }
    else if(userData!=''){
        relatedSuggestions.forEach((value) => {
            let newDropItem = document.createElement('li');
            let newLink = document.createElement('a');
            newLink.className = 'dropdown-item'; newLink.href = value.href; newLink.innerText = value.display;
            newDropItem.appendChild(newLink);
            dropdownMenu.appendChild(newDropItem);
            newLink.style = "font-size: 14px";
        });
        dropdownMenu.style.display = 'block';
    }
})


window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        document.getElementsByClassName('navbar')[0].classList.add('animate__slideOutUp');
        setTimeout(() => {
            document.getElementsByClassName('navbar')[0].style.display = 'none';

            document.getElementsByClassName('navbar')[0].classList.remove('animate__slideOutUp');
        }, 100);
    }
    else {
        if (document.getElementsByClassName('navbar')[0].style.display === 'none') {
            document.getElementsByClassName('navbar')[0].classList.add('animate__slideInDown');
            setTimeout(() => {
                document.getElementsByClassName('navbar')[0].style.display = 'block';
            }, 50);
            setTimeout(() => {
                document.getElementsByClassName('navbar')[0].classList.remove('animate__slideInDown');
            }, 500);
        }

    }
});

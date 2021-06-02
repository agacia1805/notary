// Load a book from disk
function loadBook(filename, displayName) {
    let currentBook = '';
    let url = 'books/' + filename;

    // reset out UI
    document.getElementById('fileName').innerHTML = displayName;
    document.getElementById('searchstat').innerHTML = '';
    document.getElementById('keyword').value = '';

    // create a server request to load our book
    let xhr = new XMLHttpRequest(); // !!!!!! to check
    xhr.open('GET', url, );
};

loadBook();


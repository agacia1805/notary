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
    xhr.open('GET', url, true); // asynchronous to check !!!!!!!!
    xhr.send();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {   //CHECK
            currentBook = xhr.responseText;

            getDocStats(currentBook);

            // remove line breaks and carriage (regular expressions)
            currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>');

            document.getElementById('fileContent').innerHTML = currentBook;

            let elmnt = document.getElementById('fileContent');
            elmnt.scrollTop = 0;
        }
    }; // !!!!!!! to check
}

// get the stats for the book
function getDocStats(fileContent) {
    let docLength = document.getElementById('docLength');
    let wordCount = document.getElementById('wordCount');
    let charCount = document.getElementById('charCount');

    let text = fileContent.toLowerCase();
    let wordArray = text.match(/\b\S+\b/g);
    let wordDictionary = {};

    let uncommonWords = [];

    // filter out the uncommon words
    uncommonWords = filterStopWords(wordArray);

    // count every word in the wordArray
    for (let word in uncommonWords) {
        let wordValue = uncommonWords[word];
        if (wordDictionary[wordValue] > 0) {
            wordDictionary[wordValue] += 1;
        }
        else {
            wordDictionary[wordValue] = 1;
        }
    }

    // sort the array
    let wordList = sortProperties(wordDictionary);

    // return the top five words
    let top5Words = wordList.slice(0, 6);
    let least5Words = wordList.slice(-6, wordList.length);

    // write the values to the page
    ULTemplate(top5Words, document.getElementById('mostUsed'));
    ULTemplate(least5Words, document.getElementById('leastUSed'));
}

function ULTemplate(items, element) {
    let rowTemplate = document.getElementById('template-ul-items');
    let templateHTML = rowTemplate.innerHTML;
    let resultsHTML = '';

    for (let i = 0; i < items.length - 1; i++) {
        resultsHTML += templateHTML.replace('{{val}}', items[i][0] + ': ' + items[i][1] + ' time(s)');
    }

    element.innerHTML = resultsHTML;
}


function sortProperties(obj) {
    // convert the object to an array
    let rtnArray = Object.entries(obj);
    // sort the array based
    rtnArray.sort(function (first, second) {
        return second[1] - first[1];
    });
    return rtnArray;
}

function filterStopWords(wordArray) {
    let commonWords = getStopWords();
    let commonObj = {};
    let uncommonArr = [];

    for (let i = 0; i < commonWords.length; i++) {
        commonObj[commonWords[i].trim()] = true;
    }

    for (let i = 0; i < wordArray.length; i++) {
        word = wordArray[i].trim().toLowerCase();
        if (!commonObj[word]) {
            uncommonArr.push(word);
        }
    }
    return uncommonArr;
}

function getStopWords() {
    return ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];
}




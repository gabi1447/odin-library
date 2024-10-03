const myLibrary = [];
const bookShelf = document.querySelector('.displayBooks');

function Book(title, read, author, pages) {
    this.title = title;
    this.read = read;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(bookObject) {
    myLibrary.push(bookObject);
}

function displayBook(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add("book");

    const authorPagesDiv = document.createElement('div');
    authorPagesDiv.classList.add("author-pages-div");
    bookElement.appendChild(authorPagesDiv);

    for (key in book) {
        if (key === 'title') {
            const bookTitle = document.createElement('h3');
            bookTitle.textContent = `${book[key]}`;
            bookElement.insertBefore(bookTitle, authorPagesDiv);
        } else if (key === 'read') {
            const hasRead = document.createElement('p');
            if (book[key]) {
                hasRead.textContent = '✅';
            } else {
                hasRead.textContent = '❌';
            }
            bookElement.insertBefore(hasRead, authorPagesDiv);
        } else if (key === 'author') {
            const authorP = document.createElement('p'); 
            authorP.classList.add('author-p');
            authorP.textContent = `${book[key]}`;

            authorPagesDiv.appendChild(authorP);
        } else if (key === 'pages') {
            const pagesP = document.createElement('p');
            pagesP.textContent = `${book[key]}`;
            authorPagesDiv.appendChild(pagesP);
        }
    }
    bookShelf.appendChild(bookElement)
}

const newBook = new Book('Te dejé ir', true, 'Clare Mackintosh', '451');
const newBook2 = new Book('Entre tonos de gris', false, 'Ruta Sepetis', '555');
addBookToLibrary(newBook);
addBookToLibrary(newBook2);

const displayBooksEvent = new Event("displayBooks");

document.addEventListener("displayBooks", () => {
    bookShelf.textContent = "";
    myLibrary.forEach(book => {
        displayBook(book);
    });
})

document.dispatchEvent(displayBooksEvent);

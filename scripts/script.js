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

function displayBook(book, index) {
    const bookElement = document.createElement('div');
    bookElement.classList.add("book");
    bookElement.setAttribute("data-index", index);

    const authorPagesDiv = document.createElement('div');
    authorPagesDiv.classList.add("author-pages-div");
    bookElement.appendChild(authorPagesDiv);

    for (key in book) {
        if (key === 'title') {
            const bookTitle = document.createElement('h2');
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
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add("buttons");

    const removeButton = document.createElement('button');
    removeButton.setAttribute("id", "remove-book");
    removeButton.textContent = 'Remove';

    buttonsDiv.appendChild(removeButton);
    bookElement.insertBefore(buttonsDiv, authorPagesDiv);

    bookShelf.appendChild(bookElement);
}

const newBook = new Book('Te dejé ir', true, 'Clare Mackintosh', '451');
const newBook2 = new Book('Entre tonos de gris', false, 'Ruta Sepetis', '555');
addBookToLibrary(newBook);
addBookToLibrary(newBook2);

const displayBooksEvent = new Event("displayBooks");

document.addEventListener("displayBooks", () => {
    bookShelf.textContent = "";
    myLibrary.forEach((book, index) => {
        displayBook(book, index);
    });
})

document.dispatchEvent(displayBooksEvent);

/* Modal */
const modal = document.querySelector('.modal');
const openModal = document.querySelector('.open-modal');
const closeModal = document.querySelector('.close-modal');
const modalForm = document.querySelector('.modal-form');

openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})

modalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());
    const bookObject = new Book(formData.title, !!formData.hasRead, formData.author, formData.pages);
    addBookToLibrary(bookObject);
    document.dispatchEvent(displayBooksEvent);

    modalForm.reset();
    modal.close();
})

/* Remove book */
bookShelf.addEventListener("click", (e) => {
    if (e.target.id === 'remove-book') {
        const book = e.target.parentNode.parentNode;
        const indexBook = book.dataset.index;
        
        myLibrary.splice(indexBook, 1);
        book.remove();
        
        document.dispatchEvent(displayBooksEvent);
    }
})
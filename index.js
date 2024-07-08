let myLibrary = [];

const addButton = document.getElementById("addButton");
const dialog = document.getElementById("confirmDialog");
const dialogCloseButton = document.getElementById("dialogCloseButton");
const addBookForm = document.getElementById("addBookForm");

// inputs
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const numberOfPagesInput = document.getElementById("numberOfPages");
const statusInput = document.getElementById("status");

function Book(id, title, author, numberOfPages, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.status = status;
}

function addBook(newBook) {
    const bookList = document.getElementById("bookList");
    const unreadButton = `<button id="statusButton" class="custom-button">Unread</button>`;
    const completeButton = `<button id="statusButton" class="custom-button">Complete</button>`;
    const book = document.createElement("div");

    book.classList.add("card");

    if (newBook.status === 'complete') {
        book.classList.add("complete");
    } else if (newBook.status === 'in progress') {
        book.classList.add("in-progress");
    }

    book.setAttribute("data-id", newBook.id);
    book.innerHTML = `
        <h1>${newBook.title}</h1>
        <p>
            Author: ${newBook.author} </br>
            ${newBook.numberOfPages} pages </br>
        </p>
        <div>
            ${(newBook.status === 'complete' ? unreadButton : newBook.status === 'in progress' ? completeButton : '')}
            <button id="removeButton" class="custom-button">Remove</button>
        </div>
    `;

    bookList.appendChild(book);

    book.querySelector("#statusButton").addEventListener("click", function () {
        const findingId = parseInt(book.getAttribute("data-id"));
        console.log(findingId);
        console.log(myLibrary);
        const index = myLibrary.findIndex(book => book.id === findingId);

        if (index >= 0) {
            const selectedBook = myLibrary[index];

            if (selectedBook.status === "complete") {
                selectedBook.status = "in progress";
                book.classList.remove("complete");
                book.classList.add("in-progress");
                this.textContent = "Complete";
            } else if (selectedBook.status === "in progress") {
                selectedBook.status = "complete";
                book.classList.remove("in-progress");
                book.classList.add("complete");
                this.textContent = "Unread";
            }
            
            myLibrary[index] = selectedBook;
        }
    });

    book.querySelector("#removeButton").addEventListener("click", function (event) {
        const removingId = parseInt(book.getAttribute("data-id"));
        const filteredLibrary = myLibrary.filter(book => book.id !== removingId);
        myLibrary = filteredLibrary;
        book.remove();
    });
}


addButton.addEventListener('click', function(event) {
    dialog.showModal();
});

dialogCloseButton.addEventListener('click', function (event) {
    dialog.close();
});

addBookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const id = parseInt(Math.random() * 100000);
    const title = titleInput.value;
    const author = authorInput.value;
    const numberOfPages = numberOfPagesInput.value;
    const status = statusInput.value;

    const newBook = new Book(id, title, author, numberOfPages, status); 

    myLibrary.push(newBook);
    addBookForm.reset();
    addBook(newBook);
    dialog.close();
});
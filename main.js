let library = [];

export function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

export function addBookToLibrary(book) {
  library.push(book);

  loadBookCards();
}

export function loadBookCards() {
  clearBookContainer();

  for (let i = 0; i < library.length; i++) {
    let book = library[i];
    createBookCard(book);
  }
}

export function createBookCard(book) {
  const cardImg = document.createElement("img");
  cardImg.src = "./img/FikTzVnWQAEiOBq.jpg";

  const bookTitle = document.createElement("h1");
  bookTitle.textContent = `Title: ${book.title}`;

  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = `Author: ${book.author}`;

  const bookPages = document.createElement("p");
  bookPages.textContent = `Pages: ${book.pages}`;

  const readBook = document.createElement("input");
  readBook.setAttribute("type", "checkbox");
  readBook.id = "readBook";
  readBook.checked = book.read;
  readBook.addEventListener("change", () => {
    book.read = readBook.checked;
  });

  const lbl = document.createElement("label");
  lbl.textContent = `Has been read`;
  lbl.setAttribute("for", "readBook");

  const readDiv = document.createElement("div");
  readDiv.classList = "isread";

  readDiv.append(lbl, readBook);

  const bookInfo = document.createElement("div");
  bookInfo.append(bookTitle, bookAuthor, bookPages, readDiv);
  bookInfo.classList = "bookInfo";

  const deleteBook = document.createElement("button");
  deleteBook.textContent = "Delete";
  deleteBook.classList = "deleteBook";

  deleteBook.addEventListener("click", (e) => {
    deleteBookFromLibrary(book);
    console.log(book);
  });

  const bookCard = document.createElement("div");
  bookCard.classList = "book-card";
  bookCard.append(cardImg, bookInfo, deleteBook);

  const main = document.getElementById("books-container");
  main.append(bookCard);
}

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookTitle = form.elements["bookTitle"].value;
  const bookAuthor = form.elements["bookAuthor"].value;
  const bookPages = form.elements["bookPages"].value;
  const bookRead = form.elements["readBook"];

  if (bookTitle === "" || bookAuthor === "" || bookPages === "") {
    return;
  } else {
    const book = new Book(bookTitle, bookAuthor, bookPages, bookRead.checked);
    addBookToLibrary(book);
    changeFormVisibility();
  }
});

document.getElementById("form-Button").addEventListener("click", () => {
  changeFormVisibility();
});

document.getElementById("addBookBtn").addEventListener("click", () => {
  changeFormVisibility();
});

const book = new Book("Test Book", "Test Book", 25, true);
addBookToLibrary(book);

loadBookCards();

function changeFormVisibility() {
  const formContainer = document.getElementById("form-container");

  document.getElementById("form").reset();
  const overlay = document.getElementById("overlay");

  if (formContainer.classList.contains("show")) {
    formContainer.classList.remove("show");
    formContainer.classList.add("hide");
    overlay.classList.remove("show");
    overlay.classList.add("hide");
  } else {
    formContainer.classList.remove("hide");
    formContainer.classList.add("show");
    overlay.classList.remove("hide");
    overlay.classList.add("show");
  }
}

function deleteBookFromLibrary(book) {
  for (let i = 0; i < library.length; i++) {
    const storedBook = library[i];

    if (storedBook === book) {
      library.splice(book, 1);
      loadBookCards();
    }
  }
}

export function clearBookContainer() {
  const main = document.getElementById("books-container");

  main.innerHTML = "";
}

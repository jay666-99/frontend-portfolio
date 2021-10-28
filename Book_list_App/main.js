class Book {
  constructor(title, author, isbn) {
    this.author = author;
    this.isbn = isbn;
    this.title = title;
  }
}

// UI Class : Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(UI.addBookToList);
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
    list.appendChild(row);
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
    UI.showAlert("Removed", "danger");
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static checkIfBookExists(book) {
    const books = Store.getBooks();
    return !books.some((storedBook) => storedBook.isbn === book.isbn);
  }
}

// Store Class : Handles Storages
class Store {
  static getBooks() {
    if (localStorage.getItem("books") === null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem("books"));
    }
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks().filter((book) => book.isbn != isbn);
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event : Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);
// Event : Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // prevent actual submit
  e.preventDefault();
  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  //Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "warning");
  } else {
    // Instantiate book
    const book = new Book(title, author, isbn);
    const uniqueIsbn = UI.checkIfBookExists(book);

    if (uniqueIsbn) {
      // Add Book to UI
      UI.addBookToList(book);
      UI.showAlert("Succesfully book added", "success");
      // Add book to store
      Store.addBook(book);
      // Clear fields

      UI.clearFields();
    } else {
      UI.showAlert("Please type an unique isbn", "warning");
    }
  }
});
// Event : Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);
  // Remove book from Store

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

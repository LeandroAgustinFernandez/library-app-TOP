let myLibrary = [];
const bookList = document.querySelector(".bookList");
const newBook = document.querySelector(".newBook");
const addBook = document.querySelector(".addBook");

addBook.addEventListener("click", createBook);

newBook.addEventListener("click", showForm);

function showForm(e) {
  changeIcon();
  document.querySelector(".form-section").classList.toggle("hideForm");
}

function changeIcon() {
  if (newBook.firstChild.classList.contains("fa-plus")) {
    newBook.firstChild.classList.remove("fa-plus");
    newBook.firstChild.classList.add("fa-minus");
  } else {
    newBook.firstChild.classList.remove("fa-minus");
    newBook.firstChild.classList.add("fa-plus");
  }
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read == null ? false : true;
}

function createBook(e) {
  e.preventDefault();
  let empty = false;
  const formBook = document.querySelector("form");
  const data = new FormData(formBook);
  for (const [key, value] of data) {
    if (value == "" || value == null) {
      empty = true;
    }
  }
  let message = document.querySelector(".errorMessage");
  if (empty == true) {
    message.classList.remove("hideMessage");
    return;
  }
  let book = new Book(
    data.get("title"),
    data.get("author"),
    data.get("pages"),
    data.get("read")
  );
  myLibrary.push(book);
  listBooks();
  formBook.reset();
  if (!message.classList.contains("hideMessage") && empty == false) {
    message.classList.add("hideMessage");
    return;
  }
}

function showError(state) {}

function listBooks() {
  bookList.innerHTML = "";
  if (myLibrary.length != 0) {
    myLibrary.forEach((book) => {
      let tr = document.createElement("tr");
      let tdTitle = document.createElement("td");
      let tdAuthor = document.createElement("td");
      let tdPages = document.createElement("td");
      tdPages.style.textAlign = "right";
      let tdRead = document.createElement("td");
      tdRead.style.width = "120px";
      tdRead.style.textAlign = "center";
      let tdActions = document.createElement("td");
      tdActions.setAttribute("style", "text-align:center;width:120px");
      tdTitle.textContent = book.title;
      tdAuthor.textContent = book.author;
      tdPages.textContent = book.pages;
      tdRead.innerHTML = book.read
        ? '<i class="fa-solid fa-book-open"></i>'
        : '<i class="fa-solid fa-book"></i>';
      tdActions.innerHTML = `<i class="fa-solid fa-eraser" onclick='remove(${myLibrary.indexOf(
        book
      )})'></i><i class="fa-solid fa-glasses" onclick='changeStateRead(${myLibrary.indexOf(
        book
      )})'></i>`;
      tr.appendChild(tdTitle);
      tr.appendChild(tdAuthor);
      tr.appendChild(tdPages);
      tr.appendChild(tdRead);
      tr.appendChild(tdActions);
      bookList.appendChild(tr);
    });
  } else {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.textContent = `There are no books yet...`;
    td.setAttribute("colspan", 5);
    td.classList = "noBooks";
    tr.appendChild(td);
    bookList.appendChild(tr);
  }
}

function remove(index) {
  myLibrary.splice(index, 1);
  listBooks();
}

function changeStateRead(index) {
  myLibrary[index].read
    ? (myLibrary[index].read = false)
    : (myLibrary[index].read = true);
  listBooks();
}

window.addEventListener("load", listBooks);

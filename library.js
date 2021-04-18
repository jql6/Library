/**
 * JavaScript file for `library.html`
 */

let myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(book, library) {
  // do stuff here
  library.push(book);
}

// Create a function that loops through myLibrary and displays them on the
// html shelf

function displayLibrary(library){
  // Check that the first element is a book object
  if (myLibrary[0].constructor !== Book){
    console.log(`Error, your library variable must have a book!`);
    return;
  }
  else{
    // Make a book card template
    const shelf1 = document.querySelector("section.shelf-grid");

    // Create an element that we will duplicate inside the canvas
    const bookElement = document.createElement('section');
    bookElement.classList.add('book');
    const bookDetails = document.createElement('section');
    bookDetails.classList.add('details');
    bookElement.appendChild(bookDetails);

    // Populate the html with a sufficient amount of book cards equal to
    // library length
    for (let i = 0; i < library.length; i++) {
      shelf1.appendChild(bookElement.cloneNode(true));
    }

    // Loop through the library and fill in the details one by one
    let bookCards = document.querySelectorAll('section.details');
    let bookCardArray = Array.from(bookCards);

    // For every book
    for (let i = 0; i < library.length; i++) {
      // For every detail property in the book
      for (let j = 0; j < Object.keys(myLibrary[i]).length; j++) {
        let detailsText = document.createElement('p');
        // Get the property name
        let detailProperty = Object.keys(library[i])[j];
        // Use the property contents for the text content
        detailsText.textContent = library[i][detailProperty];
        // Append this detail property to the details element
        bookCardArray[i].appendChild(detailsText);
      }
    }

  }
}

const theHobbit =
    new Book("The Hobbit", "J.R.R. Tolkien", 310, "not read");
addBookToLibrary(theHobbit, myLibrary);

const braveNewWorld =
    new Book("Brave New World", "Aldous Huxley", 311, "read");
addBookToLibrary(braveNewWorld, myLibrary);

const braveNewWorld2 =
    new Book("Brave New World", "Aldous Huxley", 311, "read");
addBookToLibrary(braveNewWorld2, myLibrary);

const braveNewWorld3 =
    new Book("Brave New World", "Aldous Huxley", 311, "read");
addBookToLibrary(braveNewWorld3, myLibrary);

const braveNewWorld4 =
    new Book("Brave New World", "Aldous Huxley", 311, "read");
addBookToLibrary(braveNewWorld4, myLibrary);

const braveNewWorld5 =
    new Book("Brave New World", "Aldous Huxley", 311, "read");
addBookToLibrary(braveNewWorld5, myLibrary);

const braveNewWorld6 =
    new Book("Brave New World", "Aldous Huxley", 311, "read");
addBookToLibrary(braveNewWorld6, myLibrary);

console.log(myLibrary);

displayLibrary(myLibrary);
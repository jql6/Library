/**
 * JavaScript file for the library app's `index.html`
 */

/**
 * Functions
 */

// Book constructor
class Book{
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = (read == "read" ? "read" : "not read");
    }
}

// Function for adding books to the library array
function addBookToLibrary(book, library) {
    /**
     * Inputs
     * book | object with Book prototype
     * library | array of Book objects
     */
    library.push(book);
}

// Function that displays the library array on the shelf grid
function displayLibrary(library){
    /**
     * Inputs
     * library | array of Book objects
     */

    // Make a book card template
    const shelf1 = document.getElementById("shelf-grid");

    // If the bookshelf has books, clear the bookshelf
    if (shelf1.childNodes.length > 0){
        shelf1.innerHTML = '';
    }

    // Create a template element for a book
    const bookElement = document.createElement('section');
    bookElement.classList.add('book');
    const bookDetails = document.createElement('section');
    bookDetails.classList.add('details-grid');
    bookElement.appendChild(bookDetails);

    // Populate bookshelf with enough book elements
    for (let i = 0; i < library.length; i++) {
      shelf1.appendChild(bookElement.cloneNode(true));
    }

    // Select all the book elements
    let booksInLibrary = document.querySelectorAll('section.book');
    let booksArray = Array.from(booksInLibrary);
    // Flesh out each book element using the myLibrary array
    booksArray.forEach((book, i) => {
        // Assigning the element an index number to link it to myLibrary book
        book.setAttribute("data-library-index", i);
        // Add the title, author, number of pages, and read status
        let bookDetails = book.querySelector('.details-grid');
        let bookDetailsText = document.createElement('section');
        bookDetailsText.classList.add('details-text');
        bookDetails.appendChild(bookDetailsText);
        Object.keys(library[i]).forEach((key, j) => {
            let detail1 = document.createElement('p');
            // Get the property name
            let detail1Property = Object.keys(library[i])[j];
            // Use the property contents for the text content
            detail1.textContent = library[i][detail1Property];
            detail1.classList.add(`details-${key}`);
            // Append this detail property to the details element
            bookDetailsText.appendChild(detail1);
        });

        // Add buttons for removing books and toggling the read status
        let bookButtons = document.createElement("section");
        bookButtons.classList.add("book-buttons");
        bookDetails.appendChild(bookButtons);
    
        let removeBookButton = document.createElement("button");
        removeBookButton.classList.add("remove-book-button");
        removeBookButton.textContent = "remove";
        bookButtons.appendChild(removeBookButton);
    
        let readBookButton = document.createElement("button");
        readBookButton.classList.add("read-book-button");
        readBookButton.textContent = "toggle read";
        bookButtons.appendChild(readBookButton);
        });
    // Add event listeners again
    addBookRemoveButtons();
    addBookReadButtons();
}

// Function for generating the new book form
function makeNewBookForm(){
    let newBookForm = document.getElementById("new-book-form");
    // If the form doesn't already exist, make it
    if(typeof(newBookForm) == "undefined" || newBookForm == null){
        // Create the form in html
        newBookForm = document.createElement("form");
        newBookForm.id = "new-book-form";
        newBookForm.style.zIndex = "1";
        newBookForm.setAttribute("onsubmit", "return false");

        // Create an array of arrays to loop through for making the form
        let inputDict = [
            // section id, for attribute, text content,
            // input type, placeholder, required
            ["newBookTitleSection", "title", "Title",
             "text", "Enter book title", true],
            ["newBookAuthorSection", "author", "Author",
            "text", "Enter book author", true],
            ["newBookPagesSection", "pages", "Pages",
            "number", "Enter number of pages", true],
            ["newBookReadSection", "read", "Read",
            "checkbox", "Have you read this book?", false]
        ];

        for (let i = 0; i < inputDict.length; i++) {
            // Label
            let inputLabel = document.createElement("label");
            inputLabel.setAttribute("for", inputDict[i][1]);
            inputLabel.appendChild(document.createElement("b"));
            inputLabel.firstElementChild.textContent = inputDict[i][2];
            newBookForm.appendChild(inputLabel);
            // Input
            let inputField = document.createElement("input");
            inputField.setAttribute("type", inputDict[i][3]);
            inputField.setAttribute("placeholder", inputDict[i][4]);
            inputField.setAttribute("name", inputDict[i][1]);
            inputField.required = inputDict[i][5];
            newBookForm.appendChild(inputField);
        }

        // Select the pop-up-container section
        let popUpContainer = document.getElementById("pop-up-container");
        // Append it to the pop-up-container
        popUpContainer.appendChild(newBookForm);

        // Add buttons
        let addBookButton = document.createElement("button");
        addBookButton.textContent = "ADD BOOK";
        addBookButton.id = "new-book-form-add-book";
        newBookForm.appendChild(addBookButton);

        let cancelBookButton = document.createElement("button");
        cancelBookButton.textContent = "CANCEL";
        cancelBookButton.id = "new-book-form-cancel";
        cancelBookButton.setAttribute("type", "reset");
        newBookForm.appendChild(cancelBookButton);
    }
    // Hide the form
    newBookForm.style.display = "none";
}

// Buttons for showing and hiding the new book form
function showNewBookForm(){
    const newBookForm = document.getElementById("new-book-form");
    newBookForm.style.display = "grid";
}
function closeNewBook(){
    const newBookForm = document.getElementById("new-book-form");
    newBookForm.style.display = "none";
}
// Buttons for adding a new book to the library
function addNewBook(){
    // Get book from the form
    const title = document.querySelector("input[name='title']").value;
    const author = document.querySelector("input[name='author']").value;
    const pages = parseInt(document.querySelector("input[name='pages']").value);
    const read = document.querySelector("input[name='read']").checked;

    const bookToAdd = new Book(title, author, pages, read);
    myLibrary.push(bookToAdd);
    // Update local storage
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    // Refresh library display
    displayLibrary(myLibrary);
    // Reset form and close it
    const newBookForm = document.getElementById("new-book-form");
    newBookForm.reset();
    closeNewBook();
}
// Button for removing a book from the library
function removeBook(e){
    // Get the book that contains this remove button
    let bookToRemove = e.target.parentNode.parentNode.
            parentNode;

    let bookIndex = parseInt(bookToRemove.getAttribute("data-library-index"));
    // At the book index, remove 1 book
    myLibrary.splice(bookIndex, 1);
    // Update local storage
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    // Refresh the library display
    displayLibrary(myLibrary);
}
// Button for toggling the read status
function toggleRead(e){
    // Get the book that contains this remove button
    let bookToToggle = e.target.parentNode.parentNode.
            parentNode;
    // Change the read status
    let bookIndex = parseInt(bookToToggle.getAttribute("data-library-index"));
    myLibrary[bookIndex].read = (myLibrary[bookIndex].read == "read" ?
                                 "not read" : "read");
    // Refresh the library display
    displayLibrary(myLibrary);
}

// Function for initializing the library if none exists
function initializeLibrary(library){
    /**
     * Inputs
     * library | array of Book objects
     */
    localStorage.clear();
    library = [];
    localStorage.setItem("myLibrary", JSON.stringify(library));
    loadLibrary();

    const theHobbit =
    new Book("The Hobbit", "J.R.R. Tolkien", 310, "not read");
    addBookToLibrary(theHobbit, library);

    const braveNewWorld = new Book(
        "Brave New World", "Aldous Huxley", 311, "read"
    );
    addBookToLibrary(braveNewWorld, library);

    const myMassiveThesis = new Book(
        "My Massive Thesis on the Possible Reasons Why Kyrie Irving Decided to Just Randomly Miss Games for No Apparent Reason", "J L", 1, "not read"
    );
    addBookToLibrary(myMassiveThesis, library);
    // Add library to localStorage
    localStorage.setItem("myLibrary", JSON.stringify(library));
    loadLibrary();
    console.log(library);
}
// Function for loading the library from local storage
function loadLibrary(){
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}
// Function for resetting the local storage to defaults
function resetLibrary(e){
    if (e.target.id != "reset-confirmation"){
        // Change button text content to ask for user confirmation
        e.target.id = "reset-confirmation";
        e.target.textContent = "This can't be undone. Are you sure?";
    }
    else{
        e.target.removeAttribute("id");
        e.target.textContent = "RESET LIBRARY";
        initializeLibrary(myLibrary);
        displayLibrary(myLibrary);
    }
}

// Make a function for resetting the local storage library
// Make a function for resetting the reset button when closing hidden settings

/**
 * Page initialization
 */
let myLibrary = [];

// Load from local storage; use default library if unavailable
if (!localStorage.getItem('myLibrary')) {
    console.log("No library in local storage; loading default books");
    initializeLibrary(myLibrary);
}
else {
    console.log("Loading local storage library");
    loadLibrary();
}
// Show the library
displayLibrary(myLibrary);
// Load the new book form pop up
makeNewBookForm();


/**
 * Adding event listeners
 */
// Button for adding new book
const newBookButton = document.querySelector('.new-book');
newBookButton.addEventListener('click', showNewBookForm);

// Add event listener for `reset library` button
const resetLibraryButton = document.querySelector('.reset-library');
resetLibraryButton.addEventListener('click', resetLibrary);

const newBookForm = document.getElementById("new-book-form");
// Add event listener when the form is submitted with the `add book` button
newBookForm.addEventListener(
    "submit", function(){addNewBook(myLibrary);}, false);
// Add event listener for `cancel` button
const newBookFormCancelButton = document.getElementById(
    "new-book-form-cancel"
);
newBookFormCancelButton.addEventListener('click', closeNewBook);

// Add event listener for `remove` button
function addBookRemoveButtons() {
    const bookRemoveButtons = document.getElementsByClassName(
        "remove-book-button"
    );
    let bookRemoveButtonsArray = Array.from(bookRemoveButtons);
    
    bookRemoveButtonsArray.forEach(removeButton => {
        removeButton.addEventListener('click', removeBook);
    });
}
// Add event listener for `toggle read` button
function addBookReadButtons() {
    const bookReadButtons = document.getElementsByClassName(
        "read-book-button"
    );
    
    let bookReadButtonsArray = Array.from(bookReadButtons);
    
    bookReadButtonsArray.forEach(readButton => {
        readButton.addEventListener('click', toggleRead);
    });
}


/**
 * References
 */

/*
https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
*/
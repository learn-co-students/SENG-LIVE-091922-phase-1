//BookStore has been moved to data.js 

// Should Be Responsible for DOM Rendering

// 1) Render Header

    // <h1>Easley's Technical Books<h1>

    // const first = document.getElementById('store-name');
    const renderHeader = bookStore => {
        const title = document.querySelector('#store-name');
        title.textContent = bookStore.name;

        // return "Hello!";
    }

    // console.log(document.forms)

// 2) Render Footer

    // Only Need to Pass in bookStore

        // bookStore.name
        // bookStore.address
        // bookStore.hours

    // someFunction();

    // function someFunction() {
    //     console.log("Goodbye!");
    // }

    // function someFunction() {
    //     console.log("Hello!");
    // }

    const renderFooter = bookStore => {
        const footerDivs = document.querySelectorAll('footer div');

        // console.log(footerDivs);

        footerDivs[0].textContent = bookStore.name;
        footerDivs[1].textContent = bookStore.address;
        footerDivs[2].textContent = bookStore.hours;
    }

// 2) Render BookCards, 1 for Each of Our Book Objects

    // .map => Returns a New Array 

    const renderBookCard = book => {
        // console.log(book.title);
        // console.log(book.author);
        // console.log(book.price);
        // console.log(book.imageUrl);
        // console.log("---------------");

        // Create Elements to Contain Each Piece of Information
            // li => ParentContainer
                // h3 => Title
                // p => Author
                // p => Price
                // img => imageUrl
        const bookCard = document.createElement('li');
        const bookTitle = document.createElement('h3');
        const bookAuthor = document.createElement('p');
        const bookPrice = document.createElement('p');
        const bookImage = document.createElement('img');

        // Apply Book Info to Sub-Elements
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPrice.textContent = `$${book.price.toFixed(2) * 0.5}`;
        bookImage.src = book.imageUrl;

        // Apply Class Necessary for bookCard Styling
        bookCard.className = 'list-li';

        // Append Book Info to bookCard
        // append => Accommodates Multiple Arguments
        bookCard.append(bookTitle, bookAuthor, bookPrice, bookImage);

        // Query Selectors
        const bookCardContainer = document.querySelector('#book-list');

        // Append bookCard to bookCardContainer
        bookCardContainer.appendChild(bookCard);
    }

// Function Invocations

renderHeader(bookStore);
renderFooter(bookStore);
// bookStore.inventory.forEach(book => renderBookCard(book));
bookStore.inventory.forEach(renderBookCard);

// bookStore.name.address.hours

// bookStore = {
//     name: {
//         address: {
//             hours: "Here's the Value"
//         }
//     }
// }

// Once You Get to React...

    // Imperative Syntax (Painstaking / Nuanced)
    // Declarative Syntax ("Syntactic Sugar")
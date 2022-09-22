
// CRUD

    // C => Create
    // R => Read
    // U => Update
    // D => Delete

// console.log(bookStore["name"]);


// Asynchronous Code
// setTimeout(() => console.log("Hello!"), 2000);

// // Synchronous Code
// const myName = "Louis";
// console.log(myName);



document.addEventListener('DOMContentLoaded', () => {

    // Promise States
    
        // pending
        // fulfilled
        // rejected

    // Anatomy of a Fetch Request

        // fetch(url)
            // Returns a Promise That Contains
            // the PromiseResult That We Pass
            // On (Response Object)
        // .then(res => res.json())
            // Carries On the Response Object
            // Parses Out the Data from the Response Object
                // .json()
            // res.json() => Returns a Promise That
            // Contains the Promise Result That WE
            // Pass On (Data Object - Array / JS Object)
        // .then(books => books.forEach(renderBookCard))
            // Data Is Passed On to Next CB Function
            // Where It's Used to Handle Rendering
        // .catch(error => { 
        //     console.error(`Issue with Retrieving Books: ${error}`)
        // });
            // Put In Place a Catch Statement to Report
            // Error if We Encounter at Any Point in Our
            // Chain of Asynchronous Behaviors

        


    const fetchResource = url => {
        return fetch(url)
        .then(res => res.json())
    }
    
    // fetchResource("http://localhost:3000/stores");
    // fetchResource("http://localhost:3000/books");

    // fetchResource("http://localhost:3000/stores")
    // .then(data => console.log(data));

    const renderHeader = bookStore => {
        const title = document.querySelector('#store-name');
        title.textContent = bookStore.name;
    }

    const renderFooter = bookStore => {
        const footerDivs = document.querySelectorAll('footer div');

        footerDivs[0].textContent = bookStore.name;
        footerDivs[1].textContent = bookStore.address;
        footerDivs[2].textContent = bookStore.hours;
    }

    const renderBookCard = book => {

        const bookCard = document.createElement('li');
        const bookTitle = document.createElement('h3');
        const bookAuthor = document.createElement('p');
        const bookPrice = document.createElement('p');
        const bookImage = document.createElement('img');
        const bookInventory = document.createElement('p');
        const deleteButton = document.createElement('button');

        bookCard.className = 'list-li';
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPrice.textContent = `$${book.price.toFixed(2)}`;
        bookImage.src = book.imageUrl;
        bookInventory.textContent = `Inventory: ${book.inventory}`;
        deleteButton.textContent = 'Delete';
        
        // Discount Widget
        const discountSlider = document.createElement('div');
        const discountInput = document.createElement('input');
        const discountPercent = document.createElement('p');

        discountInput.type = 'range';
        discountInput.min = '0';
        discountInput.max = '100';
        discountInput.value = '0';
        discountPercent.className = 'discount-percent';
        discountPercent.textContent = '0% Discount';

        bookCard.append(bookTitle, bookAuthor, bookInventory, bookPrice, discountPercent, discountSlider, bookImage, deleteButton);
        discountSlider.appendChild(discountInput);

        // Query Selectors
        const bookCardContainer = document.querySelector('#book-list');
        bookCardContainer.appendChild(bookCard);

        // Event Listeners
        deleteButton.addEventListener('click', () => {
            bookCard.remove();
        });

        discountInput.addEventListener('input', e => {
            const discount = (1 - (e.target.value / 100));
            bookPrice.textContent = `$${applyDiscount(book.price, discount)}`
            discountPercent.textContent = `${e.target.value}% Discount`
        });
    }

    // Utilities
    const applyDiscount = (price, discount) => {
        return ((price * discount).toFixed(2));
    }

    // Event Listeners
    const bookForm = document.querySelector('#book-form');
    
    bookForm.addEventListener('submit', e => {

        e.preventDefault();

        const newBook = {
            id: bookStore.inventory.length + 1,
            title: e.target.title.value,
            author: e.target.author.value,
            price: parseInt(e.target.price.value),
            reviews: [],
            inventory: parseInt(e.target.inventory.value),
            imageUrl: "/04_Communicating_with_the_Server/assets/book-cover-placeholder.png"
        }

        console.log(newBook);

        bookStore.inventory.push(newBook);
        renderBookCard(newBook);
    });

    // Function Invocations
    fetchResource("http://localhost:3000/stores/1")
    .then(store => {
        renderHeader(store);
        renderFooter(store);    
    })
    .catch(error => {
        console.error(`Issue with Retrieving Store: ${error}`)
    });
    
    fetchResource("http://localhost:3000/books")
    .then(books => books.forEach(renderBookCard))
    .catch(error => { 
        console.error(`Issue with Retrieving Books: ${error}`)
    });
});
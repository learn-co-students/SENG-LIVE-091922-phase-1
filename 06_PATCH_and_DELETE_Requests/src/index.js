document.addEventListener('DOMContentLoaded', () => {

    // Config Object

    // Function to Handle GET Requests - R (Read)
    const fetchResource = url => {
        return fetch(url)
        .then(res => res.json())
    }

    // Function to Handle POST Requests - C (Create)
    // Two Pieces of Information:
        // Request URL
        // Configuration Object
    const createResource = (url, body) => {
        
        const configurationObject = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        }
        
        return fetch(url, configurationObject);
    }

    // Function to Handle PATCH Requests - U (Update)
    // Two Pieces of Information:
    // Request URL
    // Configuration Object
    const updateResource = (url, body) => {
    
        const configurationObject = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        }
        
        return fetch(url, configurationObject);
    }

    // Function to Handle DELETE Requests - D (Delete)
    // One Pieces of Information:
    // Request URL
    const deleteResource = url => {
    
        const configurationObject = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        }
        
        return fetch(url, configurationObject);
    }

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
        // console.log(book.id);
        
        const bookCard = document.createElement('li');
        const bookTitle = document.createElement('h3');
        const bookAuthor = document.createElement('p');
        const bookPrice = document.createElement('p');
        const bookImage = document.createElement('img');
        const bookInventory = document.createElement('input');
        const deleteButton = document.createElement('button');

        // bookCard.id = `book-${book.id}`;
        bookCard.className = 'list-li';
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPrice.textContent = `$${book.price.toFixed(2)}`;
        bookImage.src = book.imageUrl;
        deleteButton.textContent = 'Delete';
        bookInventory.type = 'number';
        bookInventory.value = book.inventory;
        
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
            // bookCard.remove();

            deleteResource(`http://localhost:3000/books/${book.id}`)
            .then(() => { 
                alert("Book Removed!");
                bookCard.remove(); 
            })
            .catch(err => console.error(`Something Went Wrong: ${err}`))
        });

        discountInput.addEventListener('input', e => {
            const discount = (1 - (e.target.value / 100));
            bookPrice.textContent = `$${applyDiscount(book.price, discount)}`
            discountPercent.textContent = `${e.target.value}% Discount`
        });

        bookInventory.addEventListener('change', e => {
            // const updateResource = (url, body) => {            
            // console.log(`New Value: ${parseInt(e.target.value)}`);

            updateResource(`http://localhost:3000/books/${book.id}`, {inventory: parseInt(e.target.value)})
            .then(res => res.json())
            // .then(data => console.log(data))
            .then(console.log)
            .catch(err => console.error(`Here's The Error: ${err}`));
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
            title: e.target.title.value,
            author: e.target.author.value,
            price: parseInt(e.target.price.value),
            reviews: [],
            inventory: parseInt(e.target.inventory.value),
            imageUrl: "/06_PATCH_and_DELETE_Requests/assets/book-cover-placeholder.png"
        }

        // Render Optimistically
            // Swifter User Experience
            // Requires Us To Undo The Optimistic DOM Change
            // That We Made
        renderBookCard(newBook);

        createResource("http://localhost:3000/books", newBook)
        .catch(() => {

            // debugger
            
            // Hone In on Final BookCard
            const bookCards = document.querySelectorAll('li');
            // const finalBook = Array.from(bookCards).slice(-1);
            const finalBook = bookCards[bookCards.length - 1];

            // Remove Final BookCard from DOM
            finalBook.remove();
        })

        // Render Pessimistically
            //  Sluggish User Experience
            //  Does Not Requires Us to Undo Any Changes
        // .then(() => renderBookCard(newBook));
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
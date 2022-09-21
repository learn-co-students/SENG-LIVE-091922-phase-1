// JS
    // Global Scope
    // Function Scope
    // Block Scope

// Previously => All JS Code in Global Scope 

// const globalScopeConst = "Something";

document.addEventListener('DOMContentLoaded', () => {
    
    // console.log(globalScopeConst);

    // ...Now We've Moved Our JS Code to Function Scope

    // 1) Render Header

    const renderHeader = bookStore => {
        const title = document.querySelector('#store-name');
        title.textContent = bookStore.name;
    }

    // 2) Render Footer

    const renderFooter = bookStore => {
        const footerDivs = document.querySelectorAll('footer div');

        footerDivs[0].textContent = bookStore.name;
        footerDivs[1].textContent = bookStore.address;
        footerDivs[2].textContent = bookStore.hours;
    }

    // 3) Render BookCards, 1 for Each of Our Book Objects

    const renderBookCard = book => {
        // console.log(book.title);
        // console.log(book.author);
        // console.log(book.price);
        // console.log(book.imageUrl);
        // console.log("---------------");

        const bookCard = document.createElement('li');
        const bookTitle = document.createElement('h3');
        const bookAuthor = document.createElement('p');
        const bookPrice = document.createElement('p');
        const bookImage = document.createElement('img');
        const bookInventory = document.createElement('p');
        const deleteButton = document.createElement('button');

        // Apply Book Info to Sub-Elements
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPrice.id = `demo-${book.id}`;
        bookPrice.textContent = `$${book.price.toFixed(2)}`;
        bookImage.src = book.imageUrl;
        bookInventory.textContent = `Inventory: ${book.inventory}`;
        
        // Add Label for New Delete Button
        deleteButton.textContent = 'Delete';
        
        // Discount Widget
        const discountSlider = document.createElement('div');
        const discountInput = document.createElement('input');
        const discountPercent = document.createElement('p');

        discountInput.type = 'range';
        discountInput.min = '0';
        discountInput.max = '100';
        discountInput.value = '0';
        discountInput.className = 'slider';
        discountInput.id = 'myRange';
        discountPercent.className = 'discount-percent';
        discountPercent.id = `discount-${book.id}`;
        discountPercent.textContent = '0% Discount';
        discountSlider.className = 'slidecontainer'


        // Apply Class Necessary for bookCard Styling
        bookCard.className = 'list-li';

        // Append Book Info to bookCard
        // append => Accommodates Multiple Arguments
        bookCard.append(bookTitle, bookAuthor, bookInventory, bookPrice, discountPercent, discountSlider, bookImage, deleteButton);
        discountSlider.appendChild(discountInput);

        // Query Selectors
        const bookCardContainer = document.querySelector('#book-list');

        // Append bookCard to bookCardContainer
        bookCardContainer.appendChild(bookCard);

        // Add Event Listeners
        deleteButton.addEventListener('click', () => {
            
            // e => 'click' Event 

            // Solution 1
            // e.target.parentNode.remove();
            // e.target.parentElement.remove();
            
            // Solution 2
            bookCard.remove();
        });

        // Slider JS

        discountInput.addEventListener('input', e => {
            
            const percent = e.target.value / 100;

            console.log(percent)

            // Use Slider Value to Calculate / Render New Book Price
            bookPrice.textContent = `$${applyDiscount(book.price, percent)}`

            // Use Slider Value to Render Discount Percentage
            discountPercent.textContent = `${e.target.value}% Discount`
        });
    }

    // Utilities

    // Hoisted Up to renderBookCard()

    const applyDiscount = (price, percent) => {
        return ((price * (1 - percent)).toFixed(2));
    }

    // function applyDiscount(price, percent) {
    //     return ((price * (1 - percent)).toFixed(2));
    // }

    // Function Invocations

    renderHeader(bookStore);
    renderFooter(bookStore);
    bookStore.inventory.forEach(renderBookCard);

    // Add Event Listeners
    const bookForm = document.querySelector('#book-form');
    bookForm.addEventListener('submit', e => {
        
        // e => 'submit' event
        // .preventDefault() => Preserving the DOM By
        // Avoiding a Page Refresh
        e.preventDefault();

        // Upon Every Form 'submit' Event, Generate
        // New Book Object + BookCard and Append to 
        // Grid Below

            // renderBookCard(newBook)

        // Target Input Via "name"
        // e => 'submit' event object
        // e.target => DOM Element (Book Form)
        // e.target.title => DOM Element Accessed By "name"
        // e.target.title.value => Value of DOM Element Accessed By "name"

        console.log(e.target);

        // Target Input Via "id" 
        // console.log(e.target["form-title"])

        const newBook = {
            // id
            title: e.target.title.value,
            author: e.target.author.value,
            price: parseInt(e.target.price.value),
            reviews: [],
            inventory: parseInt(e.target.inventory.value),
            imageUrl: e.target.imageUrl.value
        }

        console.log(newBook);

        renderBookCard(newBook);
    })
});


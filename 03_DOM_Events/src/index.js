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
        const deleteButton = document.createElement('button');

        // Apply Book Info to Sub-Elements
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPrice.id = `demo-${book.id}`;
        bookPrice.textContent = `$${book.price.toFixed(2)}`;
        bookImage.src = book.imageUrl;
        
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
        bookCard.append(bookTitle, bookAuthor, bookPrice, discountPercent, discountSlider, bookImage, deleteButton);

        discountSlider.appendChild(discountInput);

        // Query Selectors
        const bookCardContainer = document.querySelector('#book-list');

        // Append bookCard to bookCardContainer
        bookCardContainer.appendChild(bookCard);

        // Slider JS

        // ...
    }

// Utilities

    // Hoisted Up to renderBookCard()

    function applyDiscount(price, percent) {
        return (price * ((100 - percent) / 100)).toFixed(2);
    }

// Function Invocations

    renderHeader(bookStore);
    renderFooter(bookStore);
    bookStore.inventory.forEach(renderBookCard);
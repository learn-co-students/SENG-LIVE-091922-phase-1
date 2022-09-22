document.addEventListener('DOMContentLoaded', () => {

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

        bookStore.inventory.push(newBook);
        renderBookCard(newBook);
    });

    // Function Invocations
    renderHeader(bookStore);
    renderFooter(bookStore);
    bookStore.inventory.forEach(renderBookCard);
});
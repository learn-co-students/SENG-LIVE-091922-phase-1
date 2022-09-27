document.addEventListener('DOMContentLoaded', () => {

    // CRUD Fetch Requests

        const fetchResource = url => {
            return fetch(url)
            .then(res => res.json())
        }

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

        const deleteResource = url => {
        
            const configurationObject = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            }
            
            return fetch(url, configurationObject);
        }

    // DOM Rendering

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
                
                // DOM Change + Persistence
                deleteResource(`http://localhost:3000/books/${book.id}`)
                .then(() => { 
                    // alert("Book Removed!");
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
                updateResource(`http://localhost:3000/books/${book.id}`, {inventory: parseInt(e.target.value)})
                .then(res => res.json())
                // .then(data => console.log(data))
                .then(console.log)
                .catch(err => console.error(`Here's The Error: ${err}`));
            });
        }

        const handleRenderSearch = () => {
            document.querySelector('main').innerHTML = `
            <form id="api-search">
                <label>API Search<label>
                <input type="text" name="search"></input>
                <input type="submit"></input>
            </form>
            `

            document.querySelector('#api-search').addEventListener('submit', handleAPIQuery);
        }

    // Utilities
    
        const applyDiscount = (price, discount) => {
            return ((price * discount).toFixed(2));
        }

        const handleAPIQuery= (e) => {
            
            e.preventDefault();
            
            const search = e.target.search.value;
            searchBooks(search);
        }

        console.log(apiKEY);

        // Private API (Google Books)
        const searchBooks= search => {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=10&key=${apiKEY}`)
            .then(res => res.json())
            .then(data => { 
                console.log(data.items);
                
                // data.items.forEach(book => renderSearchResult(book));
                data.items.forEach(renderSearchResult);
            });
        } 

        const renderSearchResult = book => {
            // console.log(book.volumeInfo.title);
            // console.log(book.volumeInfo.authors);
            // console.log(book.volumeInfo);

            // Create <div> Container With a Class of "search-list"
                // <h3> => Title
                // <h4> => Author
                    // If multiple authors, link each name together using "and"
                // <p> => Book Summary

            const searchResultContainer = document.createElement('div');
            const bookTitle = document.createElement('h3');
            const bookAuthors = document.createElement('h4');
            const bookSummary = document.createElement('p');

            searchResultContainer.className = "search-list";
            bookTitle.textContent = book.volumeInfo.title;
            bookAuthors.textContent = book.volumeInfo.authors[0];
            bookSummary.textContent = book.volumeInfo.description;
            

            searchResultContainer.append(bookTitle, bookAuthors, bookSummary);
            document.querySelector('main').appendChild(searchResultContainer);
        }
        
        // Public API (PokeAPI)
        // const pullPokemon = name => {
        //     fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        //     .then(res => res.json())
        //     .then(data => { 
        //         console.log(data);
        //         console.log(`Base Experience: ${data.base_experience}`);
        //         console.log(`Height: ${data.height}`);
        //     });
        // }
        
        // pullPokemon('mewtwo');

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
                imageUrl: "/07_external_apis/assets/book-cover-placeholder.png"
            }

            // Render Optimistically
            renderBookCard(newBook);

            createResource("http://localhost:3000/books", newBook)
            .catch(() => {

                const bookCards = document.querySelectorAll('li');
                const finalBook = bookCards[bookCards.length - 1];

                // Undo Optimistic Changes
                finalBook.remove();
            })

            // Render Pessimistically
            // .then(() => renderBookCard(newBook));
        });

        document.querySelector('#nav-search').addEventListener('click', handleRenderSearch);

    // Initial Page Load / Rendering
        
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
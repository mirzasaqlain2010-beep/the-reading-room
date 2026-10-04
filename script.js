let allBooks = [];
let activeGenre = "All";

const bookGrid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const genreFilters = document.getElementById("genreFilters");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");


// Books display karna
function renderBooks(books) {
    bookGrid.innerHTML = "";

    if (books.length === 0) {
        emptyState.hidden = false;
        resultCount.textContent = "0 books";
        return;
    }

    emptyState.hidden = true;
    resultCount.textContent = `${books.length} books`;

    books.forEach(book => {
        const card = document.createElement("div");

        card.className = "book-card";

        card.innerHTML = `
            <h2 class="book-title">${book.title}</h2>
            <p class="book-author">Author: ${book.author}</p>
            <p class="book-genre">${book.genre}</p>
            <p class="book-year">Year: ${book.year}</p>

            <div class="book-meta">
                <span class="book-genre">${book.genre}</span>

                <span class="book-status ${
                    book.available ? "available" : "checked-out"
                }">
                    ${book.available ? "Available" : "Checked Out"}
                </span>
            </div>
        `;

        bookGrid.appendChild(card);
    });
}


// Genre filters banana
function renderGenreFilters(books) {
    const genres = [
        "All",
        ...new Set(books.map(book => book.genre))
    ];

    genreFilters.innerHTML = "";

    genres.forEach(genre => {
        const button = document.createElement("button");

        button.textContent = genre;
        button.className = "genre-chip";

        button.addEventListener("click", () => {
            activeGenre = genre;
            applyFilters();
        });

        genreFilters.appendChild(button);
    });
}


// Search + Genre filter
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredBooks = allBooks.filter(book => {

        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm);

        const matchesGenre =
            activeGenre === "All" ||
            book.genre === activeGenre;

        return matchesSearch && matchesGenre;
    });

    renderBooks(filteredBooks);
}


// Backend se books lena
fetch("/api/books")
    .then(response => response.json())
    .then(data => {

        allBooks = data;

        renderGenreFilters(allBooks);
        renderBooks(allBooks);

        console.log(allBooks);
    })
    .catch(error => {

        console.error("Error loading books:", error);

        bookGrid.innerHTML = `
            <p class="empty-state">
                Could not load books from server.
            </p>
        `;
    });


// Search box
searchInput.addEventListener("input", applyFilters);
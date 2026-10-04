from flask import Flask, jsonify, render_template

app = Flask(__name__, template_folder="../frontend", static_folder="../frontend")

books = [
    {
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "genre": "Fantasy",
        "year": 1937,
        "available": False
    }
]
books = [
    {
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "genre": "Fantasy",
        "year": 1937,
        "available": False
    },
    {
        "title": "Dune",
        "author": "Frank Herbert",
        "genre": "Science Fiction",
        "year": 1965,
        "available": True
    },
    {
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "genre": "Technology",
        "year": 2008,
        "available": True
    },
     {
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "genre": "Fiction",
        "year": 1988,
        "available": False
    },
    {
        "title": "Project Hail Mary",
        "author": "Andy Weir",
        "genre": "Science Fiction",
        "year": 2021,
        "available": True
    },
    {
        "title": "Harry Potter",
        "author": "J.K. Rowling",
        "genre": "Fantasy",
        "year": 1997,
        "available": True
    },
    {
        "title": "Atomic Habits",
        "author": "James Clear",
        "genre": "Self Help",
        "year": 2018,
        "available": True
    },
    {
        "title": "Rich Dad Poor Dad",
        "author": "Robert Kiyosaki",
        "genre": "Finance",
        "year": 1997,
        "available": False
    },
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Classic",
        "year": 1925,
        "available": True
    },
    {
        "title": "1984",
        "author": "George Orwell",
        "genre": "Dystopian",
        "year": 1949,
        "available": False
    }
]
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/books")
def get_books():
    return jsonify(books)
@app.route("/style.css")
def style():
    return app.send_static_file("style.css")

@app.route("/script.js")
def script():
    return app.send_static_file("script.js")


if __name__ == "__main__":
    app.run(debug=True)
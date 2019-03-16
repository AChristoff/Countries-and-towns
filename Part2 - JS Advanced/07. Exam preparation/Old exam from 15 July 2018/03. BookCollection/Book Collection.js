class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        this.room = room;
        this.shelfGenre = shelfGenre;
        this.shelfCapacity = shelfCapacity;
        this.shelf = [];

        return this;
    }

    get room() {
        return this._room
    }

    set room(roomName) {
        if (roomName === 'livingRoom' || roomName === 'bedRoom' || roomName === 'closet') {
            return this._room = roomName;
        } else {
            throw `Cannot have book shelf in ${roomName}`;
        }
    }

    get shelfCondition() {
        return this.shelfCapacity - this.shelf.length;
    }

    addBook(bookName, bookAuthor, genre) {
        if (this.shelfCondition === 0) {
            this.shelf.shift();
        }
        this.shelf.push({bookName, bookAuthor, genre});
        this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
        return this;
    }

    throwAwayBook(bookName) {
        this.shelf = this.shelf.filter((book) => book.bookName !== bookName);
        return this;
    }

    showBooks(genre) {
        let result = [`Results for search "${genre}":`];
        for (let book of this.shelf) {
            if (book.genre === genre) {
                result.push(`\uD83D\uDCD6 ${book.bookAuthor} - "${book.bookName}"`);
            }
        }
        return result.join('\n');
    }

    toString() {
        if (this.shelf.length === 0) {
            return "It's an empty shelf";
        }
        let result = `"${this.shelfGenre}" shelf in ${this._room} contains:\n`;
        result += this.shelf
            .map((book) => `\uD83D\uDCD6 "${book.bookName}" - ${book.bookAuthor}`)
            .join('\n');

        return result.trim();
    }
}
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
        this.shelf
            .filter((book) => book.genre === genre)
            .forEach((book) => result.push(`\uD83D\uDCD6 ${book.bookAuthor} - "${book.bookName}"`));
        return result.join('\n');
    }

    toString() {
        if (this.shelf.length === 0) {
            return "It's an empty shelf";
        } else {
            let result = [`"${this.shelfGenre}" shelf in ${this._room} contains:`];
            this.shelf.forEach((book) => result.push(`\uD83D\uDCD6 "${book.bookName}" - ${book.bookAuthor}`));
            return result.join('\n');
        }
    }
}
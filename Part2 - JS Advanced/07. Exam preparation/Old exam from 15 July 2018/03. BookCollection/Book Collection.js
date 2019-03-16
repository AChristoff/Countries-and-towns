class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        this.room = room;
        this.shelfGenre = shelfGenre;
        this.shelfCapacity = shelfCapacity;
        this.shelf = [];
    }

    get room() {
        return this._room
    }

    set room(room) {
        if (room === 'livingRoom'
            || room === 'bedRoom'
            || room === 'closet') {
            return this._room = room;
        } else {
            throw `Cannot have book shelf in ${room}`;
        }
    }

    addBook(name, author, genre) {
        if (this.shelfCapacity > 0) {
            this.shelfCapacity--;
            this.shelf.push({name, author, genre})
        } else {
            this.shelf.shift();
            this.shelf.push({name, author, genre})
        }
        this.shelf.sort((a, b) => a.author.localeCompare(b.author));
    }

    throwAwayBook(bookName) {
        for (let i = 0; i < this.shelf.length; i++) {
            if (this.shelf[i].name === bookName) {
                let bookToDelete = this.shelf.indexOf(this.shelf[i]);
                this.shelf.splice(bookToDelete, 1);
                this.shelfCapacity++;
            }
        }
    }

    showBooks(genre) {
        let result = [`Results for search "${genre}":`];
        for (let book of this.shelf) {
            if (book.genre === genre) {
                result.push(`\uD83D\uDCD6 ${book.author} - "${book.name}"`);
            }
        }
        return result.join('\n');
    }

    get shelfCondition() {
        return this.shelfCapacity;
    }

    toString() {
        if (this.shelf.length === 0) {
            return "It's an empty shelf";
        } else {
            let result = [`"${this.shelfGenre}" shelf in ${this._room} contains:`];
            for (let book of this.shelf) {
                    result.push(`\uD83D\uDCD6 "${book.name}" - ${book.author}`);
            }
            return result.join('\n');
        }
    }
}
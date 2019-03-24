class Rat {
    constructor(name, unitedRats = []) {
        this.name = name;
        this.unitedRats = unitedRats;
    }

    unite(otherRat) {
        if (otherRat.constructor.name === 'Rat') {
            this.unitedRats.push(otherRat);
        }
    }

    toString() {
        return `${this.name}\n${this.unitedRats.map((x) => `##${x}`).join('')}`;
    }

    getRats() {
        return this.unitedRats;
    }
}

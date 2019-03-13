class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
        this.kidsCounter = 0;

        Array.prototype.findIndex = function (searched) {
            let result = [];
            for (let i = 0; i < this.length; i++) {
                if (this[i].includes(searched)) {
                    result.push(i)
                }
            }
            return result
        };
    }

    registerChild(name, grade, budget) {
        if (this.budget <= budget) {
            this.kids[grade] = this.kids[grade] || [];
            if (!this.kids[grade].find((x) => x.includes(name))) {
                this.kids[grade].push(`${name}-${budget}`);
                this.kidsCounter++;
                return this.kids[grade];
            } else {
                return `${name} is already in the list for this ${this.destination} vacation.`;
            }
        } else {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }
    }

    removeChild(name, grade) {
        if (this.kids[grade] && this.kids[grade].find((x) => x.includes(name))) {
            let kidForRemoval = this.kids[grade].findIndex('Lilly')[0];
            this.kids[grade].splice(kidForRemoval, 1);
            this.kidsCounter--;
            return this.kids[grade]
        } else {
            return `We couldn't find ${name} in ${grade} grade.`;
        }
    }

    toString() {
        if (this.kidsCounter) {
            let result = [];

            result.push(`${this.organizer} will take ${this.kidsCounter} children on trip to ${this.destination}\n`);

            for (let KEY in this.kids) {
                result.push(`Grade: ${KEY}\n`);
                let kids = Object.values(this.kids[KEY]);
                for (let i = 0; i < kids.length; i++) {
                    result.push(`${i + 1}. ${kids[i]}\n`)
                }
            }
            result.map(x => x.trim()).filter(Boolean);
            return result.join('');
        } else {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }
    }

    get numberOfChildren() {
        return this.kidsCounter;
    }
}
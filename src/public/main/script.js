const squares = document.getElementsByClassName('square')
const positions = Array.from(squares, (square) => square.id)

function increment(value) {
    this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'y', 'z'];
    if (value.toLowerCase().match(/[a-z]/i)) {
        value = this.alphabet[this.alphabet.indexOf(value.toLowerCase()) + 1]
        if (!value) {
            value = this.alphabet[0]
        }
        return value
    } else {
        value++
        return value
    }
}

function decrement(value) {
    this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'y', 'z'];
    if (value.toLowerCase().match(/[a-z]/i)) {
        value = this.alphabet[this.alphabet.indexOf(value.toLowerCase()) - 1]
        if (!value) {
            value = this.alphabet[this.alphabet.length - 1]
        }
        return value
    } else {
        value--
        return value
    }
}

class Piece {
    static id = 1;

    constructor(name, colour, coordinate) {
        this.name = name;
        this.colour = colour;
        this.coordinate = coordinate;
        this.canBeKilled = false;
        this.id = Piece.id
        this.create()
    }

    toString() {
        return `${this.name} ${this.colour} ${this.coordinate} ${this.id}`;
    }

    getMoves() {}

    changeCoordinates(tempCoordinate) {
        this.coordinate = tempCoordinate
    }

    left(coordinate) {
        return decrement(coordinate[0]) + coordinate[1]
    }
    right(coordinate) {
        return increment(coordinate[0]) + coordinate[1]
    }
    up(coordinate) {
        return coordinate[0] + increment(coordinate[1])
    }
    down(coordinate) {
        return coordinate[0] + decrement(coordinate[1])
    }

    create() {
        if (!positions.includes(this.coordinate)) return

        let position = document.getElementById(this.coordinate)
        let piece = document.createElement('img');

        piece.id = String(Piece.id)
        piece.classList.add('pieces')
        piece.classList.add(this.name)
        piece.classList.add(this.colour)
        piece.src = `../../images/pieces/${this.colour}/${this.name}.png`;

        Piece.id++

        position.appendChild(piece);
    }
}

class Rook extends Piece {
    constructor(colour, coordinate) {
        super('rook', colour, coordinate)
        // this.create()
    }

    getMoves() {
        let coordinates = []
        let possibleCoordinates = []

        let originalCoordinate = this.coordinate;
        let tempCoordinate = this.coordinate;

        while (true) {
            tempCoordinate = this.left(tempCoordinate)
            if (positions.includes(tempCoordinate)) {
                if (!coordinates.includes(tempCoordinate)) {
                    coordinates.push(tempCoordinate)
                }

                let element = document.getElementById(tempCoordinate)
                if (Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                    tempCoordinate = originalCoordinate
                    break
                }
            } else {
                tempCoordinate = originalCoordinate
                break
            }
        }

        while (true) {
            tempCoordinate = this.right(tempCoordinate)
            if (positions.includes(tempCoordinate)) {
                if (!coordinates.includes(tempCoordinate)) {
                    coordinates.push(tempCoordinate)
                }

                let element = document.getElementById(tempCoordinate)
                if (Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                    tempCoordinate = originalCoordinate
                    break
                }
            } else {
                tempCoordinate = originalCoordinate
                break
            }
        }

        while (true) {
            tempCoordinate = this.up(tempCoordinate)
            if (positions.includes(tempCoordinate)) {
                if (!coordinates.includes(tempCoordinate)) {
                    coordinates.push(tempCoordinate)
                }

                let element = document.getElementById(tempCoordinate)
                if (Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                    tempCoordinate = originalCoordinate
                    break
                }
            } else {
                tempCoordinate = originalCoordinate
                break
            }
        }

        while (true) {
            tempCoordinate = this.down(tempCoordinate)
            if (positions.includes(tempCoordinate)) {
                if (!coordinates.includes(tempCoordinate)) {
                    coordinates.push(tempCoordinate)
                }

                let element = document.getElementById(tempCoordinate)
                if (Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                    tempCoordinate = originalCoordinate
                    break
                }
            } else {
                tempCoordinate = originalCoordinate
                break
            }
        }

        coordinates.forEach((element) => {
            if (Array.from(document.getElementById(element).children).length !== 0) {
                if (!Array.from(Array.from(document.getElementById(element).children)[0].classList).includes(this.colour)) {
                    if (Array.from(Array.from(document.getElementById(element).children)[0].classList).includes('king')) {
                        /*
                        set king to check
                        Update: I believe this will never run, the king will never be open to any piece as it would be check.
                        This if statement condition is unnecessary and should be removed.
                        */
                    } else {
                        possibleCoordinates.push(element)
                    }
                }
            } else {
                possibleCoordinates.push(element)
            }
        })
        return possibleCoordinates
    }
}

class Knight extends Piece {
    constructor(colour, coordinate) {
        super('knight', colour, coordinate)
    }

    getMoves() {
        let possibleCoordinates = []

        let originalCoordinate = this.coordinate;
        let tempCoordinate = originalCoordinate;

        let sequences = [['up', 'up', 'left'], ['up', 'up', 'right'], ['down', 'down', 'left'], ['down', 'down', 'right'], ['left', 'left', 'up'], ['left', 'left', 'down'], ['right', 'right', 'up'], ['right', 'right', 'down']]

        for (let sequence of sequences) {
            for (let direction of sequence) {
                tempCoordinate = this[direction](tempCoordinate);
            }

            if (positions.includes(tempCoordinate)) {
                let element = document.getElementById(tempCoordinate);
                if (!Array.from(element.children).some((value) => value.tagName === 'IMG') || !Array.from(Array.from(element.children).find((value) => value.tagName === 'IMG').classList).includes(this.colour)) {
                    possibleCoordinates.push(tempCoordinate);
                }
            }
            tempCoordinate = originalCoordinate;
        }
        return possibleCoordinates
    }
}

class Bishop extends Piece {
    constructor(colour, coordinate) {
        super('bishop', colour, coordinate)
    }

    getMoves() {
        let coordinates = []
        let possibleCoordinates = []

        let originalCoordinate = this.coordinate;
        let tempCoordinate = this.coordinate;

        while (true) {
            tempCoordinate = this.left(this.up(tempCoordinate))
            if (positions.includes(tempCoordinate)) {
                if (!coordinates.includes(tempCoordinate)) {
                    coordinates.push(tempCoordinate)
                }

                let element = document.getElementById(tempCoordinate)
                if (Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                    tempCoordinate = originalCoordinate
                    break
                }
            } else {
                tempCoordinate = originalCoordinate
                break
            }
        }

        while (true) {
            tempCoordinate = this.right(this.up(tempCoordinate))
            if (positions.includes(tempCoordinate)) {
                if (!coordinates.includes(tempCoordinate)) {
                    coordinates.push(tempCoordinate)
                }

                let element = document.getElementById(tempCoordinate)
                if (Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                    tempCoordinate = originalCoordinate
                    break
                }
            } else {
                tempCoordinate = originalCoordinate
                break
            }
        }

        while (true) {
            tempCoordinate = this.left(this.down(tempCoordinate))
            if (positions.includes(tempCoordinate)) {
                if (!coordinates.includes(tempCoordinate)) {
                    coordinates.push(tempCoordinate)
                }

                let element = document.getElementById(tempCoordinate)
                if (Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                    tempCoordinate = originalCoordinate
                    break
                }
            } else {
                tempCoordinate = originalCoordinate
                break
            }
        }

        while (true) {
            tempCoordinate = this.right(this.down(tempCoordinate))
            if (positions.includes(tempCoordinate)) {
                if (!coordinates.includes(tempCoordinate)) {
                    coordinates.push(tempCoordinate)
                }

                let element = document.getElementById(tempCoordinate)
                if (Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                    tempCoordinate = originalCoordinate
                    break
                }
            } else {
                tempCoordinate = originalCoordinate
                break
            }
        }

        coordinates.forEach((element) => {
            if (Array.from(document.getElementById(element).children).length !== 0) {
                if (!Array.from(Array.from(document.getElementById(element).children)[0].classList).includes(this.colour)) {
                    if (Array.from(Array.from(document.getElementById(element).children)[0].classList).includes('king')) {
                        /*
                        set king to check
                        Update: I believe this will never run, the king will never be open to any piece as it would be check.
                        This if statement condition is unnecessary and should be removed.
                        */
                    } else {
                        possibleCoordinates.push(element)
                    }
                }
            } else {
                possibleCoordinates.push(element)
            }
        })
        return possibleCoordinates
    }
}

class Queen extends Piece {
    constructor(colour, coordinate) {
        super('queen', colour, coordinate)
    }
}

class King extends Piece {
    constructor(colour, coordinate) {
        super('king', colour, coordinate)
    }

    getMoves() {
        let possibleCoordinates = []

        let originalCoordinate = this.coordinate;
        let tempCoordinate = originalCoordinate;

        let sequences = [['left'], ['right'], ['up'], ['down'], ['left', 'up'], ['left', 'down'], ['right', 'up'], ['right', 'down']]

        for (let sequence of sequences) {
            for (let direction of sequence) {
                tempCoordinate = this[direction](tempCoordinate);
            }

            if (positions.includes(tempCoordinate)) {
                let element = document.getElementById(tempCoordinate);
                if (!Array.from(element.children).some((value) => value.tagName === 'IMG') || !Array.from(Array.from(element.children).find((value) => value.tagName === 'IMG').classList).includes(this.colour)) {
                    possibleCoordinates.push(tempCoordinate);
                }
            }
            tempCoordinate = originalCoordinate;
        }
        return possibleCoordinates
    }
}

class Pawn extends Piece {
    constructor(colour, coordinate) {
        super('pawn', colour, coordinate)
    }

    getMoves() {
        let possibleCoordinates = []

        let originalCoordinate = this.coordinate;
        let tempCoordinate = originalCoordinate;

        if (this.colour === 'white') {
            if (originalCoordinate.charAt(1) === '2') {
                for (let x = 0; x < 2; x++) {
                    tempCoordinate = this.up(tempCoordinate)
                    if (positions.includes(tempCoordinate)) {
                        let element = document.getElementById(tempCoordinate)
                        if (!Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                            possibleCoordinates.push(tempCoordinate)
                        } else {
                            break
                        }
                    }
                }
            } else {
                tempCoordinate = this.up(tempCoordinate)
                if (positions.includes(tempCoordinate)) {
                    let element = document.getElementById(tempCoordinate)
                    if (!Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                        possibleCoordinates.push(tempCoordinate)
                    }
                }
            }
        } else if (this.colour === 'black') {
            if (originalCoordinate.charAt(1) === '7') {
                for (let x = 0; x < 2; x++) {
                    tempCoordinate = this.up(tempCoordinate)
                    if (positions.includes(tempCoordinate)) {
                        let element = document.getElementById(tempCoordinate)
                        if (!Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                            possibleCoordinates.push(tempCoordinate)
                        } else {
                            break
                        }
                    }
                }
            } else {
                tempCoordinate = this.up(tempCoordinate)
                if (positions.includes(tempCoordinate)) {
                    let element = document.getElementById(tempCoordinate)
                    if (!Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                        possibleCoordinates.push(tempCoordinate)
                    }
                }
            }
        }

        return possibleCoordinates
    }
}

function normalGame() {
    let whiteKing = new King('white', 'd5');

    // let getPieceFromId = (id) => [whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing, whiteBishop2, whiteKnight2, whiteRook2, whitePawn, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8, blackRook, blackKnight, blackBishop, blackQueen, blackKing, blackBishop2, blackKnight2, blackRook2, blackPawn, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8].filter((element) => String(element.id) === id)[0]
    let getPieceFromId = (id) => [whiteKing].filter((element) => String(element.id) === id)[0]

    let pieces = document.getElementsByClassName('pieces')

    Array.from(pieces).forEach((piece) => {
        piece.addEventListener('dragstart', (event) => {
            // console.log(event.target.id)
            event.dataTransfer.setData('text/plain', event.target.id);
        })
    })

    Array.from(squares).forEach((square) => {
        square.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        square.addEventListener('drop', (event) => {
            event.preventDefault();

            let data = event.dataTransfer.getData('text/plain');
            let element = document.getElementById(data)

            // console.log(element)
            // console.log(getPieceFromId(element.id).coordinate)
            // console.log(event.target)
            if (element.id === event.target.id) return

            // console.log(getPieceFromId(element.id))
            // console.log(getPieceFromId(element.id).getMoves())

            if (event.target.tagName.toLowerCase() === 'img') {
                if (!getPieceFromId(element.id).getMoves().includes(square.id)) return

                if (Array.from(event.target.classList).includes('king')) return

                // getPieceFromId(element.id).coordinate = square.id
                getPieceFromId(element.id).changeCoordinates(square.id)
                square.appendChild(element)
                event.target.remove()
            } else {
                if (!getPieceFromId(element.id).getMoves().includes(event.target.id)) return
                // getPieceFromId(element.id).coordinate = square.id
                getPieceFromId(element.id).changeCoordinates(square.id)
                event.target.appendChild(element);
            }
        })
    })
}

const gameContainer = document.getElementById('game_container')
gameContainer.addEventListener('contextmenu', (event) => {
    event.preventDefault()
});

normalGame()
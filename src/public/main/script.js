const squares = document.getElementsByClassName('square')
const positions = Array.from(squares, (square) => square.id)

function increment(value) {
    this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'y', 'z'];
    if (value.toLowerCase().match(/[a-z]/i)) {
        value = this.alphabet[this.alphabet.indexOf(value.toLowerCase()) + 1]
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
        this.id = Piece.id
        this.create()
    }

    toString() {
        return `${this.name} ${this.colour} ${this.coordinate} ${this.id}`;
    }

    moves() {}

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
        Piece.id ++

        console.log(Piece.id)
        piece.id = Piece.id
        piece.classList.add('pieces')
        piece.classList.add(this.name)
        piece.classList.add(this.colour)
        piece.src = `../../images/pieces/${this.colour}/${this.name}.png`;

        position.appendChild(piece);
    }
}

class Rook extends Piece {
    constructor(colour, coordinate) {
        super('rook', colour, coordinate)
    }

    moves() {
        let coordinates = []
        let possibleCoordinates = []

        let originalCoordinate = this.coordinate;
        let newCoordinate = this.coordinate;

        while (true) {
            newCoordinate = this.left(newCoordinate)
            if (positions.includes(newCoordinate)) {
                if (!coordinates.includes(newCoordinate)) {
                    coordinates.push(newCoordinate)
                }

                console.log('left', originalCoordinate, newCoordinate)

                let element = document.getElementById(newCoordinate)
                if (element.children.length > 0) {
                    newCoordinate = originalCoordinate
                    break
                }
            } else {
                newCoordinate = originalCoordinate
                break
            }
        }
        while (true) {
            newCoordinate = this.right(newCoordinate)
            if (positions.includes(newCoordinate)) {
                if (!coordinates.includes(newCoordinate)) {
                    coordinates.push(newCoordinate)
                }

                let element = document.getElementById(newCoordinate)
                if (element.children.length > 0) {
                    newCoordinate = originalCoordinate
                    break
                }
            } else {
                newCoordinate = originalCoordinate
                break
            }
        }
        while (true) {
            newCoordinate = this.up(newCoordinate)
            if (positions.includes(newCoordinate)) {
                if (!coordinates.includes(newCoordinate)) {
                    coordinates.push(newCoordinate)
                }

                console.log('up', originalCoordinate, newCoordinate)

                let element = document.getElementById(newCoordinate)
                if (element.children.length > 0) {
                    newCoordinate = originalCoordinate
                    break
                }
            } else {
                newCoordinate = originalCoordinate
                break
            }
        }
        while (true) {
            newCoordinate = this.down(newCoordinate)
            if (positions.includes(newCoordinate)) {
                if (!coordinates.includes(newCoordinate)) {
                    coordinates.push(newCoordinate)
                }

                console.log('down', originalCoordinate, newCoordinate)

                let element = document.getElementById(newCoordinate)
                if (element.children.length > 0) {
                    newCoordinate = originalCoordinate
                    break
                }
            } else {
                newCoordinate = originalCoordinate
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
}

class Bishop extends Piece {
    constructor(colour, coordinate) {
        super('bishop', colour, coordinate)
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
}

class Pawn extends Piece {
    constructor(colour, coordinate) {
        super('pawn', colour, coordinate)
    }
}

function normalGame() {
    let whiteRook = new Rook('white', 'a3');
    let whiteKnight = new Knight('white', 'b1');
    let whiteBishop = new Bishop('white', 'c1');
    let whiteQueen = new Queen('white', 'd1');
    let whiteKing = new King('white', 'e1');
    let whiteBishop2 = new Bishop('white', 'f1');
    let whiteKnight2 = new Knight('white', 'g1');
    let whiteRook2 = new Rook('white', 'h1');
    let whitePawn = new Pawn('white', 'a2');
    let whitePawn2 = new Pawn('white', 'b2');
    let whitePawn3 = new Pawn('white', 'c2');
    let whitePawn4 = new Pawn('white', 'd2');
    let whitePawn5 = new Pawn('white', 'e2');
    let whitePawn6 = new Pawn('white', 'f2');
    let whitePawn7 = new Pawn('white', 'g2');
    let whitePawn8 = new Pawn('white', 'h2');
    let blackRook = new Rook('black', 'a8');
    let blackKnight = new Knight('black', 'b8');
    let blackBishop = new Bishop('black', 'c8');
    let blackQueen = new Queen('black', 'd8');
    let blackKing = new King('black', 'e8');
    let blackBishop2 = new Bishop('black', 'f8');
    let blackKnight2 = new Knight('black', 'g8');
    let blackRook2 = new Rook('black', 'h8');
    let blackPawn = new Pawn('black', 'a7');
    let blackPawn2 = new Pawn('black', 'b7');
    let blackPawn3 = new Pawn('black', 'c7');
    let blackPawn4 = new Pawn('black', 'd7');
    let blackPawn5 = new Pawn('black', 'e7');
    let blackPawn6 = new Pawn('black', 'f7');
    let blackPawn7 = new Pawn('black', 'g7');
    let blackPawn8 = new Pawn('black', 'h7');

    let piecesArray = [whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing, whiteBishop2, whiteKnight2, whiteRook2, whitePawn, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8, blackRook, blackKnight, blackBishop, blackQueen, blackKing, blackBishop2, blackKnight2, blackRook2, blackPawn, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8];

    piecesArray.forEach((element) => {
        console.log(element.id)
        // element.create()
    })

    console.log(whiteRook.moves())
    console.log(piecesArray)
    console.log(piecesArray.map((element) => element.id))

    let pieces = document.getElementsByClassName('pieces')
    Array.from(pieces).forEach((element) => {
        element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
        })
    })

    Array.from(squares).forEach((element) => {
        element.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        element.addEventListener('drop', (event) => {
            event.preventDefault();

            let data = event.dataTransfer.getData('text/plain');
            let element = document.getElementById(data)

            if (element.id === event.target.id) return

            if (!whiteRook.moves().includes(event.target.id)) return
            
                if (event.target.tagName.toLowerCase() === 'img') {
                    if (Array.from(event.target.classList).includes('king')) return

                    whiteRook.coordinate = event.target.parentNode.id
                    event.target.parentNode.appendChild(element)
                    event.target.remove()
                } else {
                    whiteRook.coordinate = event.target.id
                    event.target.appendChild(element);
                }
        })
    })
}

normalGame()
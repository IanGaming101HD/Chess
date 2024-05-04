class Game {
    constructor() {
        this.players_turn = 'white'
        this.GameOver = false
        this.normalGame()
        this.method = new Method()
    }

    createBoard() {
        console.log('hi')
    }

    normalGame() {
        let whiteRook = new Rook('white', 'a1');
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

        let getPieceFromId = (id) => [whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing, whiteBishop2, whiteKnight2, whiteRook2, whitePawn, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8, blackRook, blackKnight, blackBishop, blackQueen, blackKing, blackBishop2, blackKnight2, blackRook2, blackPawn, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8].find((element) => String(element.id) === id)
        let pieces = document.getElementsByClassName('piece');
        let previousSquare;

        Array.from(pieces).forEach((piece) => {
            piece.addEventListener('dragstart', (event) => {
                let square = piece.parentElement;
                if (square.classList.contains('white-square')) {
                    square.style.backgroundColor = '#F6EB71'
                } else if (square.classList.contains('black-square')) {
                    square.style.backgroundColor = '#DBC34A'
                }
                event.dataTransfer.setData('text/plain', event.target.id);
            })

            piece.addEventListener('dragend', (event) => {
                let squares = Array.from(document.getElementsByClassName('square'))
                squares.forEach((square) => {
                    if (this.method.convertRgbToHex(getComputedStyle(square).backgroundColor) === '#F6EB71') {
                        square.style.backgroundColor = this.method.convertRgbToHex(getComputedStyle(document.querySelector('.white-square')).backgroundColor)
                    } else if (this.method.convertRgbToHex(getComputedStyle(square).backgroundColor) === '#DBC34A') {
                        square.style.backgroundColor = this.method.convertRgbToHex(getComputedStyle(document.querySelector('.black-square')).backgroundColor)
                    }
                })
                let square = piece.parentElement;
                if (square.classList.contains('white-square')) {
                    square.style.backgroundColor = '#F6EB71'
                } else if (square.classList.contains('black-square')) {
                    square.style.backgroundColor = '#DBC34A'
                }

                if (previousSquare) {
                    if (previousSquare.classList.contains('white-square')) {
                        previousSquare.style.backgroundColor = '#F6EB71'
                    } else if (previousSquare.classList.contains('black-square')) {
                        previousSquare.style.backgroundColor = '#DBC34A'
                    }
                }
            })
        })

        Array.from(squares).forEach((square) => {
            square.addEventListener('dragover', (event) => {
                square.style.borderColor = '#ffffff'
                event.preventDefault();
            });

            square.addEventListener('dragleave', (event) => {
                square.style.borderColor = 'transparent'
                event.preventDefault();
            })

            square.addEventListener('drop', (event) => {
                event.preventDefault();
                square.style.borderColor = 'transparent'

                let pieceId = event.dataTransfer.getData('text/plain');
                if (pieceId === event.target.id) return;
                let piece = document.getElementById(pieceId)

                if (!getPieceFromId(pieceId).getMoves().includes(square.id) || Array.from(piece.classList).includes('king') || Array.from(square.children).find((child) => Array.from(child.classList).includes('king'))) return
                // maybe change this condition (the king condition part) when you added "cant kill king" to all pieces

                previousSquare = piece.parentElement

                if (square.classList.contains('white-square')) {
                    square.style.backgroundColor = '#F6EB71'
                } else if (square.classList.contains('black-square')) {
                    square.style.backgroundColor = '#DBC34A'
                }
                let enemyPiece = Array.from(square.children).find((child) => child.classList.contains('piece'))
                if (enemyPiece) {
                    enemyPiece.remove()
                }

                getPieceFromId(pieceId).updateCoordinate(square.id)
                square.appendChild(piece)
            })
        })

        // I was confused whilst making this, make this right
        // let observer = new MutationObserver((mutations, observer) => {
        //     mutations.forEach((mutation) => {
        //         if (mutation.type === 'childList') {
        //         // if ([mutation.type, observer.type].includes('childList') && observer.target) {
        //             function getPieceCharacter(piece) {
        //                 let chararacter = ''

        //                 if (!piece.classList.contains('pawn')) {
        //                     chararacter = Array.from(piece.classList).find((x) => !['piece', 'black', 'white'].includes(x)).charAt(0).toUpperCase()
        //                 }

        //                 return chararacter
        //             }
        //             let piece = mutation.target
        //             let notation = `${getPieceCharacter(piece)}.id`

        //             if (game.players_turn ===  'white') {
        //                 notations.push([notation])
        //             } else if (game.players_turn ===  'black') {
        //                 notations[notations.length - 1].push(notation)
        //             }
        //             console.log('hiiiiiiii', notations)
        //         }
        //     })
        // });
        // observer.observe(gameContainer, {
        //     attributes: true,
        //     childList: true,
        //     subtree: true
        // });
        // observer.disconnect();
    }
}

class Method {
    constructor() {
        this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'y', 'z'];
    }

    increment(value) {
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

    decrement(value) {
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

    convertRgbToHex(rgba) {
        let hex = `#${rgba
      .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
      .slice(1)
      .map((n, i) =>
        (i === 3?Math.round(parseFloat(n) * 255) : parseFloat(n))
          .toString(16)
          .padStart(2, '0')
          .replace('NaN', '')
      )
      .join('')}`.toUpperCase();
        return hex;
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
        this.method = new Method()
        this.create()
    }

    toString() {
        return `${this.name} ${this.colour} ${this.coordinate} ${this.id}`;
    }

    getMoves() {}

    updateCoordinate(newCoordinate) {
        this.coordinate = newCoordinate
    }

    left(coordinate) {
        return this.method.decrement(coordinate[0]) + coordinate[1]
    }
    right(coordinate) {
        return this.method.increment(coordinate[0]) + coordinate[1]
    }
    up(coordinate) {
        return coordinate[0] + this.method.increment(coordinate[1])
    }
    down(coordinate) {
        return coordinate[0] + this.method.decrement(coordinate[1])
    }

    create() {
        if (!positions.includes(this.coordinate)) return

        let position = document.getElementById(this.coordinate)
        let piece = document.createElement('img');

        piece.id = String(Piece.id)
        piece.classList.add('piece')
        piece.classList.add(this.name)
        piece.classList.add(this.colour)
        piece.src = `./public/main/images/pieces/${this.colour}/${this.name}.png`;

        Piece.id++

        position.appendChild(piece);
    }
}

class Rook extends Piece {
    constructor(colour, coordinate) {
        super('rook', colour, coordinate);
        this.canCastle = true
    }

    getMoves() {
        let directions = ['left', 'right', 'up', 'down'];
        let coordinates = [];
        let possibleCoordinates = [];
        let originalCoordinate = this.coordinate;

        for (let direction of directions) {
            let tempCoordinate = originalCoordinate;

            while (true) {
                tempCoordinate = this[direction](tempCoordinate);

                if (!positions.includes(tempCoordinate)) {
                    tempCoordinate = originalCoordinate;
                    break;
                }

                coordinates.push(tempCoordinate);

                let element = document.getElementById(tempCoordinate);
                if (Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                    tempCoordinate = originalCoordinate;
                    break;
                }
            }
        }

        coordinates.forEach((element) => {
            const children = Array.from(document.getElementById(element).children);
            if (!children.length || !children[0].classList.contains(this.colour)) {
                possibleCoordinates.push(element);
            }
        });

        return possibleCoordinates;
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

        let sequences = [
            ['up', 'up', 'left'],
            ['up', 'up', 'right'],
            ['down', 'down', 'left'],
            ['down', 'down', 'right'],
            ['left', 'left', 'up'],
            ['left', 'left', 'down'],
            ['right', 'right', 'up'],
            ['right', 'right', 'down']
        ]

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
        super('bishop', colour, coordinate);
    }

    getMoves() {
        let sequences = [
            ['left', 'up'],
            ['right', 'up'],
            ['left', 'down'],
            ['right', 'down']
        ];

        let coordinates = [];
        let possibleCoordinates = [];
        let originalCoordinate = this.coordinate;

        for (let sequence of sequences) {
            let tempCoordinate = originalCoordinate;

            while (true) {
                tempCoordinate = this[sequence[0]](this[sequence[1]](tempCoordinate));
                if (!positions.includes(tempCoordinate)) {
                    tempCoordinate = originalCoordinate;
                    break;
                }
                coordinates.push(tempCoordinate);

                let element = document.getElementById(tempCoordinate);
                if (Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                    tempCoordinate = originalCoordinate;
                    break;
                }
            }
        }

        coordinates.forEach((element) => {
            if (!Array.from(document.getElementById(element).children).some((value) => value.tagName === 'IMG' && value.classList.contains(this.colour))) {
                possibleCoordinates.push(element);
            }
        });

        return possibleCoordinates;
    }
}

class Queen extends Piece {
    constructor(colour, coordinate) {
        super('queen', colour, coordinate)
    }

    getMoves() {
        let sequences = [
            ['left'],
            ['right'],
            ['up'],
            ['down'],
            ['left', 'up'],
            ['right', 'up'],
            ['left', 'down'],
            ['right', 'down']
        ];

        let coordinates = [];
        let possibleCoordinates = [];
        let originalCoordinate = this.coordinate;

        for (let sequence of sequences) {
            let tempCoordinate = originalCoordinate;

            while (true) {
                if (sequence.length === 1) {
                    tempCoordinate = this[sequence](tempCoordinate);
                } else if (sequence.length === 2) {
                    tempCoordinate = this[sequence[0]](this[sequence[1]](tempCoordinate));
                }
                if (!positions.includes(tempCoordinate)) {
                    tempCoordinate = originalCoordinate;
                    break;
                }
                coordinates.push(tempCoordinate);

                let element = document.getElementById(tempCoordinate);
                if (Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                    tempCoordinate = originalCoordinate;
                    break;
                }
            }
        }

        coordinates.forEach((element) => {
            if (!Array.from(document.getElementById(element).children).some((value) => value.tagName === 'IMG' && value.classList.contains(this.colour))) {
                possibleCoordinates.push(element);
            }
        });

        return possibleCoordinates;
    }
}

class King extends Piece {
    constructor(colour, coordinate) {
        super('king', colour, coordinate)
        this.canCastle = true
    }

    getMoves() {
        let possibleCoordinates = []

        let originalCoordinate = this.coordinate;
        let tempCoordinate = originalCoordinate;

        let sequences = [
            ['left'],
            ['right'],
            ['up'],
            ['down'],
            ['left', 'up'],
            ['left', 'down'],
            ['right', 'up'],
            ['right', 'down']
        ]

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
        let directions = ['left', 'right']

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
                tempCoordinate = originalCoordinate;
            } else {
                tempCoordinate = this.up(tempCoordinate)
                if (positions.includes(tempCoordinate)) {
                    let element = document.getElementById(tempCoordinate)
                    if (!Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                        possibleCoordinates.push(tempCoordinate)
                        tempCoordinate = originalCoordinate;
                    }
                }
                directions.forEach((direction) => {
                    tempCoordinate = this[direction](this.up(originalCoordinate))

                    if (positions.includes(tempCoordinate)) {
                        let element = document.getElementById(tempCoordinate)
                        if (Array.from(element.children).find((value) => value.tagName === 'IMG')?!Array.from(Array.from(element.children).find((value) => value.tagName === 'IMG')?.classList).includes(this.colour) : false) {
                            possibleCoordinates.push(tempCoordinate)
                            tempCoordinate = originalCoordinate;
                        }
                    }
                })
                tempCoordinate = originalCoordinate;
            }
        } else if (this.colour === 'black') {
            if (originalCoordinate.charAt(1) === '7') {
                for (let x = 0; x < 2; x++) {
                    tempCoordinate = this.down(tempCoordinate)
                    if (positions.includes(tempCoordinate)) {
                        let element = document.getElementById(tempCoordinate)
                        if (!Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                            possibleCoordinates.push(tempCoordinate)
                        } else {
                            break
                        }
                    }
                }
                tempCoordinate = originalCoordinate;
            } else {
                tempCoordinate = this.down(tempCoordinate)
                if (positions.includes(tempCoordinate)) {
                    let element = document.getElementById(tempCoordinate)
                    if (!Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                        possibleCoordinates.push(tempCoordinate)
                    }
                }
                directions.forEach((direction) => {
                    tempCoordinate = this[direction](this.down(originalCoordinate))

                    if (positions.includes(tempCoordinate)) {
                        let element = document.getElementById(tempCoordinate)
                        if (Array.from(element.children).find((value) => value.tagName === 'IMG')?!Array.from(Array.from(element.children).find((value) => value.tagName === 'IMG')?.classList).includes(this.colour) : false) {
                            possibleCoordinates.push(tempCoordinate)
                            tempCoordinate = originalCoordinate;
                        }
                    }
                })
                tempCoordinate = originalCoordinate;
            }
        }
        return possibleCoordinates
    }
}

// function testGame() {
//     let whiteBishop = new Bishop('white', 'd5');
//     let getPieceFromId = (id) => [whiteBishop].find((element) => String(element.id) === id)
//     let pieces = document.getElementsByClassName('piece')

//     Array.from(pieces).forEach((piece) => {
//         piece.addEventListener('dragstart', (event) => {
//             // console.log(event.target.id)
//             event.dataTransfer.setData('text/plain', event.target.id);
//         })
//     })

//     Array.from(squares).forEach((square) => {
//         square.addEventListener('dragover', (event) => {
//             event.preventDefault();
//         });

//         square.addEventListener('drop', (event) => {
//             event.preventDefault();

//             let data = event.dataTransfer.getData('text/plain');
//             let element = document.getElementById(data)
//             if (element.id === event.target.id) return

//             if (event.target.tagName.toLowerCase() === 'img') {
//                 if (!getPieceFromId(element.id).getMoves().includes(square.id)) return

//                 if (Array.from(event.target.classList).includes('king')) return

//                 getPieceFromId(element.id).updateCoordinate(square.id)
//                 square.appendChild(element)
//                 event.target.remove()
//             } else {
//                 if (!getPieceFromId(element.id).getMoves().includes(event.target.id)) return
//                 getPieceFromId(element.id).updateCoordinate(square.id)
//                 event.target.appendChild(element);
//             }
//         })
//     })
// }

const squares = document.getElementsByClassName('square')
const positions = Array.from(squares, (square) => square.id)
const gameContainer = document.getElementById('game-container')
const game = new Game()
const notations = []
// testGame()

gameContainer.addEventListener('contextmenu', (event) => {
    event.preventDefault()
});
class Method {
    constructor() {
        this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'y', 'z'];
    }
    increment(value) {
        if (value.toLowerCase().match(/[a-z]/i)) {
            value = this.alphabet[this.alphabet.indexOf(value.toLowerCase()) + 1];
            if (!value) {
                value = this.alphabet[0];
            }
            return value;
        } else {
            value++;
            return value;
        }
    }
    decrement(value) {
        if (value.toLowerCase().match(/[a-z]/i)) {
            value = this.alphabet[this.alphabet.indexOf(value.toLowerCase()) - 1];
            if (!value) {
                value = this.alphabet[this.alphabet.length - 1];
            }
            return value;
        } else {
            value--;
            return value;
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

class Game {
    constructor() {
        this.players_turn = 'white';
        this.GameOver = false;
        this.defaultGame();
        this.method = new Method();
    }
    createBoard() {
        console.log('hi');
    }
    defaultGame() {
        let whiteRook = new Rook('white', 'a1');
        let whiteKing = new King('white', 'e1');
        let whiteRook2 = new Rook('white', 'h1');
        let whitePawn = new Pawn('white', 'a2');

        let piecesObjects = [whiteRook, whiteKing, whiteRook2, whitePawn];
        let getPieceById = (id) => piecesObjects.find((element) => String(element.id) === id);
        let pieces = Array.from(document.getElementsByClassName('piece'));
        let previousSquare;

        let getOverlays = () => {
            let possibleMovesOverlays = Array.from(document.getElementsByClassName('possible-move'))
            let possibleCapturesOverlays = Array.from(document.getElementsByClassName('possible-capture'))
            let overlays = possibleMovesOverlays.concat(possibleCapturesOverlays)
            return overlays
        }
        let createOverlays = (id) => {
            let pieceObject = getPieceById(id)
            let possibleCoordinates = pieceObject.getCoordinates()
            possibleCoordinates.forEach((coordinate) => {
                let square = document.getElementById(coordinate)
                let overlay = document.createElement('div')
                overlay.classList.add(Array.from(square.children).some((element) => element.classList.contains('piece')) ? 'possible-capture' : 'possible-move')
                square.append(overlay)
            })
        }
        let removeOverlays = () => {
            let overlays = getOverlays()
            overlays.forEach((overlay) => overlay.remove())
        }
        let addHighlights = (square) => {
            if (square.classList.contains('white-square')) {
                square.style.backgroundColor = '#F6EB71';
            } else if (square.classList.contains('black-square')) {
                square.style.backgroundColor = '#DBC34A';
            }
        }
        let removeHighlights = (squares) => {
            squares.forEach((square) => {
                if (this.method.convertRgbToHex(getComputedStyle(square).backgroundColor) === '#F6EB71') {
                    let whiteSquares = document.querySelector('.white-square')
                    square.style.backgroundColor = this.method.convertRgbToHex(getComputedStyle(whiteSquares).backgroundColor);
                } else if (this.method.convertRgbToHex(getComputedStyle(square).backgroundColor) === '#DBC34A') {
                    let blackSquares = document.querySelector('.black-square')
                    square.style.backgroundColor = this.method.convertRgbToHex(getComputedStyle(blackSquares).backgroundColor);
                }
            });
        }
        pieces.forEach((piece) => {
            piece.addEventListener('dragstart', (event) => {
                let square = piece.parentElement;
                let overlays = getOverlays()
                addHighlights(square)
                if (overlays.length > 0) {
                    removeOverlays()
                }
                createOverlays(piece.id)
                event.dataTransfer.setData('text/plain', event.target.id);
            });
            piece.addEventListener('dragend', (event) => {
                let newSquare = piece.parentElement;
                removeHighlights(squares)
                addHighlights(newSquare)
                if (previousSquare) {
                    addHighlights(previousSquare)
                }
            });
        });
        squares.forEach((square) => {
            Object.entries({
                dragover: '#FFFFFF',
                dragleave: 'transparent'
            }).forEach(([key, value]) => {
                square.addEventListener(key, (event) => {
                    square.style.borderColor = value;
                    event.preventDefault();
                });
            })
            square.addEventListener('drop', (event) => {
                event.preventDefault();
                square.style.borderColor = 'transparent';

                let pieceId = event.dataTransfer.getData('text/plain');
                if (pieceId === event.target.id) return;

                let piece = document.getElementById(pieceId);
                if (!piece) return;

                let colour = piece.classList.contains('white') ? 'white' : 'black';
                let pieceObject = getPieceById(pieceId);
                let possibleMoves = pieceObject.getCoordinates()

                if ((game.players_turn === 'white' && piece.classList.contains('black')) || (game.players_turn === 'black' && piece.classList.contains('white')) || !possibleMoves.includes(square.id) || Array.from(piece.classList).includes('king') || Array.from(square.children).find((child) => Array.from(child.classList).includes('king'))) return;
                removeOverlays()

                let king = Array.from(document.getElementsByClassName('king')).find((element) => element.classList.contains(colour))
                let kingObject = getPieceById(king.id)
                previousSquare = piece.parentElement;
                square.appendChild(piece);
                let check = kingObject.isCheck(piecesObjects, colour);
                if (check) {
                    previousSquare.appendChild(piece);
                    return;
                };
                if (piece.classList.contains('pawn')) {
                    pieceObject.checkPromotion(piece, colour, square, piecesObjects);
                }
                addHighlights(square)

                let enemyPiece = Array.from(square.children).find((child) => child.classList.contains('piece'));
                if (enemyPiece) {
                    enemyPiece.remove();
                }
                square.appendChild(piece);
                pieceObject.updateCoordinate(square.id);
                // game.endTurn();
            });
        });
    }
    endTurn() {
        if (this.players_turn === 'white') {
            this.players_turn = 'black';
        } else if (this.players_turn === 'black') {
            this.players_turn = 'white';
        }
    }
}

class Piece {
    static id = 0;
    constructor(name, colour, coordinate, id) {
        this.name = name;
        this.colour = colour;
        this.coordinate = coordinate;
        this.id = id;
        this.method = new Method();
        this.create();
    }
    toString() {
        return `${this.name} ${this.colour} ${this.coordinate} ${this.id}`;
    }
    updateCoordinate(newCoordinate) {
        this.coordinate = newCoordinate;
    }
    left(coordinate) {
        return this.method.decrement(coordinate[0]) + coordinate[1];
    }
    right(coordinate) {
        return this.method.increment(coordinate[0]) + coordinate[1];
    }
    up(coordinate) {
        return coordinate[0] + this.method.increment(coordinate[1]);
    }
    down(coordinate) {
        return coordinate[0] + this.method.decrement(coordinate[1]);
    }
    create() {
        if (!squares.some((value) => value.id === this.coordinate)) return;
        let position = document.getElementById(this.coordinate);
        let piece = document.createElement('img');
        if (!this.id) {
            Piece.id += 1;
            this.id = Piece.id;
        }
        piece.id = this.id;
        piece.classList.add('piece');
        piece.classList.add(this.name);
        piece.classList.add(this.colour);
        piece.src = `./public/main/images/pieces/${this.colour}/${this.name}.png`;

        position.appendChild(piece);
    }
}

class King extends Piece {
    constructor(colour, coordinate, id) {
        super('king', colour, coordinate, id);
        this.canCastle = true;
    }
    getCoordinates() {
        let possibleCoordinates = [];

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
        ];

// Queen reference code
// ----------------------
// let possibleCoordinates = [];
// let coordinates = [];
// let originalCoordinate = this.coordinate;

// sequences((sequence) => {
//     let tempCoordinate = originalCoordinate;
//     while (true) {
//         tempCoordinate = sequence.length === 1 ? this[sequence](tempCoordinate) : tempCoordinate = this[sequence[0]](this[sequence[1]](tempCoordinate));
//         if (!squares.some((value) => value.id === tempCoordinate)) {
//             tempCoordinate = originalCoordinate;
//             break;
//         }
//         coordinates.push(tempCoordinate);

//         let element = document.getElementById(tempCoordinate);
//         if (Array.from(element.children).some((value) => value.classList.contains('piece'))) {
//             tempCoordinate = originalCoordinate;
//             break;
//         }
//     }
// })
// coordinates.forEach((element) => {
//     if (!Array.from(document.getElementById(element).children).some((value) => value.classList.contains('piece') && value.classList.contains(this.colour))) {
//         possibleCoordinates.push(element);
//     }
// });
// return possibleCoordinates;

        sequences.forEach((sequence) => {
            sequence.forEach((direction) => {
                tempCoordinate = this[direction](tempCoordinate);
            })

            if (squares.some((value) => value.id === tempCoordinate)) {
                let element = document.getElementById(tempCoordinate);
                if (Array.from(element.children).some(child => child.classList.contains('piece') && !child.classList.contains(this.colour))) {
                    possibleCoordinates.push(tempCoordinate);
                }
            }
            tempCoordinate = originalCoordinate;
        })
        // castling

        // if (this.canCastle) {
        //     let rooks = Array.from(document.getElementsByClassName('rook'));
        //     rooks.forEach((rook) => {
        //         let rookObject = getPieceById(rook)
        //         let possibleMoves = rookObject.getMoves()
        //         if (rookObject.canCastle && possibleMoves.includes(this.coordinate)) {
        //             if (rookObject.coordinate < this.coordinate) {
        //                 tempCoordinate = this.coordinate
        //                 for (let x = 0; x < 2;) {
        //                     tempCoordinate = this.left(tempCoordinate)
        //                 }
        //                 this.updateCoordinate(tempCoordinate)
        //                 tempCoordinate = rookObject.coordinate
        //                 for (let x = 0; x < 3;) {
        //                     tempCoordinate = this.right(tempCoordinate)
        //                 }
        //                 rookObject.updateCoordinate(tempCoordinate)
        //             } else if (rookObject.coordinate > this.coordinate) {
        //                 if (rookObject.coordinate < this.coordinate) {
        //                     tempCoordinate = this.coordinate
        //                     for (let x = 0; x < 2;) {
        //                         tempCoordinate = this.right(tempCoordinate)
        //                     }
        //                     this.updateCoordinate(tempCoordinate)
        //                     tempCoordinate = rookObject.coordinate
        //                     for (let x = 0; x < 2;) {
        //                         tempCoordinate = this.left(tempCoordinate)
        //                     }
        //                     rookObject.updateCoordinate(tempCoordinate)
        //                 }
        //             }
        //         }
        //     })
        // }
        return possibleCoordinates;
    }
    isCheck(piecesObjects, colour) {
        let oppositeColour = colour === 'white' ? 'black' : 'white';
        let check = piecesObjects.filter((pieceObject) => pieceObject.colour === oppositeColour).some((pieceObject) => {
            let possibleMoves = pieceObject.getCoordinates()
            if (possibleMoves.includes(this.coordinate)) return true;
        });
        return check
    }
}

class Queen extends Piece {
    constructor(colour, coordinate, id) {
        super('queen', colour, coordinate, id);
    }
    getCoordinates() {
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
        let possibleCoordinates = [];
        let coordinates = [];
        let originalCoordinate = this.coordinate;

        sequences.forEach((sequence) => {
            let tempCoordinate = originalCoordinate;
            while (true) {
                tempCoordinate = sequence.length === 1 ? this[sequence](tempCoordinate) : tempCoordinate = this[sequence[0]](this[sequence[1]](tempCoordinate));
                if (!squares.some((value) => value.id === tempCoordinate)) {
                    tempCoordinate = originalCoordinate;
                    break;
                }
                coordinates.push(tempCoordinate);

                let element = document.getElementById(tempCoordinate);
                if (Array.from(element.children).some((value) => value.classList.contains('piece'))) {
                    tempCoordinate = originalCoordinate;
                    break;
                }
            }
        })
        coordinates.forEach((element) => {
            if (!Array.from(document.getElementById(element).children).some((value) => value.classList.contains('piece') && value.classList.contains(this.colour))) {
                possibleCoordinates.push(element);
            }
        });
        return possibleCoordinates;
    }
}

class Rook extends Piece {
    constructor(colour, coordinate, id) {
        super('rook', colour, coordinate, id);
        this.canCastle = true;
    }
    getCoordinates() {
        let directions = ['left', 'right', 'up', 'down'];
        let possibleCoordinates = [];
        let coordinates = [];
        let originalCoordinate = this.coordinate;

        directions.forEach((direction) => {
            let tempCoordinate = originalCoordinate;
            while (true) {
                tempCoordinate = this[direction](tempCoordinate)
                if (!squares.some((value) => value.id === tempCoordinate)) {
                    tempCoordinate = originalCoordinate;
                    break;
                }
                coordinates.push(tempCoordinate);

                let element = document.getElementById(tempCoordinate);
                if (Array.from(element.children).some((value) => value.classList.contains('piece'))) {
                    tempCoordinate = originalCoordinate;
                    break;
                }
            }
        })
        coordinates.forEach((element) => {
            if (!Array.from(document.getElementById(element).children).some((value) => value.classList.contains('piece') && value.classList.contains(this.colour))) {
                possibleCoordinates.push(element);
            }
        });
        return possibleCoordinates;
    }
}

class Bishop extends Piece {
    constructor(colour, coordinate, id) {
        super('bishop', colour, coordinate, id);
    }
    getCoordinates() {
        let sequences = [
            ['left', 'up'],
            ['right', 'up'],
            ['left', 'down'],
            ['right', 'down']
        ];
        let coordinates = [];
        let possibleCoordinates = [];
        let originalCoordinate = this.coordinate;

        sequences((sequence) => {
            let tempCoordinate = originalCoordinate;

            while (true) {
                tempCoordinate = this[sequence[0]](this[sequence[1]](tempCoordinate));
                if (!squares.some((value) => value.id === tempCoordinate)) {
                    tempCoordinate = originalCoordinate;
                    break;
                }
                coordinates.push(tempCoordinate);

                let element = document.getElementById(tempCoordinate);
                if (Array.from(element.children).some((value) => value.classList.contains('piece'))) {
                    tempCoordinate = originalCoordinate;
                    break;
                }
            }
        })

        coordinates.forEach((element) => {
            if (!Array.from(document.getElementById(element).children).some((value) => value.classList.contains('piece') && value.classList.contains(this.colour))) {
                possibleCoordinates.push(element);
            }
        });

        return possibleCoordinates;
    }
}

class Knight extends Piece {
    constructor(colour, coordinate, id) {
        super('knight', colour, coordinate, id);
    }
    getCoordinates() {
        let possibleCoordinates = [];
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
        ];

        sequences((sequence) => {
            sequence.forEach((direction) => {
                tempCoordinate = this[direction](tempCoordinate);
            })

            if (squares.some((value) => value.id === tempCoordinate)) {
                let element = document.getElementById(tempCoordinate);
                if (!Array.from(element.children).find(child => child.classList.contains('piece') && child.classList.contains(this.colour))) {
                    possibleCoordinates.push(tempCoordinate);
                }
            }
            tempCoordinate = originalCoordinate;
        })
        return possibleCoordinates;
    }
}

class Pawn extends Piece {
    constructor(colour, coordinate, id) {
        super('pawn', colour, coordinate, id);
    }
    getCoordinates() {
        let possibleCoordinates = [];
        let originalCoordinate = this.coordinate;
        let tempCoordinate = originalCoordinate;
        let directions = ['left', 'right'];

        if (this.colour === 'white') {
            if (originalCoordinate.charAt(1) === '2') {
                for (let x = 0; x < 2; x++) {
                    tempCoordinate = this.up(tempCoordinate);
                    if (squares.some((value) => value.id === tempCoordinate)) {
                        let element = document.getElementById(tempCoordinate);
                        if (!Array.from(element.children).some((value) => value.classList.contains('piece'))) {
                            possibleCoordinates.push(tempCoordinate);
                        } else {
                            break;
                        }
                    }
                }
                tempCoordinate = originalCoordinate;
            } else {
                tempCoordinate = this.up(tempCoordinate);
                if (squares.some((value) => value.id === tempCoordinate)) {
                    let element = document.getElementById(tempCoordinate);
                    if (!Array.from(element.children).some((value) => value.classList.contains('piece'))) {
                        possibleCoordinates.push(tempCoordinate);
                        tempCoordinate = originalCoordinate;
                    }
                }
            }
            directions.forEach((direction) => {
                tempCoordinate = this[direction](this.up(originalCoordinate));

                if (squares.some((value) => value.id === tempCoordinate)) {
                    let element = document.getElementById(tempCoordinate);
                    if (Array.from(element.children).some(child => child.classList.contains('piece') && !child.classList.contains(this.colour))) {
                        possibleCoordinates.push(tempCoordinate);
                        tempCoordinate = originalCoordinate;
                    }
                }
            });
            tempCoordinate = originalCoordinate;
        } else if (this.colour === 'black') {
            if (originalCoordinate.charAt(1) === '7') {
                for (let x = 0; x < 2; x++) {
                    tempCoordinate = this.down(tempCoordinate);
                    if (squares.some((value) => value.id === tempCoordinate)) {
                        let element = document.getElementById(tempCoordinate);
                        if (!Array.from(element.children).some((value) => value.classList.contains('piece'))) {
                            possibleCoordinates.push(tempCoordinate);
                        } else {
                            break;
                        }
                    }
                }
                tempCoordinate = originalCoordinate;
            } else {
                tempCoordinate = this.down(tempCoordinate);
                if (squares.some((value) => value.id === tempCoordinate)) {
                    let element = document.getElementById(tempCoordinate);
                    if (!Array.from(element.children).some((value) => value.classList.contains('piece'))) {
                        possibleCoordinates.push(tempCoordinate);
                    }
                }
            }
            directions.forEach((direction) => {
                tempCoordinate = this[direction](this.down(originalCoordinate));

                if (squares.some((value) => value.id === tempCoordinate)) {
                    let element = document.getElementById(tempCoordinate);
                    if (Array.from(element.children).some(child => child.classList.contains('piece') && !child.classList.contains(this.colour))) {
                        possibleCoordinates.push(tempCoordinate);
                        tempCoordinate = originalCoordinate;
                    }
                }
            });
            tempCoordinate = originalCoordinate;
        }
        return possibleCoordinates;
    }
    checkPromotion(piece, colour, square, piecesObjects) {
        let row = colour === 'white' ? '8' : '1';
        if (square.id.charAt(1) !== row) return;

        let hiddenContainer = document.getElementById('hidden-container');
        hiddenContainer.style.visibility = 'visible';
        hiddenContainer.style.marginTop = colour === 'white' ? '0px' : '-225px';
        square.appendChild(hiddenContainer);

        let promotionOptions = {
            'hidden-option-queen': Queen,
            'hidden-option-knight': Knight,
            'hidden-option-rook': Rook,
            'hidden-option-bishop': Bishop
        };

        Object.entries(promotionOptions).forEach(([optionId, classType]) => {
            let optionElement = document.getElementById(optionId);
            optionElement.addEventListener('click', () => {
                let pieceId = Number(piece.id);
                piece.remove();

                let newPiece = new classType(piece.classList.contains('white') ? 'white' : 'black', square.id, pieceId);
                let element = document.getElementById(piece.id);
                element && element.addEventListener('dragstart', (event) => {
                    event.dataTransfer.setData('text/plain', event.target.id);
                });
                piecesObjects[pieceId - 1] = newPiece;
                document.getElementById('hidden-container').style.visibility = 'hidden';
            });
        });

        let hiddenCloseButton = document.getElementById('hidden-close-button');
        hiddenCloseButton.addEventListener('click', () => {
            hiddenContainer.style.visibility = 'hidden';
        });
    }
}
let squares = Array.from(document.getElementsByClassName('square'));
let gameContainer = document.getElementById('game-container');
let game = new Game();
let notations = [];

gameContainer.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});
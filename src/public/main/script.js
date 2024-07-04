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
        this.pieces_objects = []
        // this.game_over = false;
        this.method = new Method();
        this.defaultGame();
    }

    createBoard() {
        console.log('hi');
    }

    getPieceById(id) {
        return this.pieces_objects.find((element) => String(element.id) === id)
    }

    defaultGame() {
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

        this.pieces_objects = [whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing, whiteBishop2, whiteKnight2, whiteRook2, whitePawn, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8, blackRook, blackKnight, blackBishop, blackQueen, blackKing, blackBishop2, blackKnight2, blackRook2, blackPawn, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8];

        let pieces = Array.from(document.getElementsByClassName('piece'));
        let previousSquare;

        let getOverlays = () => {
            let possibleMovesOverlays = Array.from(document.getElementsByClassName('possible-move'))
            let possibleCapturesOverlays = Array.from(document.getElementsByClassName('possible-capture'))
            let overlays = possibleMovesOverlays.concat(possibleCapturesOverlays)
            return overlays
        }

        let createOverlays = (id) => {
            let pieceObject = this.getPieceById(id)
            if (!pieceObject) return;

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
            let whiteSquares = document.querySelector('.white-square')
            let blackSquares = document.querySelector('.black-square')
            squares.forEach((square) => {
                if (this.method.convertRgbToHex(getComputedStyle(square).backgroundColor) === '#F6EB71') {
                    square.style.backgroundColor = this.method.convertRgbToHex(getComputedStyle(whiteSquares).backgroundColor);
                } else if (this.method.convertRgbToHex(getComputedStyle(square).backgroundColor) === '#DBC34A') {
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
                let pieceObject = this.getPieceById(pieceId);
                let possibleCoordinates = pieceObject.getCoordinates()

                if ((game.players_turn === 'white' && piece.classList.contains('black')) || (game.players_turn === 'black' && piece.classList.contains('white')) || !possibleCoordinates.includes(square.id)) return;
                let king = Array.from(document.getElementsByClassName('king')).find((element) => element.classList.contains(colour))
                let kingObject = this.getPieceById(king.id)
                previousSquare = piece.parentElement;
                removeOverlays()
                pieceObject.updateCoordinate(square.id);
                square.appendChild(piece);
                let check = kingObject.isCheck(this.pieces_objects);
                console.log(`${colour}'s Check Status: ${check}`)
                if (check) {
                    pieceObject.updateCoordinate(previousSquare.id);
                    previousSquare.appendChild(piece);
                    return;
                };
                previousSquare.appendChild(piece);

                if (piece.classList.contains('pawn')) {
                    if (pieceObject.firstMove) {
                        pieceObject.firstMove = false
                    }
                    pieceObject.checkPromotion(piece, square, this.pieces_objects);
                }
                addHighlights(square)

                let enemyPiece = Array.from(square.children).find((child) => child.classList.contains('piece'));
                if (enemyPiece) {
                    let enemyPieceObject = this.getPieceById(enemyPiece.id)
                    enemyPieceObject.remove()
                }
                square.appendChild(piece);
                pieceObject.updateCoordinate(square.id);
                game.endTurn();
                console.log(`Players Turn: ${game.players_turn}`)
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
    remove() {
        let piece = document.getElementById(this.id);
        game.pieces_objects = game.pieces_objects.filter((pieceObject) => pieceObject.id === this.id)
        piece.remove()
    }
}

class King extends Piece {
    constructor(colour, coordinate, id) {
        super('king', colour, coordinate, id);
        this.canCastle = true;
    }
    getCoordinates() {
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
        let possibleCoordinates = [];
        let originalCoordinate = this.coordinate;

        sequences.forEach((sequence) => {
            let tempCoordinate = originalCoordinate;
            sequence.forEach((direction) => {
                tempCoordinate = this[direction](tempCoordinate);
            })

            squares.forEach((square) => {
                if (square.id === tempCoordinate && (!Array.from(square.children).some((child) => child.classList.contains('piece')) || Array.from(square.children).some((child) => child.classList.contains('piece') && !child.classList.contains(this.colour)))) {
                    possibleCoordinates.push(tempCoordinate);
                }
            })
        })
        
        //                     Castling
        // ------------------------------------------------
        // if (this.canCastle) {
        //     let rooks = Array.from(document.getElementsByClassName('rook'));
        //     rooks.forEach((rook) => {
        //         let rookObject = this.getPieceById(rook)
        //         let possibleCoordinates = rookObject.getMoves()
        //         if (rookObject.canCastle && possibleCoordinates.includes(this.coordinate)) {
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
    isCheck() {
        let check = game.pieces_objects.filter((pieceObject) => pieceObject.colour !== this.colour).some((pieceObject) => {
            let possibleCoordinates = pieceObject.getCoordinates()
            console.log(pieceObject.name, possibleCoordinates)
            if (possibleCoordinates.includes(this.coordinate)) return true;
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
        let tempCoordinate = originalCoordinate;

        sequences.forEach((sequence) => {
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
        let tempCoordinate = originalCoordinate;

        directions.forEach((direction) => {
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

        sequences.forEach((sequence) => {
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

        sequences.forEach((sequence) => {
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
        this.firstMove = true;
    }
    getCoordinates() {
        let possibleCoordinates = [];
        let originalCoordinate = this.coordinate;
        let tempCoordinate = originalCoordinate;
        let verticalDirections = { white: 'up', black: 'down'};
        let horizontalDirections = ['left', 'right'];
        let colour = this.colour;

        // if (originalCoordinate.charAt(1) === '2') {
        if (this.firstMove) {
            for (let x = 0; x < 2; x++) {
                tempCoordinate = this[verticalDirections[colour]](tempCoordinate);
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
            tempCoordinate = this[verticalDirections[colour]](tempCoordinate);
            if (squares.some((value) => value.id === tempCoordinate)) {
                let element = document.getElementById(tempCoordinate);
                if (!Array.from(element.children).some((value) => value.classList.contains('piece'))) {
                    possibleCoordinates.push(tempCoordinate);
                    tempCoordinate = originalCoordinate;
                }
            }
        }
        horizontalDirections.forEach((horizontalDirection) => {
            tempCoordinate = this[horizontalDirection](this[verticalDirections[colour]](originalCoordinate));

            if (squares.some((value) => value.id === tempCoordinate)) {
                let element = document.getElementById(tempCoordinate);
                if (Array.from(element.children).some(child => child.classList.contains('piece') && !child.classList.contains(this.colour))) {
                    possibleCoordinates.push(tempCoordinate);
                    tempCoordinate = originalCoordinate;
                }
            }
        });
        tempCoordinate = originalCoordinate;
        return possibleCoordinates;
    }
    checkPromotion(piece, square) {
        let row = this.colour === 'white' ? '8' : '1';
        if (square.id.charAt(1) !== row) return;

        let hiddenContainer = document.getElementById('hidden-container');
        hiddenContainer.style.visibility = 'visible';
        hiddenContainer.style.marginTop = this.colour === 'white' ? '0px' : '-225px';
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
                game.pieces_objects[pieceId - 1] = newPiece;
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
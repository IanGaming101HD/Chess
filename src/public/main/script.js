class Utility {
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
      .map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', ''))
      .join('')}`.toUpperCase();
    return hex;
  }
}

class Game {
  constructor() {
    this.players_turn = 'white';
    this.pieces_objects = [];
    this.game_over = false;
    this.selected_coordinate;
    this.selected_pieceId;
    this.notations = [];
    this.utility = new Utility();
    this.defaultGame();
    // this.testGame();
  }

  defaultGame() {
    this.createBoard();

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
    this.initSquareEvents();
  }

  testGame() {
    this.createBoard();

    let whiteKing = new King('white', 'a1');
    let blackKing = new King('black', 'e5');
    let whiteRook = new Rook('white', 'g1');
    let whiteRook2 = new Rook('white', 'g2');
    let blackRook = new Rook('black', 'b8');
    let blackRook2 = new Rook('black', 'b7');

    this.pieces_objects = [whiteRook, whiteRook2, blackRook, blackRook2, whiteKing, blackKing];
    this.initSquareEvents();
  }

  createBoard() {
    let gameContainer = document.getElementById('game-container');
    let board = document.createElement('div');
    board.id = 'board';
    board.classList.add('board');
    gameContainer.appendChild(board);

    let currentColour = 'white';

    for (let x = 8; x > 0; x--) {
      let row = document.createElement('div');
      row.id = `row-${x}`;
      row.classList.add('row');
      row.classList.add(`row-${x}`);
      board.appendChild(row);

      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].forEach((letter) => {
        let square = document.createElement('div');
        square.id = `${letter}${x}`;
        square.classList.add('square');
        square.classList.add(`${currentColour}-square`);
        row.appendChild(square);
        currentColour = this.getOppositeColour(currentColour);
      });
      currentColour = this.getOppositeColour(currentColour);
    }

    let rows = Array.from(document.getElementsByClassName('row'));
    rows.forEach((row) => {
      let firstSquare = Array.from(row.children).find((element) => element.classList.contains('square'));
      let colour = firstSquare.classList.contains('white-square') ? 'black' : 'white';
      let number = row.id.split('-')[1];
      let label = document.createElement('label');
      label.classList.add('label');
      label.classList.add('number');
      label.classList.add(`${colour}-number`);
      label.innerHTML = number;
      firstSquare.appendChild(label);
    });

    let firstRow = rows[0];
    let lastRow = rows[rows.length - 1];
    Array.from(lastRow.children).forEach((square) => {
      let letter = square.id[0];
      let colour = square.classList.contains('white-square') ? 'black' : 'white';
      let label = document.createElement('label');
      label.classList.add('label');
      label.classList.add('letter');
      label.classList.add(`${colour}-letter`);
      label.innerHTML = letter;
      square.appendChild(label);
    });

    Array.from(firstRow.children)[0].style['border-radius'] = '5px 0px 0px 0px';
    Array.from(firstRow.children)[Array.from(firstRow.children).length - 1].style['border-radius'] = '0px 5px 0px 0px';
    Array.from(lastRow.children)[0].style['border-radius'] = '0px 0px 0px 5px';
    Array.from(lastRow.children)[Array.from(lastRow.children).length - 1].style['border-radius'] = '0px 0px 5px 0px';
  }

  flipBoard() {
    let board = document.getElementById('board');
    let rows = Array.from(board.childNodes).reverse();
    board.append(...rows);

    rows.forEach((row) => {
      let squares = Array.from(row.childNodes).reverse();
      row.append(...squares);
    });

    let labels = Array.from(document.getElementsByClassName('label'));
    labels.forEach((label) => label.remove());

    rows.forEach((row) => {
      let firstSquare = Array.from(row.children).find((element) => element.classList.contains('square'));
      let colour = firstSquare.classList.contains('white-square') ? 'black' : 'white';
      let number = row.id.split('-')[1];
      let label = document.createElement('label');
      label.classList.add('label');
      label.classList.add('number');
      label.classList.add(`${colour}-number`);
      label.innerHTML = number;
      firstSquare.appendChild(label);
    });

    let firstRow = rows[0];
    let lastRow = rows[rows.length - 1];
    Array.from(lastRow.children).forEach((square) => {
      let letter = square.id[0];
      let colour = square.classList.contains('white-square') ? 'black' : 'white';
      let label = document.createElement('label');
      label.classList.add('label');
      label.classList.add('letter');
      label.classList.add(`${colour}-letter`);
      label.innerHTML = letter;
      square.appendChild(label);
    });

    Array.from(firstRow.children)[0].style['border-radius'] = '5px 0px 0px 0px';
    Array.from(firstRow.children)[Array.from(firstRow.children).length - 1].style['border-radius'] = '0px 5px 0px 0px';
    Array.from(lastRow.children)[0].style['border-radius'] = '0px 0px 0px 5px';
    Array.from(lastRow.children)[Array.from(lastRow.children).length - 1].style['border-radius'] = '0px 0px 5px 0px';
  }

  createPromotionPopup(oldPiece, square, colour) {
    let promotionContainer = document.createElement('div');
    promotionContainer.id = 'promotion-container';
    promotionContainer.classList.add('promotion-container');
    promotionContainer.style.marginTop = colour === 'white' ? '0px' : '-285px';
    square.appendChild(promotionContainer);

    ['queen', 'knight', 'rook', 'bishop'].forEach((pieceType) => {
      let option = document.createElement('button');
      option.id = `promotion-option-${pieceType}`;
      option.classList.add('promotion-option');
      promotionContainer.appendChild(option);

      let pieceImage = document.createElement('img');
      pieceImage.classList = 'promotion-icon';
      pieceImage.src = `./public/main/images/pieces/${colour}/${pieceType}.png`;
      option.appendChild(pieceImage);
    });

    let promotionCloseButton = document.createElement('button');
    promotionCloseButton.id = 'promotion-close-button';
    promotionCloseButton.classList.add('promotion-close-button');
    promotionCloseButton.innerHTML = '⨉';
    promotionContainer.appendChild(promotionCloseButton);

    let promotionOptions = {
      'promotion-option-queen': Queen,
      'promotion-option-knight': Knight,
      'promotion-option-rook': Rook,
      'promotion-option-bishop': Bishop,
    };

    Object.entries(promotionOptions).forEach(([optionId, pieceTypeObject]) => {
      let optionElement = document.getElementById(optionId);
      optionElement.addEventListener('click', () => {
        let newPieceObject = new pieceTypeObject(colour, oldPiece.parentElement.id, `${colour}-${pieceTypeObject.name.toLowerCase()}-${Piece.pieces_ids.filter((pieceId) => pieceId.includes(`${colour}-${pieceTypeObject.name.toLowerCase()}`)).length + 1}`);
        oldPiece.remove();

        let element = document.getElementById(newPieceObject.id);
        if (element) {
          element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
          });
        }
        game.pieces_objects = game.pieces_objects.filter((piece_object) => piece_object.id != oldPiece.id);
        game.pieces_objects.push(newPieceObject);
        promotionContainer.remove();
      });
    });

    promotionCloseButton.addEventListener('click', () => {
      promotionContainer.remove();
      // undo move or stop them from making move or something over here idk
    });
  }

  restart() {
    let board = document.getElementById('board');
    board.remove();

    game = new Game();
  }

  isDraw() {
    function stalemate() {}

    function deadPosition() {}

    // function mutualAgreement() {

    // }

    function checkThreefoldRepetition() {
      consecutiveMove = 0;
      let status = this.notations.some((notation, index) => {
        if (index > 0 && notation === this.notations[index - 1]) {
          consecutiveMove += 1;
        }
        if (consecutiveMove >= 3) {
          return true;
        }
      });
      return status;
    }

    // 50 moves without capture
    // function check50Moves() {
    //     if (this.notations.length >= 50) {
    //         return true;
    //     }
    //     return false;
    // }
    if ((stalemate(), deadPosition(), checkThreefoldRepetition(), check50Moves())) {
    }
  }

  getDistance(square1, square2) {
    let charMap = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };
    let char1 = charMap[square1[0]];
    let char2 = charMap[square2[0]];
    let num1 = parseInt(square1[1]) - 1;
    let num2 = parseInt(square2[1]) - 1;

    let charDistance = Math.abs(char1 - char2);
    let numDistance = Math.abs(num1 - num2);

    return Math.max(charDistance, numDistance);
  }

  getOppositeColour(colour) {
    let colourMap = {
      white: 'black',
      black: 'white',
    };
    return colourMap[colour];
  }

  getPieceObjectById(id) {
    return this.pieces_objects.find((element) => element.id === id);
  }

  getOverlays() {
    let possibleMovesOverlays = Array.from(document.getElementsByClassName('possible-move'));
    let possibleCapturesOverlays = Array.from(document.getElementsByClassName('possible-capture'));
    let overlays = possibleMovesOverlays.concat(possibleCapturesOverlays);
    return overlays;
  }

  createOverlays(id) {
    let piece = document.getElementById(id);
    if (!piece) return;

    let pieceObject = this.getPieceObjectById(id);
    if (!pieceObject) return;
    if (game.players_turn !== pieceObject.colour) return;

    let possibleCoordinates = pieceObject.getCoordinates();
    possibleCoordinates.forEach((possibleCoordinate) => {
      let square = document.getElementById(possibleCoordinate);
      let overlay = document.createElement('div');

      overlay.classList.add(Array.from(square.children).some((element) => element.classList.contains('piece')) ? 'possible-capture' : 'possible-move');
      square.appendChild(overlay);

      // Click to move feature vvv
      // overlay.addEventListener('click', () => {
      //   this.movePiece(id, square);
      // });
    });
  }

  clearOverlays() {
    let overlays = this.getOverlays();
    overlays.forEach((overlay) => overlay.remove());
  }

  addHighlight(square) {
    if (square.classList.contains('white-square')) {
      square.style.backgroundColor = '#F6EB71';
    } else if (square.classList.contains('black-square')) {
      square.style.backgroundColor = '#DBC34A';
    }
  }

  removeHighlight(square) {
    square.style.backgroundColor = '';
  }

  clearHighlights(squares) {
    squares.forEach((square) => {
      square.style.backgroundColor = '';
    });
  }

  initSquareEvents() {
    let squares = Array.from(document.getElementsByClassName('square'));

    squares.forEach((square) => {
      Object.entries({
        dragover: '#FFFFFF',
        dragleave: 'transparent',
      }).forEach(([key, value]) => {
        square.addEventListener(key, (event) => {
          square.style.borderColor = value;
          event.preventDefault();
        });
      });

      square.addEventListener('drop', (event) => {
        event.preventDefault();
        square.style.borderColor = 'transparent';

        let pieceId = this.selected_pieceId;
        if (pieceId === event.target.id) return;

        this.movePiece(pieceId, square);
      });
    });
  }

  movePiece(pieceId, square) {
    let squares = Array.from(document.getElementsByClassName('square'));
    let piece = document.getElementById(pieceId);
    if (!piece) return;

    let previousSquare = piece.parentElement;
    let colour = piece.classList.contains('white') ? 'white' : 'black';
    let pieceObject = this.getPieceObjectById(pieceId);
    let possibleCoordinates = pieceObject.getCoordinates();

    if ((game.players_turn === 'white' && piece.classList.contains('black')) || (game.players_turn === 'black' && piece.classList.contains('white')) || !possibleCoordinates.includes(square.id)) return;
    let king = Array.from(document.getElementsByClassName('king')).find((element) => element.classList.contains(colour));
    let kingObject = this.getPieceObjectById(king.id);
    let enemyKing = Array.from(document.getElementsByClassName('king')).find((element) => element.classList.contains(this.getOppositeColour(colour)));
    let enemyKingObject = this.getPieceObjectById(enemyKing.id);
    this.clearOverlays();
    game.selected_coordinate = null;

    square.appendChild(piece);
    pieceObject.updateCoordinate(square.id);

    let notation = `${pieceObject.letter}${square.id}`;
    if (piece.id === king.id && kingObject.canCastle && game.getDistance(previousSquare.id, square.id) === 2) {
      let rookObjects = this.pieces_objects.filter((pieceObject) => pieceObject.id.includes(`${colour}-rook`));
      rookObjects.forEach((rookObject) => {
        if ([1, 2].includes(game.getDistance(rookObject.coordinate, square.id))) {
          let rook = document.getElementById(rookObject.id);
          let tempCoordinate = rook.parentElement.id;

          if (game.getDistance(rookObject.coordinate, square.id) === 1) {
            for (let x = 0; x < 2; x++) {
              tempCoordinate = rookObject.left(tempCoordinate);
            }
            notation = 'O-O';
          } else {
            for (let x = 0; x < 3; x++) {
              tempCoordinate = rookObject.right(tempCoordinate);
            }
            notation = 'O-O-O';
          }
          let newSquare = document.getElementById(tempCoordinate);
          newSquare.appendChild(rook);
          rookObject.updateCoordinate(newSquare.id);
          rookObject.canCastle = false;
        }
      });
    } else if (piece.id === king.id || piece.classList.contains('rook')) {
      pieceObject.canCastle = false;
    }

    this.pieces_objects
      .filter((pieceObject) => document.getElementById(pieceObject.id).classList.contains('pawn') && pieceObject.colour === colour)
      .forEach((pieceObject) => {
        if (pieceObject.canBeEnPassent) {
          pieceObject.canBeEnPassent = false;
        }
      });
    if (piece.classList.contains('pawn')) {
      if (pieceObject.firstMove) {
        if (game.getDistance(previousSquare.id, square.id) == 2) {
          pieceObject.canBeEnPassent = true;
        }
        pieceObject.firstMove = false;
      }
      ['left', 'right'].forEach((horizontalDirection) => {
        if (pieceObject[horizontalDirection](pieceObject[pieceObject.vertical_direction](previousSquare.id)) === square.id) {
          let enemyPawn = Array.from(document.getElementById(pieceObject[horizontalDirection](previousSquare.id)).children).find((child) => child.classList.contains('piece') && child.classList.contains('pawn') && child.classList.contains(this.getOppositeColour(pieceObject.colour)));
          if (enemyPawn) {
            let enemyPawnObject = this.getPieceObjectById(enemyPawn.id);
            if (enemyPawnObject.canBeEnPassent) {
              enemyPawnObject.remove();
              notation = `${previousSquare.id[0]}x${square.id} e.p.`;
            }
          }
        }
      });
      pieceObject.checkPromotion(piece, square);
    }

    this.clearHighlights(squares);
    this.addHighlight(previousSquare);
    this.addHighlight(square);

    let enemyPiece = Array.from(square.children).find((child) => child.classList.contains('piece') && child.classList.contains(this.getOppositeColour(pieceObject.colour)));
    if (enemyPiece) {
      let enemyPieceObject = this.getPieceObjectById(enemyPiece.id);
      enemyPieceObject.remove();
      notation = `${pieceObject.letter}x${square.id}`;
    }

    square.appendChild(piece);
    pieceObject.updateCoordinate(square.id);

    if (enemyKingObject.isCheckmate()) {
      outcomeContainer.style.visibility = 'visible';
      notation += '#';
    } else if (enemyKingObject.isCheck(this.pieces_objects)) {
      notation += '+';
    }

    if (game.players_turn === 'white') {
      this.notations.push([notation]);
    } else {
      this.notations[this.notations.length - 1].push(notation);
    }
    game.endTurn();
    console.log(this.notations.join(' '));
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
  static pieces_ids = [];
  constructor(name, colour, coordinate, id) {
    this.name = name;
    this.colour = colour;
    this.coordinate = coordinate;
    this.id = id ? id : `${colour}-${name}-${Piece.pieces_ids.filter((pieceId) => pieceId.includes(`${colour}-${name}`)).length + 1}`;
    this.utility = new Utility();
    this.create();
  }

  toString() {
    return `${this.name} ${this.colour} ${this.coordinate} ${this.id}`;
  }

  updateCoordinate(newCoordinate) {
    this.coordinate = newCoordinate;
  }

  left(coordinate) {
    return this.utility.decrement(coordinate[0]) + coordinate.slice(1);
  }

  right(coordinate) {
    return this.utility.increment(coordinate[0]) + coordinate.slice(1);
  }

  up(coordinate) {
    return coordinate[0] + this.utility.increment(coordinate.slice(1));
  }

  down(coordinate) {
    return coordinate[0] + this.utility.decrement(coordinate.slice(1));
  }

  create() {
    let squares = Array.from(document.getElementsByClassName('square'));
    if (!squares.some((value) => value.id === this.coordinate)) return;
    let position = document.getElementById(this.coordinate);
    let piece = document.createElement('img');

    Piece.pieces_ids.push(this.id);

    piece.id = this.id;
    piece.classList.add('piece');
    piece.classList.add(this.name);
    piece.classList.add(this.colour);
    piece.src = `./public/main/images/pieces/${this.colour}/${this.name}.png`;

    position.appendChild(piece);

    piece.addEventListener('click', (event) => {
      let square = piece.parentElement;
      let overlays = game.getOverlays();
      if (overlays.length > 0) {
        game.clearOverlays();
      }
      game.createOverlays(piece.id);
      if (game.selected_coordinate) {
        let previousSelectedSquare = document.getElementById(game.selected_coordinate);
        game.removeHighlight(previousSelectedSquare);
      }
      game.addHighlight(square);
      game.selected_coordinate = square.id;
      game.selected_pieceId = this.id;
    });

    piece.addEventListener('dragstart', (event) => {
      let square = piece.parentElement;
      let overlays = game.getOverlays();
      if (overlays.length > 0) {
        game.clearOverlays();
      }
      game.createOverlays(piece.id);
      if (game.selected_coordinate) {
        let previousSelectedSquare = document.getElementById(game.selected_coordinate);
        game.removeHighlight(previousSelectedSquare);
      }
      game.addHighlight(square);
      game.selected_coordinate = square.id;
      game.selected_pieceId = this.id;
    });
  }

  remove() {
    let piece = document.getElementById(this.id);
    game.pieces_objects = game.pieces_objects.filter((pieceObject) => pieceObject.id !== this.id);
    piece.remove();
  }
}

class King extends Piece {
  constructor(colour, coordinate, id) {
    super('king', colour, coordinate, id);
    this.letter = 'K';
    this.canCastle = true;
    this.check_in_progress = false;
  }

  getCoordinates() {
    let squares = Array.from(document.getElementsByClassName('square'));
    let sequences = [['left'], ['right'], ['up'], ['down'], ['left', 'up'], ['left', 'down'], ['right', 'up'], ['right', 'down']];
    let possibleCoordinates = [];
    let originalCoordinate = this.coordinate;

    sequences.forEach((sequence) => {
      let tempCoordinate = originalCoordinate;
      sequence.forEach((direction) => {
        tempCoordinate = this[direction](tempCoordinate);
      });

      squares.forEach((square) => {
        if (square.id === tempCoordinate && (!Array.from(square.children).some((child) => child.classList.contains('piece')) || Array.from(square.children).some((child) => child.classList.contains('piece') && !child.classList.contains(this.colour)))) {
          possibleCoordinates.push(tempCoordinate);
        }
      });
    });

    if (this.canCastle) {
      let rooks = Array.from(document.getElementsByClassName('piece')).filter((piece) => piece.classList.contains('rook') && piece.classList.contains(this.colour));
      rooks.forEach((rook) => {
        let rookObject = game.getPieceObjectById(rook.id);
        if (rookObject.canCastle) {
          let tempCoordinate = originalCoordinate;
          let castlingPossible = true;
          let distance = game.getDistance(rookObject.coordinate, this.coordinate);

          for (let x = 0; x < 2; x++) {
            tempCoordinate = distance === 4 ? this.left(tempCoordinate) : this.right(tempCoordinate);

            let square = document.getElementById(tempCoordinate);
            if (square && Array.from(square.children).some((value) => value.classList.contains('piece'))) {
              castlingPossible = false;
              break;
            }
          }
          if (castlingPossible) {
            let square = document.getElementById(tempCoordinate);
            if (square) {
              possibleCoordinates.push(tempCoordinate);
            }
          }
        }
      });
    }

    let previousSquare = document.getElementById(originalCoordinate);

    if (!this.check_in_progress) {
      possibleCoordinates = possibleCoordinates.filter((possibleCoordinate) => {
        let square = document.getElementById(possibleCoordinate);
        let piece = document.getElementById(this.id);
        square.appendChild(piece);
        this.updateCoordinate(square.id);

        this.check_in_progress = true;
        let check = this.isCheck();
        this.check_in_progress = false;

        previousSquare.appendChild(piece);
        this.updateCoordinate(originalCoordinate);
        return !check;
      });
    }

    possibleCoordinates = possibleCoordinates.filter((coordinate) => ['left', 'right', 'up', 'down'].some((direction) => possibleCoordinates.includes(this[direction](coordinate)) || originalCoordinate === this[direction](coordinate)));
    return possibleCoordinates;
  }

  isCheck() {
    let check = game.pieces_objects
      .filter((pieceObject) => pieceObject.colour !== this.colour)
      .some((pieceObject) => {
        let possibleCoordinates = pieceObject.getCoordinates();
        if (possibleCoordinates.includes(this.coordinate)) return true;
      });
    return check;
  }

  isCheckmate() {
    let checkmate = true;
    game.pieces_objects
      .filter((pieceObject) => pieceObject.colour === this.colour)
      .forEach((pieceObject) => {
        let piece = document.getElementById(pieceObject.id);
        let possibleCoordinates = pieceObject.getCoordinates();
        let updatedPossibleCoordinates = [];
        let originalCooordinate = pieceObject.coordinate;
        possibleCoordinates.forEach((coordinate) => {
          let square = document.getElementById(coordinate);
          square.appendChild(piece);
          pieceObject.updateCoordinate(square.id);

          let check = this.isCheck();
          let previousSquare = document.getElementById(originalCooordinate);
          previousSquare.appendChild(piece);
          pieceObject.updateCoordinate(originalCooordinate);
          if (!check) {
            updatedPossibleCoordinates.push(coordinate);
          }
        });
        if (updatedPossibleCoordinates.length > 0) {
          checkmate = false;
        }
      });
    return checkmate;
  }
}

class Queen extends Piece {
  constructor(colour, coordinate, id) {
    super('queen', colour, coordinate, id);
    this.letter = 'Q';
  }

  getCoordinates() {
    let squares = Array.from(document.getElementsByClassName('square'));
    let sequences = [['left'], ['right'], ['up'], ['down'], ['left', 'up'], ['right', 'up'], ['left', 'down'], ['right', 'down']];
    let possibleCoordinates = [];
    let coordinates = [];
    let originalCoordinate = this.coordinate;
    let tempCoordinate = originalCoordinate;

    sequences.forEach((sequence) => {
      while (true) {
        tempCoordinate = sequence.length === 1 ? this[sequence](tempCoordinate) : (tempCoordinate = this[sequence[0]](this[sequence[1]](tempCoordinate)));
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
    });

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
    this.letter = 'R';
    this.canCastle = true;
  }

  getCoordinates() {
    let squares = Array.from(document.getElementsByClassName('square'));
    let directions = ['left', 'right', 'up', 'down'];
    let possibleCoordinates = [];
    let coordinates = [];
    let originalCoordinate = this.coordinate;
    let tempCoordinate = originalCoordinate;

    directions.forEach((direction) => {
      while (true) {
        tempCoordinate = this[direction](tempCoordinate);
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
    });

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
    this.letter = 'B';
  }

  getCoordinates() {
    let squares = Array.from(document.getElementsByClassName('square'));
    let sequences = [
      ['left', 'up'],
      ['right', 'up'],
      ['left', 'down'],
      ['right', 'down'],
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
    });

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
    this.letter = 'N';
  }

  getCoordinates() {
    let squares = Array.from(document.getElementsByClassName('square'));
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
      ['right', 'right', 'down'],
    ];

    sequences.forEach((sequence) => {
      sequence.forEach((direction) => {
        tempCoordinate = this[direction](tempCoordinate);
      });

      if (squares.some((value) => value.id === tempCoordinate)) {
        let element = document.getElementById(tempCoordinate);
        if (!Array.from(element.children).find((child) => child.classList.contains('piece') && child.classList.contains(this.colour))) {
          possibleCoordinates.push(tempCoordinate);
        }
      }
      tempCoordinate = originalCoordinate;
    });
    return possibleCoordinates;
  }
}

class Pawn extends Piece {
  constructor(colour, coordinate, id) {
    super('pawn', colour, coordinate, id);
    let verticalDirections = { white: 'up', black: 'down' };
    this.vertical_direction = verticalDirections[colour];
    this.letter = '';
    this.moved = 0;
    this.firstMove = true;
    this.canBeEnPassent = false;
  }

  getCoordinates() {
    let squares = Array.from(document.getElementsByClassName('square'));
    let possibleCoordinates = [];
    let originalCoordinate = this.coordinate;
    let tempCoordinate = originalCoordinate;
    let horizontalDirections = ['left', 'right'];
    let colour = this.colour;
    let moves = this.firstMove ? 2 : 1;

    for (let x = 0; x < moves; x++) {
      tempCoordinate = this[this.vertical_direction](tempCoordinate);
      if (squares.some((value) => value.id === tempCoordinate)) {
        let element = document.getElementById(tempCoordinate);
        if (!Array.from(element.children).some((value) => value.classList.contains('piece'))) {
          possibleCoordinates.push(tempCoordinate);
        } else {
          break;
        }
      }
    }

    horizontalDirections.forEach((horizontalDirection) => {
      tempCoordinate = this[horizontalDirection](this[this.vertical_direction](originalCoordinate));

      if (squares.some((value) => value.id === tempCoordinate)) {
        let square = document.getElementById(tempCoordinate);
        if (Array.from(square.children).some((child) => child.classList.contains('piece') && !child.classList.contains(this.colour))) {
          possibleCoordinates.push(tempCoordinate);
          tempCoordinate = originalCoordinate;
        }
      }

      tempCoordinate = this[horizontalDirection](originalCoordinate);

      let square = squares.find((value) => value.id === tempCoordinate);
      if (square) {
        let enemyPawn = Array.from(square.children).find((child) => child.classList.contains('piece') && child.id.includes(`${game.getOppositeColour(colour)}-pawn`));
        if (enemyPawn) {
          let enemyPawnObject = game.getPieceObjectById(enemyPawn.id);
          if (enemyPawnObject.canBeEnPassent) {
            tempCoordinate = this[this.vertical_direction](tempCoordinate);
            possibleCoordinates.push(tempCoordinate);
          }
        }
      }
      tempCoordinate = originalCoordinate;
    });
    return possibleCoordinates;
  }

  checkPromotion(piece, square) {
    let row = this.colour === 'white' ? '8' : '1';
    if (square.id.charAt(1) !== row) return;

    game.createPromotionPopup(piece, square, this.colour);
  }
}
let gameContainer = document.getElementById('game-container');
let game = new Game();

let outcomeContainer = document.getElementById('outcome-container');
let closeButton = document.getElementById('close-button');
let newButton = document.getElementById('new-button');
let flipButton = document.getElementById('flip-button');
let userRating = document.getElementById('user-rating');
let userFlag = document.getElementById('user-flag');
let enemyRating = document.getElementById('enemy-rating');
let enemyFlag = document.getElementById('enemy-flag');

userRating.innerHTML = '500';
userFlag.innerHTML = '🇬🇧';
enemyRating.innerHTML = '500';
enemyFlag.innerHTML = '🇬🇧';

flipButton.addEventListener('click', (event) => {
  event.preventDefault();
  game.flipBoard();
});

gameContainer.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

[closeButton, newButton].forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    Piece.pieces_ids = [];

    outcomeContainer.style.visibility = 'hidden';
    game.restart();
  });
});

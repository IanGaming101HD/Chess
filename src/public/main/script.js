const squares = document.getElementsByClassName('square')
const positions = Array.from(squares, (square) => square.id)

class Piece {
    constructor(name, color, originalPosition) {
        this.name = name;
        this.color = color;
        this.originalPosition = originalPosition;
    }

    toString() {
        return `${this.name} ${this.color} ${this.originalPosition}`;
    }

    potentialMoves() {}
    
    move() {}

    create() {
        if (!positions.includes(this.originalPosition)) return

        let position = document.getElementById(this.originalPosition)
        let piece = document.createElement('img');

        piece.classList.add('pieces')
        piece.src = `../../images/pieces/${this.color}/${this.name}.png`;

        position.appendChild(piece);
    }
}

class Rook extends Piece {
    constructor(color, originalPosition) {
        super('rook', color, originalPosition)
    }
}

class Knight extends Piece {
    constructor(color, originalPosition) {
        super('knight', color, originalPosition)
    }
}

class Bishop extends Piece {
    constructor(color, originalPosition) {
        super('bishop', color, originalPosition)
    }
}

class Queen extends Piece {
    constructor(color, originalPosition) {
        super('queen', color, originalPosition)
    }
}

class King extends Piece {
    constructor(color, originalPosition) {
        super('king', color, originalPosition)
    }
}

class Pawn extends Piece {
    constructor(color, originalPosition) {
        super('pawn', color, originalPosition)
    }
}

function normalGame() {
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
    
    whiteRook.create();
    whiteKnight.create();
    whiteBishop.create();
    whiteQueen.create();
    whiteKing.create();
    whiteBishop2.create();
    whiteKnight2.create();
    whiteRook2.create();
    whitePawn.create();
    whitePawn2.create();
    whitePawn3.create();
    whitePawn4.create();
    whitePawn5.create();
    whitePawn6.create();
    whitePawn7.create();
    whitePawn8.create();
    blackRook.create();
    blackKnight.create();
    blackBishop.create();
    blackQueen.create();
    blackKing.create();
    blackBishop2.create();
    blackKnight2.create();
    blackRook2.create();
    blackPawn.create();
    blackPawn2.create();
    blackPawn3.create();
    blackPawn4.create();
    blackPawn5.create();
    blackPawn6.create();
    blackPawn7.create();
    blackPawn8.create();
}

normalGame()
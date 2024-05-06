function testGame() {
    let blackPawn = new Pawn('white', 'a7');
    let piecesClasses = [blackPawn]
    let getPieceFromId = (id) => piecesClasses.find((element) => String(element.id) === id)
    let pieces = document.getElementsByClassName('piece')

    Array.from(pieces).forEach((piece) => {
        piece.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
        })
    })

    Array.from(squares).forEach((square) => {
        square.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        square.addEventListener('drop', (event) => {
            event.preventDefault();
            square.style.borderColor = 'transparent'

            let pieceId = event.dataTransfer.getData('text/plain');
            if (pieceId === event.target.id) return;

            let piece = document.getElementById(pieceId)
            if (!getPieceFromId(pieceId).getMoves().includes(square.id) || Array.from(piece.classList).includes('king') || Array.from(square.children).find((child) => Array.from(child.classList).includes('king'))) return
            // maybe change this condition (the king condition part) when you added "cant kill king" to all pieces

            previousSquare = piece.parentElement

            if (piece.classList.contains('pawn')) {
                let pawn = getPieceFromId(piece.id)
                let colour = piece.classList.contains('white') ? 'white' : 'black'
                pawn.checkPromotion(piece, colour, square, piecesClasses)
            }

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
}
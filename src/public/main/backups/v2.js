    // Castling
    if (this.canCastle) {
        let rooks = Array.from(document.getElementsByClassName('piece')).filter((piece) => piece.classList.contains('rook') && piece.classList.contains(this.colour));
        rooks.forEach((rook) => {
          let rookObject = game.getPieceObjectById(rook.id);
          if (rookObject.canCastle) {
            let tempCoordinate = originalCoordinate;
            let castlingPossible = true;
            let distance = game.getDistance(rookObject.coordinate, this.coordinate);
            console.log('distance', distance)
  
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
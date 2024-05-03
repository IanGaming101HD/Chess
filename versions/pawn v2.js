class Pawn extends Piece {
    constructor(colour, coordinate) {
        super('pawn', colour, coordinate);
    }

    getMoves() {
        let possibleCoordinates = [];
        let originalCoordinate = this.coordinate;
        let tempCoordinate = originalCoordinate;
        let directions = ['left', 'right'];
        let isWhite = this.colour === 'white';
        let isBlack = this.colour === 'black';

        let processCoordinate = (coordinate) => {
            let targetCoordinate = coordinate;
            let element = document.getElementById(targetCoordinate);

            if (positions.includes(targetCoordinate)) {
                if (!Array.from(element.children).some((value) => value.tagName === 'IMG')) {
                    possibleCoordinates.push(targetCoordinate);
                } else if (Array.from(element.children).some((value) => value.tagName === 'IMG' && !Array.from(value.classList).includes(this.colour))) {
                    possibleCoordinates.push(targetCoordinate);
                }
            }
        };

        if ((isWhite && originalCoordinate.charAt(1) === '2') || (isBlack && originalCoordinate.charAt(1) === '7')) {
            for (let x = 0; x < 2; x++) {
                let nextCoordinate = isWhite ? this.up(tempCoordinate) : this.down(tempCoordinate);
                processCoordinate(nextCoordinate);
            }
        } else {
            let nextCoordinate = isWhite ? this.up(tempCoordinate) : this.down(tempCoordinate);
            processCoordinate(nextCoordinate);

            directions.forEach((direction) => {
                let nextCoordinate = this[direction](this.up(originalCoordinate));
                processCoordinate(nextCoordinate);
            });
        }

        return possibleCoordinates;
    }
}
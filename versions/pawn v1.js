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
                        if (Array.from(element.children).find((value) => value.tagName === 'IMG') ? !Array.from(Array.from(element.children).find((value) => value.tagName === 'IMG')?.classList).includes(this.colour) : false) {
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
                        if (Array.from(element.children).find((value) => value.tagName === 'IMG') ? !Array.from(Array.from(element.children).find((value) => value.tagName === 'IMG')?.classList).includes(this.colour) : false) {
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
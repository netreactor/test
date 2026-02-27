class MathMatrix {
    getZeroMatrix(length) {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push([]);
            for (let j = 0; j < length; j++) {
                arr[i][j] = 0;
            }
        }
        return arr;
    }

    getOneMatrix(length) {
        const arr = this.getZeroMatrix(length);
        for (let i = 0; i < length; i++) {
            arr[i][i] = 1;
        }
        return arr;
    }

    getReverseOneMatrix(length) {
        const arr = this.getZeroMatrix(length);
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (j == (length - 1 - i)) {
                    arr[i][j] = 1;
                }
            }
        }
        return arr;
    }

    getTringelMatrix(length) {
        const arr = this.getZeroMatrix(length);
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (i <= j) {
                    arr[i][j] = 1;
                } else {
                    arr[i][j] = 0;
                }
            }
        }
        return arr;
    }

    getSpiralMatrix(length) {
        const arr = this.getZeroMatrix(length);
        let x = 0;
        let y = 0;
        let value = 1;
        let direction = 'right';
        for (let i = 0; i < length * length; i++) {
            if (arr[y][x] === 0) {
                arr[y][x] = value;
                value++;
                switch (direction) {
                    case 'right':
                        if (x + 1 < length && arr[y][x + 1] === 0) {
                            x++;
                        } else {
                            direction = 'down';
                            y++;
                        }
                        break;
                    case 'down':
                        if (y + 1 < length && arr[y + 1][x] === 0) {
                            y++;
                        } else {
                            direction = 'left';
                            x--;
                        }
                        break;
                    case 'left':
                        if (x - 1 >= 0 && arr[y][x - 1] === 0) {
                            x--;
                        } else {
                            direction = 'up';
                            y--;
                        }
                        break;
                    case 'up':
                        if (y - 1 >= 0 && arr[y - 1][x] === 0) {
                            y--;
                        } else {
                            direction = 'right';
                            x++;
                        }
                        break;
                }
            }
        }
        return arr;
    }

    getReverseSpiralMatrix(length) {
        const arr = this.getZeroMatrix(length);
        let x = 0;
        let y = 0;
        let value = length * length;
        let direction = 'right';

        for (let i = 0; i < length * length; i++) {
            if (arr[y][x] === 0) {
                arr[y][x] = value;
                value--;

                switch (direction) {
                    case 'right':
                        if (x + 1 < length && arr[y][x + 1] === 0) {
                            x++;
                        } else {
                            direction = 'down';
                            y++;
                        }
                        break;
                    case 'down':
                        if (y + 1 < length && arr[y + 1][x] === 0) {
                            y++;
                        } else {
                            direction = 'left';
                            x--;
                        }
                        break;
                    case 'left':
                        if (x - 1 >= 0 && arr[y][x - 1] === 0) {
                            x--;
                        } else {
                            direction = 'up';
                            y--;
                        }
                        break;
                    case 'up':
                        if (y - 1 >= 0 && arr[y - 1][x] === 0) {
                            y--;
                        } else {
                            direction = 'right';
                            x++;
                        }
                        break;
                }
            }
        }
        return arr;
    }

    getRandomMatrix(length) {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr[i] = [];
            for (let j = 0; j < length; j++) {
                arr[i][j] = Math.round(Math.random() * 10);
            }
        }
        return arr;
    }
}

class Target {
    shotToCenter(x, y) {
        return (x === 0 && y === 0) ? 10 : 0;
    }

    shotToStar(x, y) {
        return ((x > 0 && y > 0 && y < 1 / (x + 11 / 18) - 11 / 18) ||
                (x > 0 && y < 0 && y < -1 / (x + 11 / 18) + 11 / 18) ||
                (x < 0 && y > 0 && y < -1 / (x - 11 / 18) - 11 / 18) ||
                (x > 0 && y <= 0 && y > (1 / (x - 11 / 18) + 11 / 18))) ? 4 : 0;
    }

    shotToRomb(x, y) {
        return ((Math.abs(x) + Math.abs(y)) < 1) ? 3 : 0;
    }

    shotToCircle(x, y) {
        return (Math.sqrt(x * x + y * y) < 1) ? 2 : 0;
    }

    shotToSquare(x, y) {
        return (Math.abs(x) < 1 && Math.abs(y) < 1) ? 1 : 0;
    }

    shot(x, y) {
        if (this.shotToCenter(x, y)) {
            return this.shotToCenter(x, y);
        }
        if (this.shotToRomb(x, y)) {
            return this.shotToRomb(x, y);
        }
        if (this.shotToCircle(x, y)) {
            return this.shotToCircle(x, y);
        }
        if (this.shotToSquare(x, y)) {
            return this.shotToSquare(x, y);
        }
        if (this.shotToStar(x, y)) {
            return this.shotToStar(x, y);
        }
        return 0;
    }
}

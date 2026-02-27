class Shot {
    constructor() {
        this.isManual = false;
        this.score = 0;
        this.procent = 0;
        this.countHit = 0;
        this.countShot = 0;

        this.WIN = {
            left: -1.5,
            bottom: -1.5,
            width: 3,
            height: 3
        };

        this.canvas = document.getElementById('targetVisual');
        this.ctx = this.canvas.getContext('2d');

        this.drawTarget();

        document.getElementById('isManual').addEventListener('change', this.isManualHandler);
        document.getElementById('shotMe').addEventListener('click', this.shotMeHandler);
        document.getElementById('clearScore').addEventListener('click', this.clearScoreHandler);
    }

    xs(x) {
        return (x - this.WIN.left) / this.WIN.width * this.canvas.width;
    }

    ys(y) {
        return this.canvas.height - (y - this.WIN.bottom) / this.WIN.height * this.canvas.height;
    }

    drawTarget() {
        if (!this.canvas) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 4;

        this.ctx.beginPath();
        this.ctx.moveTo(this.xs(this.WIN.left), this.ys(0));
        this.ctx.lineTo(this.xs(this.WIN.left + this.WIN.width), this.ys(0));
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.xs(0), this.ys(this.WIN.bottom));
        this.ctx.lineTo(this.xs(0), this.ys(this.WIN.bottom + this.WIN.height));
        this.ctx.stroke();

        this.drawFunctions();
    }

    drawFunctions() {
        this.ctx.strokeStyle = 'orange';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(this.xs(-1), this.ys(1), this.xs(1) - this.xs(-1), this.ys(-1) - this.ys(1));

        this.ctx.strokeStyle = 'blue';
        this.ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
            let x = Math.cos(angle);
            let y = Math.sin(angle);
            if (angle === 0) {
                this.ctx.moveTo(this.xs(x), this.ys(y));
            } else {
                this.ctx.lineTo(this.xs(x), this.ys(y));
            }
        }
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.strokeStyle = 'green';
        this.ctx.beginPath();
        this.ctx.moveTo(this.xs(0), this.ys(1));
        this.ctx.lineTo(this.xs(1), this.ys(0));
        this.ctx.lineTo(this.xs(0), this.ys(-1));
        this.ctx.lineTo(this.xs(-1), this.ys(0));
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.strokeStyle = 'purple';
        this.ctx.lineWidth = 4;

        this.ctx.beginPath();
        for (let x = 0.01; x <= 1; x += 0.05) {
            let y = 1 / (x + 11 / 18) - 11 / 18;
            if (y <= 2 && y >= -2) {
                if (x === 0.01) this.ctx.moveTo(this.xs(x), this.ys(y));
                else this.ctx.lineTo(this.xs(x), this.ys(y));
            }
        }
        this.ctx.stroke();

        this.ctx.beginPath();
        for (let x = -0.01; x >= -1; x -= 0.05) {
            let y = -1 / (x - 11 / 18) - 11 / 18;
            if (y <= 2 && y >= -2) {
                if (x === -0.01) this.ctx.moveTo(this.xs(x), this.ys(y));
                else this.ctx.lineTo(this.xs(x), this.ys(y));
            }
        }
        this.ctx.stroke();

        this.ctx.beginPath();
        for (let x = 0.01; x <= 1; x += 0.05) {
            let y = -1 / (x + 11 / 18) + 11 / 18;
            if (y >= -2 && y <= 2) {
                if (x === 0.01) this.ctx.moveTo(this.xs(x), this.ys(y));
                else this.ctx.lineTo(this.xs(x), this.ys(y));
            }
        }
        this.ctx.stroke();

        this.ctx.beginPath();
        for (let x = -0.01; x >= -1; x -= 0.05) {
            let y = 1 / (x - 11 / 18) + 11 / 18;
            if (y >= -2 && y <= 2) {
                if (x === -0.01) this.ctx.moveTo(this.xs(x), this.ys(y));
                else this.ctx.lineTo(this.xs(x), this.ys(y));
            }
        }
        this.ctx.stroke();

        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.xs(0), this.ys(0), 4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    shotMeHandler = () => {
        const target = new Target();
        if (this.isManual) {
            const x = Number(document.getElementById('x').value);
            const y = Number(document.getElementById('y').value);

            this.countShot++;
            if (!isNaN(x) && !isNaN(y)) {
                const result = target.shot(x, y);
                this.score += result;
                if (result > 0) {
                    this.countHit++;
                }
            }
        } else {
            const count = Number(document.getElementById('count').value);
            if (count > 0) {
                for (let i = 0; i < count; i++) {
                    const x = Math.random() * 4 - 2;
                    const y = Math.random() * 4 - 2;
                    const result = target.shot(x, y);
                    this.score += result;
                    if (result > 0) {
                        this.countHit++;
                    }
                }
                this.countShot += count;
            }
        }

        this.procent = this.countShot > 0 ? ((this.countHit / this.countShot) * 100).toFixed(1) : 0;
        document.getElementById('score').innerHTML = 'Результат: ' + this.score;
        document.getElementById('procentHit').innerHTML = `Процент попадания: ${this.procent}%`;
    }

    isManualHandler = (event) => {
        this.isManual = event.target.checked;
        if (this.isManual) {
            document.querySelector('.manual').classList.remove('hide');
            document.querySelector('.random').classList.add('hide');
        } else {
            document.querySelector('.manual').classList.add('hide');
            document.querySelector('.random').classList.remove('hide');
        }
    }

    clearScoreHandler = () => {
        this.score = 0;
        this.procent = 0;
        this.countHit = 0;
        this.countShot = 0;
        document.getElementById('score').innerHTML = 'Результат: ' + this.score;
        document.getElementById('procentHit').innerHTML = 'Процент попадания: 0%';
    }
}

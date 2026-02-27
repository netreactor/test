class Graph2D {
    constructor() {
        this.WIN = {
            left: -5,
            bottom: -5,
            width: 10,
            height: 10
        };

        this.functionsArray = [{
            f: null,
            x: null,
            y: null,
            range: [0, 10],
            color: '',
            width: 2,
        }];

        this.canMove = false;

        this.canvas = new Canvas({
            id: 'graph2D',
            WIN: this.WIN,
            callbacks: {
                wheel: (event) => this.wheelHandler(event),
                mouseup: () => this.mouseupHandler(),
                mousedown: () => this.mousedownHandler(),
                mousemove: (event) => this.mousemoveHandler(event),
                mouseleave: () => this.mouseleaveHandler()
            }
        });

        this.render();

        document.getElementById('Fx').addEventListener('keyup', (e) => this.setFunctionHandler(e));
        document.getElementById('Xt').addEventListener('keyup', (e) => this.setParamXHandler(e));
        document.getElementById('Yt').addEventListener('keyup', (e) => this.setParamYHandler(e));
        document.getElementById('min-range').addEventListener('keyup', (e) => this.setMinRangeHandler(e));
        document.getElementById('max-range').addEventListener('keyup', (e) => this.setMaxRangeHandler(e));
        document.getElementById('color').addEventListener('keyup', (e) => this.setColorHandler(e));
        document.getElementById('width').addEventListener('keyup', (e) => this.setWidthHandler(e));
    }

    printFunction(f, color, width) {
        let x = this.WIN.left;
        const dx = this.WIN.width / 100;
        while (x < this.WIN.width + this.WIN.left) {
            this.canvas.line(x, f(x), x + dx, f(x + dx), color, width);
            x += dx;
        }
    }

    printParamFunction({ x, y, range, color, width }) {
        let t = range[0];
        const dt = (range[1] - range[0]) / 100;
        while (t < range[1]) {
            this.canvas.line(x(t), y(t), x(t + dt), y(t + dt), color, width);
            t += dt;
        }
    }

    printGraphic(func) {
        if (func?.f) {
            this.printFunction(func.f, func.color, func.width);
        } else if (func?.x && func?.y) {
            this.printParamFunction(func);
        }
    }

    printOXY() {
        const color = '#ddd';
        const top = this.WIN.height + this.WIN.bottom;
        const right = this.WIN.width + this.WIN.left;

        this.canvas.line(this.WIN.left, 0, right, 0, '#000', 2);
        this.canvas.line(0, this.WIN.bottom, 0, top, '#000', 2);

        for (let i = 1; i < right; i++) {
            this.canvas.line(i, this.WIN.bottom, i, top, color, 1);
            this.canvas.line(i, 0.1, i, -0.1, '#000', 1);
        }

        for (let i = -1; i > this.WIN.left; i--) {
            this.canvas.line(i, this.WIN.bottom, i, top, color, 1);
            this.canvas.line(i, 0.1, i, -0.1, '#000', 1);
        }

        for (let i = 1; i < top; i++) {
            this.canvas.line(this.WIN.left, i, right, i, color, 1);
            this.canvas.line(0.1, i, -0.1, i, '#000', 1);
        }

        for (let i = -1; i > this.WIN.bottom; i--) {
            this.canvas.line(this.WIN.left, i, right, i, color, 1);
            this.canvas.line(0.1, i, -0.1, i, '#000', 1);
        }
    }

    render() {
        this.canvas.clear();
        this.printOXY();
        for (let i = 0; i < this.functionsArray.length; i++) {
            this.printGraphic(this.functionsArray[i]);
        }
    }

    setFunctionHandler(event) {
        try {
            let f;
            eval(`f = function(x) {return ${event.target.value};}`);
            this.functionsArray[0].f = f;
            this.render();
        } catch (e) {}
    }

    setParamXHandler(event) {
        try {
            let x;
            eval(`x = function(t) {return ${event.target.value};}`);
            this.functionsArray[0].x = x;
            this.render();
        } catch (e) {}
    }

    setParamYHandler(event) {
        try {
            let y;
            eval(`y = function(t) {return ${event.target.value};}`);
            this.functionsArray[0].y = y;
            this.render();
        } catch (e) {}
    }

    setMinRangeHandler(event) {
        const min = Number(event.target.value);
        this.functionsArray[0].range[0] = min;
        this.render();
    }

    setMaxRangeHandler(event) {
        const max = Number(event.target.value);
        this.functionsArray[0].range[1] = max;
        this.render();
    }

    setColorHandler(event) {
        const color = event.target.value;
        this.functionsArray[0].color = color;
        this.render();
    }

    setWidthHandler(event) {
        const width = Number(event.target.value);
        this.functionsArray[0].width = width;
        this.render();
    }

    wheelHandler(event) {
        const delta = (event.wheelDelta < 0) ? -0.2 : 0.2;
        this.WIN.width += delta;
        this.WIN.height += delta;
        this.WIN.left -= delta / 2;
        this.WIN.bottom -= delta / 2;
        this.render();
    }

    mousedownHandler() {
        this.canMove = true;
    }

    mouseupHandler() {
        this.canMove = false;
    }

    mouseleaveHandler() {
        this.canMove = false;
    }

    mousemoveHandler(event) {
        if (this.canMove) {
            this.WIN.left -= this.canvas.sx(event.movementX);
            this.WIN.bottom -= this.canvas.sy(event.movementY);
        }
        this.render();
    }
}

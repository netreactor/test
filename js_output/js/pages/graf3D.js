class Graph3D {
    constructor() {
        const WIN = {
            left: -10,
            bottom: -10,
            width: 20,
            height: 20,
            Camera: new Point(0, 0, 50),
            Focus: new Point(0, 0, 30),
        }
        this.canMove = false;
        this.scene = new Cube();
        this.Math3D = new Math3D(WIN);
        this.canvas = new Canvas({
            id: 'graph3D', WIN, callbacks: {
                wheel: (event) => this.wheelHandler(event),
                mousemove: (event) => this.mouseMoveHandler(event),
                mouseup: (event) => this.mouseUpHandler(event),
                mousedown: (event) => this.mouseDownHandler(event),
                mouseleave: (event) => this.mouseLeaveHandler(event)
            }
        });

        // Figure switching
        const selectFigure = document.getElementById('selectFigure');
        if (selectFigure) {
            selectFigure.addEventListener('change', () => {
                const value = selectFigure.value;
                if (value === 'cube') this.scene = new Cube();
                else if (value === 'sphere') this.scene = new Sphere();
                this.render();
            });
        }

        this.render();
    }

    wheelHandler(event) {
        const delta = (event.wheelDelta > 0 ? 1.1 : 0.9);
        this.scene.points.forEach(point => this.Math3D.zoom(delta, point));
        this.render();
    }

    mouseDownHandler(event) {
        this.canMove = true;
    }

    mouseUpHandler(event) {
        this.canMove = false;
    }

    mouseLeaveHandler(event) {
        this.canMove = false;
    }

    mouseMoveHandler(event) {
        if (this.canMove) {
            const alphaX = (event.movementX * Math.PI / 360);
            const alphaY = (event.movementY * Math.PI / 360);
            this.scene.points.forEach(point => {
                this.Math3D.rotateOy(alphaX, point);
                this.Math3D.rotateOx(alphaY, point);
            });
            this.render();
        }
    }

    render() {
        this.canvas.clear();
        // Draw points
        for (let i = 0; i < this.scene.points.length; i++) {
            const point = this.scene.points[i];
            this.canvas.point(this.Math3D.xs(point), this.Math3D.ys(point));
        }
        // Draw edges
        this.scene.edges.forEach(edge => {
            const { p1, p2 } = edge;
            this.canvas.line(
                this.Math3D.xs(p1), this.Math3D.ys(p1),
                this.Math3D.xs(p2), this.Math3D.ys(p2),
                'red'
            );
        });
    }
}

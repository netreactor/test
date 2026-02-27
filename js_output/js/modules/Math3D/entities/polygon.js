class Polygon {
    constructor(points = [],color = '#8003') {
        this.points = points;
        this.color = color;
        this.center = new Point();
        this.distance = 0;
    }
}
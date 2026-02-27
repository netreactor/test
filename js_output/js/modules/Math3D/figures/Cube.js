class Cube extends Figure{
    constructor(){
        super();
        this.points.push(new Point(-10,-10,-10));
        this.points.push(new Point(10,-10,-10));
        this.points.push(new Point(10,10,-10));
        this.points.push(new Point(-10,10,-10));
        this.points.push(new Point(-10,-10,10));
        this.points.push(new Point(10,-10,10));
        this.points.push(new Point(10,10,10));
        this.points.push(new Point(-10,10,10));
        this.edges.push(new Edge(this.points[0],this.points[1]));
        this.edges.push(new Edge(this.points[1],this.points[2]));
        this.edges.push(new Edge(this.points[2],this.points[3]));
        this.edges.push(new Edge(this.points[3],this.points[0]));
        this.edges.push(new Edge(this.points[4],this.points[5]));
        this.edges.push(new Edge(this.points[5],this.points[6]));
        this.edges.push(new Edge(this.points[6],this.points[7]));
        this.edges.push(new Edge(this.points[7],this.points[4]));
        this.edges.push(new Edge(this.points[0],this.points[4]));
        this.edges.push(new Edge(this.points[1],this.points[5]));
        this.edges.push(new Edge(this.points[2],this.points[6]));
        this.edges.push(new Edge(this.points[3],this.points[7]));
    }
}
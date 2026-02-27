class Sphere extends Figure {
    constructor(R = 10, count = 20) {
        super();
        const dTeta = Math.PI / count;
        const dPhi = (2 * Math.PI) / count;

        for (let i = 0; i <= count; i++) {
            const teta = dTeta * i;
            for (let j = 0; j < count; j++) {
                const phi = dPhi * j;
                const x = R * Math.sin(teta) * Math.cos(phi);
                const y = R * Math.sin(teta) * Math.sin(phi);
                const z = R * Math.cos(teta);
                this.points.push(new Point(x, y, z));
            }
        }
    }
}

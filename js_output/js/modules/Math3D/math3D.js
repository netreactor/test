class Math3D {
    constructor(WIN) {
        this.WIN = WIN;
    }

    xs(point) {
        return (this.WIN.Camera.z - this.WIN.Focus.z) / (this.WIN.Camera.z - point.z) * point.x;
    }

    ys(point) {
        return (this.WIN.Camera.z - this.WIN.Focus.z) / (this.WIN.Camera.z - point.z) * point.y;
    }

    multMtoP(M, P) {
        const c = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            let s = 0;
            for (let j = 0; j < 4; j++) {
                s += M[j][i] * P[j];
            }
            c[i] = s;
        }
        return c;
    }

    zoom(delta, point) {
        const c = this.multMtoP(
            [[delta, 0, 0, 0], [0, delta, 0, 0], [0, 0, delta, 0], [0, 0, 0, 1]],
            [point.x, point.y, point.z, 1]
        );
        point.x = c[0];
        point.y = c[1];
        point.z = c[2];
    }

    move(sx, sy, sz, point) {
        const c = this.multMtoP(
            [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [sx, sy, sz, 1]],
            [point.x, point.y, point.z, 1]
        );
        point.x = c[0];
        point.y = c[1];
        point.z = c[2];
    }

    rotateOx(alpha, point) {
        const c = this.multMtoP(
            [[1, 0, 0, 0], [0, Math.cos(alpha), Math.sin(alpha), 0],
            [0, -Math.sin(alpha), Math.cos(alpha), 0], [0, 0, 0, 1]],
            [point.x, point.y, point.z, 1]
        );
        point.x = c[0];
        point.y = c[1];
        point.z = c[2];
    }

    rotateOy(alpha, point) {
        const c = this.multMtoP(
            [[Math.cos(alpha), 0, -Math.sin(alpha), 0], [0, 1, 0, 0],
            [Math.sin(alpha), 0, Math.cos(alpha), 0], [0, 0, 0, 1]],
            [point.x, point.y, point.z, 1]
        );
        point.x = c[0];
        point.y = c[1];
        point.z = c[2];
    }

    rotateOz(alpha, point) {
        const c = this.multMtoP(
            [[Math.cos(alpha), Math.sin(alpha), 0, 0], [-Math.sin(alpha), Math.cos(alpha), 0, 0],
            [0, 0, 1, 0], [0, 0, 0, 1]],
            [point.x, point.y, point.z, 1]
        );
        point.x = c[0];
        point.y = c[1];
        point.z = c[2];
    }

    calcCenter(polygon) {
        let x = 0, y = 0, z = 0;
        polygon.points.forEach(point => { x += point.x; y += point.y; z += point.z; });
        polygon.center.x = x / polygon.points.length;
        polygon.center.y = y / polygon.points.length;
        polygon.center.z = z / polygon.points.length;
    }

    calcDistance(polygon, endPoint, name) {
        polygon[name] = Math.sqrt(
            (endPoint.x - polygon.center.x) ** 2 +
            (endPoint.y - polygon.center.y) ** 2 +
            (endPoint.z - polygon.center.z) ** 2
        );
    }

    sortByArtist(polygons) {
        polygons.sort((a, b) => b.distance - a.distance);
    }
}

class Canvas {
    constructor(options) {
        this.WIN = options.WIN;
        this.canvas = document.getElementById(options.id);
        this.canvas.width = options.width || 650;
        this.canvas.height = options.height || 650;
        this.context = this.canvas.getContext('2d');

        const callbacks = options.callbacks;
        if (callbacks.wheel) this.canvas.addEventListener('wheel', callbacks.wheel);
        if (callbacks.mouseup) this.canvas.addEventListener('mouseup', callbacks.mouseup);
        if (callbacks.mousedown) this.canvas.addEventListener('mousedown', callbacks.mousedown);
        if (callbacks.mousemove) this.canvas.addEventListener('mousemove', callbacks.mousemove);
        if (callbacks.mouseleave) this.canvas.addEventListener('mouseleave', callbacks.mouseleave);
    }

    xs(x) {
        return (x - this.WIN.left) / this.WIN.width * this.canvas.width;
    }

    ys(y) {
        return (y - this.WIN.bottom) / this.WIN.height * this.canvas.height;
    }

    sx(x) {
        return x * this.WIN.width / this.canvas.width;
    }

    sy(y) {
        return y * this.WIN.height / this.canvas.height;
    }

    clear() {
        this.context.fillStyle = '#eee';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1, y1, x2, y2, color, width) {
        this.context.beginPath();
        this.context.strokeStyle = color || '#000';
        this.context.lineWidth = width || 2;
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.closePath();
        this.context.stroke();
    }

    point(x, y, color = '#f00', size = 2) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.arc(this.xs(x), this.ys(y), size, 0, Math.PI * 2);
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    }

    text(x, y, text, color = '#000', font = '24px arial') {
        this.context.font = font;
        this.context.fillStyle = color;
        this.context.fillText(text, this.xs(x), this.ys(y));
    }
}

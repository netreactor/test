class Matrix {
    constructor() {
        this.n = '';

        const buttons = document.querySelectorAll('.getMatrix');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', this.getMatrixHandler);
        }
    }

    getMatrixHandler = (event) => {
        const length = Number(document.getElementById('lengthMatrix').value);
        if (length > 0) {
            const name = event.target.dataset.functionName;
            this.n = String(name);
            const arr = (new MathMatrix())[name](length);
            let str = '';
            for (let i = 0; i < arr.length; i++) {
                str += `[${arr[i].join(', ')}]<br>`;
            }
            const matrixOutput = document.getElementById('matrixOutput');
            matrixOutput.innerHTML = str;
            const nameM = document.getElementById('choice');
            let matrixName = '';
            if (this.n == 'getZeroMatrix') {
                matrixName = 'Нулевая матрица';
            } else if (this.n == 'getOneMatrix') {
                matrixName = 'Еденичная матрица';
            } else if (this.n == 'getReverseOneMatrix') {
                matrixName = 'Обратная еденичная';
            } else if (this.n == 'getTringelMatrix') {
                matrixName = 'Треугольная матрица';
            } else if (this.n == 'getSpiralMatrix') {
                matrixName = 'Спиральная матрица';
            } else if (this.n == 'getReverseSpiralMatrix') {
                matrixName = 'Обратная спиральная';
            } else if (this.n == 'getRandomMatrix') {
                matrixName = 'Случайная матрица';
            }
            nameM.innerHTML = `Ваш выбор: ${matrixName}`;
        }
    }
}

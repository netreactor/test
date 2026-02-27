class CalculatorPage {
    constructor() {
        this.a = 0;
        this.b = 0;
        this.action = null;

        const numbers = document.querySelectorAll('.calc-number');
        for (let i = 0; i < numbers.length; i++) {
            numbers[i].addEventListener('click', this.calcNumberHandler);
        }

        const actions = document.querySelectorAll('.calc-action');
        for (let i = 0; i < actions.length; i++) {
            actions[i].addEventListener('click', this.calcActionHandler);
        }
    }

    calcNumberHandler = (event) => {
        const number = event.target.dataset.number;
        const input = document.getElementById('calc-input');
        if (input.value === '0' || input.value === 'Error') {
            input.value = number;
        } else {
            input.value += number;
        }
    }

    calcActionHandler = (event) => {
        const input = document.getElementById('calc-input');
        const _action = event.target.dataset.action;

        if (_action === 'calculate') {
            const calculator = new Calculator();
            this.b = Number(input.value);
            if (this.action && calculator[this.action]) {
                const result = calculator[this.action](this.a, this.b);
                input.value = result;
            }
            this.action = null;
        } else {
            this.a = Number(input.value);
            this.action = _action;
            input.value = '0';
        }
    }
}

class Calculator {
    add(a, b) {
        return a + b;
    }

    sub(a, b) {
        return a - b;
    }

    mult(a, b) {
        return a * b;
    }

    div(a, b) {
        if (b === 0) return 'Error';
        return a / b;
    }
}

class Calculator {
    constructor(entriesScreentextContent, resultScreentextContent) {
        this.entriesScreentextContent = entriesScreentextContent;
        this.resultScreentextContent = resultScreentextContent;
        this.cashedResult = false; // Indicates if a result is currently stored
        this.clearAll(); // Initialize calculator
    }

    // Clears all data and resets the calculator
    clearAll() {
        this.firstOperand = '';
        this.secondOperand = '';
        this.operation = null;
        this.resultScreentextContent.innerText = '' || 0; // Initialize result screen
        this.entriesScreentextContent.innerText = ''; // Initialize entries screen
    }

    // Handles the backspace button press
    backspace() {
        // If there's no first operand, do nothing
        if (!this.firstOperand) return;

        let resultValue = this.resultScreentextContent.innerText;
        let currentValue = this.entriesScreentextContent.innerText;

        // If there's a result on the result screen and no current input, remove the last digit from the result
        if (resultValue !== false && currentValue === "") {
            this.updateEntriersScreen(resultValue.slice(0, -1));
            this.resultScreentextContent.innerText = 0;
            return;
        }

        // Handle backspace for first operand, second operand, and operation
        if (this.secondOperand) {
            this.secondOperand = this.secondOperand.slice(0, -1);
        } else if (this.operation) {
            this.operation = null;
        } else {
            this.firstOperand = this.firstOperand.slice(0, -1);
        }

        this.entriesScreentextContent.innerText = currentValue.slice(0, -1);
    }

    // Handles changing the sign of the current number
    changeSign() {
        if (!this.operation) {
            if (this.firstOperand) return; // Only allow changing sign for the first operand
            this.firstOperand = "-";
            this.updateEntriersScreen('-');
        } else {
            if (this.secondOperand) return; // Only allow changing sign for the second operand
            this.secondOperand = '-';
            this.updateEntriersScreen('-');
        }
    }

    // Handles the decimal point button press
    appendDecimalPoint() {
        if (!this.firstOperand) return;

        if (!this.operation) {
            // For the first operand
            if (this.firstOperand?.includes('.')) return; // Don't allow multiple decimal points
            if (this.firstOperand === "-") return; // Don't allow a decimal point after a negative sign
            this.firstOperand = this.firstOperand + '.';
            this.updateEntriersScreen('.');
        } else {
            // For the second operand
            if (this.secondOperand === false) return;
            if (this.secondOperand?.includes('.')) return; // Don't allow multiple decimal points
            this.secondOperand = this.secondOperand + '.';
            this.updateEntriersScreen('.');
        }
    }

    // Handles the press of an operation button (+, -, *, /)
    addOperation(operation) {
        if (!this.firstOperand) return;

        let currentValue = this.entriesScreentextContent.innerText;
        let resultValue = this.resultScreentextContent.innerText;

        // If there's a result and the current value is empty, update the entries screen with the result
        if (resultValue !== "" && currentValue === "") {
            this.updateEntriersScreen(resultValue);
        }

        // If there's an existing operation, handle it
        if (this.operation) {
            if (this.secondOperand != false) {
                this.equal(operation);
                return;
            }
            this.entriesScreentextContent.innerText = currentValue.slice(0, -1);
        }

        // Set the new operation
        this.operation = operation;

        this.updateEntriersScreen(this.operation);
    }

    // Appends a number to the current operand
    appendNumber(number) {
        if (!this.operation) {
            if (this.cashedResult) {
                // If a result is displayed, start a new calculation with the number
                this.firstOperand = number;
                this.updateEntriersScreen(number);
                this.cashedResult = false;
                return;
            }
            this.firstOperand = this.firstOperand.toString() + number;
        } else {
            this.secondOperand = this.secondOperand.toString() + number;
        }
        this.updateEntriersScreen(number);
    }

    // Handles the equal button press, performing the calculation
    equal(opt) {
        if (!this.firstOperand || !this.secondOperand) return;

        const firstOperand = parseFloat(this.firstOperand);
        const secondOperand = parseFloat(this.secondOperand);

        if (isNaN(firstOperand) || isNaN(secondOperand)) return;
        let result;
        switch (this.operation) {
            case "+":
                result = firstOperand + secondOperand;
                break;
            case "−":
                result = firstOperand - secondOperand;
                break;
            case "×":
                result = firstOperand * secondOperand;
                break;
            case "÷":
                if (secondOperand === 0) {
                    return; // Handle division by zero
                }
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }
        result = parseFloat(result.toFixed(2)); // Limit result to 2 decimal places
        this.updateResultScreen(result);
        this.firstOperand = result;
        this.secondOperand = '';
        this.operation = null;

        if (opt) this.addOperation(opt); // Chain operations

    }

    // Updates the entries screen with a new value
    updateEntriersScreen(entries) {
        if (!entries) return;
        this.entriesScreentextContent.innerText = this.entriesScreentextContent.innerText + entries;
        this.resultScreentextContent.classList.remove('light-color'); // Remove the "light-color" class
    }

    // Updates the result screen with a new value
    updateResultScreen(result) {
        if (!result) return;
        this.resultScreentextContent.innerText = result.toString();
        this.resultScreentextContent.classList.add('light-color'); // Add the "light-color" class
        this.entriesScreentextContent.innerText = ""; // Clear the entries screen
        this.cashedResult = true; // Set cashedResult to true
    }
}

// HTML elements and button event listeners

const entriesScreen = document.getElementsByClassName('calculation-entries')[0];
const resultScreen = document.getElementsByClassName('calculation-result')[0];
const clearAllButton = document.querySelector('[data-clear-all]');
const deleteButton = document.querySelector('[data-delete]');
const NegativeSignButton = document.querySelector('[data-negative-number]');
const equalsButton = document.querySelector('[data-equal]');
const decimalPointButton = document.querySelector('[data-decimal-point]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

const calculator = new Calculator(entriesScreen, resultScreen);

// Event listeners for number buttons
numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.textContent);
    });
});

// Event listeners for operation buttons
operationButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.addOperation(btn.textContent);
    });
});

// Event listener for the "Clear All" button
clearAllButton.addEventListener('click', () => {
    calculator.clearAll();
});

// Event listener for the "Delete" (Backspace) button
deleteButton.addEventListener('click', () => {
    calculator.backspace();
});

// Event listener for the "Negative Sign" button
NegativeSignButton.addEventListener('click', () => {
    calculator.changeSign();
});

// Event listener for the "Equals" button
equalsButton.addEventListener("click", () => {
    calculator.equal();
});
// Event listener for the "Decimal Point" button
decimalPointButton.addEventListener('click', () => {
    calculator.appendDecimalPoint();
})

// __GUETIX
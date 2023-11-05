class Calculator {
    constructor(entriesScreentextContent, resultScreentextContent) {
        this.entriesScreentextContent = entriesScreentextContent,
            this.resultScreentextContent = resultScreentextContent,
            this.clearAll()
    }
    clearAll() {
        this.firstOperand = ''
        this.secondOperand = ''
        this.operation = null
        this.resultScreentextContent.innerText = '' || 0
        this.entriesScreentextContent.innerText = ''
    }
    backspace() {
        let resultValue = this.resultScreentextContent.innerText
        let currentValue = this.entriesScreentextContent.innerText;
        if (resultValue != false && currentValue === "") {
            this.updateEntriersScreen(resultValue.slice(0 , -1))
            return
        }
        
        if (!this.firstOperand) return
        if (this.secondOperand) {
            this.secondOperand = this.secondOperand.slice(0, -1);
        } else if (this.operation) {
            this.operation = null;
        } else {
            this.firstOperand = this.firstOperand.slice(0, -1);
        }

       
        this.entriesScreentextContent.innerText = currentValue.slice(0, -1);
    }
    appendDecimalPoint() {
        if (!this.firstOperand) return
        if (!this.operation) {
            if (this.firstOperand?.includes('.')) return
            this.firstOperand = this.firstOperand + '.'
            this.updateEntriersScreen('.')
        } else {
            if (this.secondOperand == false) return
            if (this.secondOperand?.includes('.')) return
            this.secondOperand = this.secondOperand + '.'
            this.updateEntriersScreen('.')
        }
    }

    addOperation(operation) {
        if (!this.firstOperand) return;
        let currentValue = this.entriesScreentextContent.innerText;
        let resultValue = this.resultScreentextContent.innerText

        // If there's a result and the current value is empty, update the entries screen with the result
        if (resultValue !== "" && currentValue === "") {
            this.updateEntriersScreen(resultValue)
        }
        if (this.operation) {
            
            if (this.secondOperand != false) {
                this.equal(operation)
                return
            }
            this.entriesScreentextContent.innerText = currentValue.slice(0, -1)
        }
        this.operation = operation

        this.updateEntriersScreen(this.operation)
    }

    appendNumber(number) {
        if (!this.operation) {
            if (this.resultScreentextContent.innerText != false) return
            this.firstOperand = this.firstOperand.toString() + number
        } else {
            this.secondOperand = this.secondOperand.toString() + number
        }
        this.updateEntriersScreen(number)
    }

    equal(opt) {
        if (!this.firstOperand || !this.secondOperand) return
        const firstOperand = parseFloat(this.firstOperand)
        const secondOperand = parseFloat(this.secondOperand)
        let result;
        if (firstOperand && secondOperand) {
            switch (this.operation) {
                case "+":
                    result = firstOperand + secondOperand
                    break
                case "−":
                    result = firstOperand - secondOperand
                    break
                case "×":
                    result = firstOperand * secondOperand
                    break
                case "÷":
                    result = firstOperand / secondOperand
                    break
                default: return
            }
            result = result.toFixed(2)
            this.updateResultScreen(result)
            this.firstOperand = result
            this.secondOperand = ''
            this.operation = null

            if (opt) this.addOperation(opt)
        }
    }
    updateEntriersScreen(entries) {
        if (!entries) return
        this.entriesScreentextContent.innerText = this.entriesScreentextContent.innerText + entries
        this.resultScreentextContent.classList.remove('light-color')
    }

    updateResultScreen(result) {
        if (!result) return
        this.resultScreentextContent.innerText = result.toString()
        this.resultScreentextContent.classList.add('light-color')
        this.entriesScreentextContent.innerText = ""
    }
}


const entriesScreen = document.getElementsByClassName('calculation-entries')[0]
const resultScreen = document.getElementsByClassName('calculation-result')[0]
const clearAllButton = document.querySelector('[data-clear-all]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equal]')
const decimalPointButton = document.querySelector('[data-decimal-Point')
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')


const calculator = new Calculator(entriesScreen, resultScreen)

numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.textContent)
    })
})
operationButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.addOperation(btn.textContent)
    })
})

clearAllButton.addEventListener('click', () => {
    calculator.clearAll()
})
deleteButton.addEventListener('click', () => {
    calculator.backspace()
})
equalsButton.addEventListener("click", () => {
    calculator.equal()
})
decimalPointButton.addEventListener('click', () => {
    calculator.appendDecimalPoint()
})

// __GUETIX
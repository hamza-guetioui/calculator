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
    Delete() {

    }
    point() {
        if (!this.operation) {
            if (this.firstOperand == null) return
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
        if (!this.firstOperand) return
        if (this.resultScreentextContent.innerText != false &&
            this.entriesScreentextContent.innerText === "") this.updateEntriersScreen(
                this.resultScreentextContent.innerText
            )
        if (operation === ".") {
            this.point()
            return
        }
        if (this.operation) {
            if (this.secondOperand) {
                this.equal(operation)
                return
            }
            this.entriesScreentextContent.innerText = this.entriesScreentextContent.innerText.slice(0, -1)
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
        const fOpr = parseFloat(this.firstOperand)
        const sOpr = parseFloat(this.secondOperand)
        let result;
        if (fOpr && sOpr) {
            switch (this.operation) {
                case "+":
                    result = fOpr + sOpr
                    break
                case "−":
                    result = fOpr - sOpr
                    break
                case "×":
                    result = fOpr * sOpr
                    break
                case "÷":
                    result = fOpr / sOpr
                    break
                default: return
            }
            result = result.toFixed(2)
            this.redefine(result)
            this.updateResultScreen(result)
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

    redefine(result) {
        this.firstOperand = result
        this.secondOperand = ''
        this.operation = null
    }
}


const entriesScreen = document.getElementsByClassName('calculation-entries')[0]
const resultScreen = document.getElementsByClassName('calculation-result')[0]
const clearAllButton = document.querySelector('[data-clear-all]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equal]')
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
equalsButton.addEventListener("click", () => {
    calculator.equal()
})
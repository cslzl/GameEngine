class Scene {
    constructor() {
        this.elements = []
        this.background = 'white'
    }

    setBackground(color) {
        this.background = color
    }

    addElement(element) {
        element.scene = this
        this.elements.push(element)
    }

    removeElement(element) {
        this.elements = this.elements.filter(item => item !== element)
    }

    replaceElement(oldElement, newElement) {
        let oldIndex = this.elements.findIndex(item => item === oldElement)
        this.elements.splice(oldIndex, 1, newElement)
    }

    update() {
        if (window.debugMode) {
            this.debug?.()
            for (let element of this.elements) {
                element.debug?.()
            }
        }
        for (let element of this.elements) {
            element.update?.()
        }
    }

    draw() {
        game.context.fillStyle = this.background
        game.context.fillRect(0, 0, game.width, game.height)
        game.context.fillStyle = '#000000'
        for (let element of this.elements) {
            element.draw()
        }
    }
}

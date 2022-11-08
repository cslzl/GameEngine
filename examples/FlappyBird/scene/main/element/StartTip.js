class StartTip {
    constructor() {
        this.image = new GameImage('start')
        this.image.x = 108
        this.image.y = 130
        this.label = new GameLabel('Press space to start', 68, 330, '28px sans-serif', 'white')
        this.addToScene = false
    }

    draw() {
        if (this.addToScene) {
            return
        }
        this.scene.addElement(this.image)
        this.scene.addElement(this.label)
        this.addToScene = true
    }

    remove() {
        this.scene.removeElement(this.image)
        this.scene.removeElement(this.label)
    }
}

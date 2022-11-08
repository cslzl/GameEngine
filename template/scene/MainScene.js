class MainScene extends Scene {
    constructor() {
        super()
        this.image = new GameImage('demo')
        this.image.x = 70
        this.image.y = 70
        this.addElement(this.image)
    }

    update() {
        super.update()
        this.image.rotation += 0.1
        if (this.image.rotation > 360) {
            this.image.rotation = 0
        }
    }

    debug() {
        this.image.x = config.x.value
        this.image.y = config.y.value
    }
}

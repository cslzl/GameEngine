class Animation {
    constructor(name) {
        let { number, duration } = animationConfig.find(item => item.name === name)
        this.name = name
        this.number = number
        this.duration = duration
        this.imageIndex = 0
        this.frameCount = 0
        this.currentImage = new GameImage(`${this.name}${this.imageIndex}`)
        this.addToScene = false
    }

    update() {
        this.frameCount += 1
        if (this.frameCount === this.duration) {
            this.frameCount = 0
            this.imageIndex = (this.imageIndex + 1) % this.number
            this.currentImage.replace(`${this.name}${this.imageIndex}`)
        }
    }

    draw() {
        if (this.addToScene) {
            return
        }
        this.scene.addElement(this.currentImage)
        this.addToScene = true
    }
}

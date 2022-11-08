class Ground {
    constructor() {
        this.grounds = []
        this.skipCount = 5
        this.addToScene = false
        for (let i = 0; i < 20; i++) {
            let ground = new GameImage('ground')
            ground.x = i * 25
            ground.y = 500
            this.grounds.push(ground)
        }
    }

    update() {
        this.skipCount--
        let offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 5
            offset = 20
        }
        for (let ground of this.grounds) {
            ground.x += offset
        }
    }

    draw() {
        if (this.addToScene) {
            return
        }
        for (let ground of this.grounds) {
            this.scene.addElement(ground)
        }
        this.addToScene = true
    }
}

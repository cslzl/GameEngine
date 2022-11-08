class Pipes {
    constructor() {
        this.pipes = []
        this.columsOfPipes = 3
        this.pipeXSpace = 200
        this.pipeYSpace = 150
        for (let i = 0; i < this.columsOfPipes; i++) {
            let p1 = new GameImage('pipe')
            p1.x = 500 + i * this.pipeXSpace
            p1.flipY = true
            let p2 = new GameImage('pipe')
            p2.x = p1.x
            this.setPipesY(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
        this.addToScene = false
    }

    setPipesY(p1, p2) {
        p1.y = randomBetween(200 - p1.h - this.pipeYSpace, 0)
        p2.y = p1.y + p1.h + this.pipeYSpace
    }

    update() {
        for (let i = 0; i < this.pipes.length; i += 2) {
            let p1 = this.pipes[i]
            let p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -this.pipeXSpace) {
                p1.x = 400
                p2.x = 400
                this.setPipesY(p1, p2)
            }
        }
    }

    draw() {
        if (this.addToScene) {
            return
        }
        for (let pipe of this.pipes) {
            this.scene.addElement(pipe)
        }
        this.addToScene = true
    }

    collide(bird) {
        for (let pipe of this.pipes) {
            if (rectIntersects(pipe, bird).intersect) {
                return true
            }
        }
    }

    debug() {
        this.pipeYSpace = config.pipeYSpace.value
    }
}

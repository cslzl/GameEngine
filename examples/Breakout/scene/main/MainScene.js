class MainScene extends Scene {
    constructor() {
        super()
        this.setup()
        this.bindActions()
        // drag for debugging
        this.drag()
    }

    setup() {
        this.score = 0
        this.paddle = new Paddle()
        this.ball = new Ball()
        this.blocks = window.blocks ?? [
            new Block({ x: 5, y: 0, }),
            new Block({ x: 1, y: 1, }),
            new Block({ x: 3, y: 1, health: 3, }),
        ]
        this.scoreLabel = new GameLabel(`score: ${this.score}`, 10, 290, '14px sans-serif', 'white')
        this.setBackground('#444')
        this.addElement(this.paddle)
        this.addElement(this.ball)
        for (let block of this.blocks) {
            this.addElement(block)
        }
        this.addElement(this.scoreLabel)
    }

    bindActions() {
        game.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        game.registerAction('d', () => {
            this.paddle.moveRight()
        })
        game.registerAction('f', () => {
            this.ball.fire()
        })
    }

    update() {
        super.update()
        if (this.ball.y > 300 - this.ball.h) {
            let scene = new EndScene()
            game.replaceScene(scene)
        }
        if (this.paddle.collide(this.ball)) {
            this.ball.rebound()
        }
        for (let block of this.blocks) {
            if (block.collide(this.ball)) {
                block.hit()
                this.ball.rebound()
                this.score += 100
                this.scoreLabel.replace(`score: ${this.score}`)
            }
        }
    }

    drag() {
        let enableDrag = false
        let deltaX = 0
        let deltaY = 0
        game.canvas.addEventListener('mousedown', (event) => {
            let x = event.offsetX
            let y = event.offsetY
            if (this.ball.hasPoint(x, y)) {
                enableDrag = true
                let delta = this.ball.deltaDistance(x, y)
                deltaX = delta.x
                deltaY = delta.y
            }
        })
        game.canvas.addEventListener('mousemove', (event) => {
            if (enableDrag) {
                this.ball.x = event.offsetX - deltaX
                this.ball.y = event.offsetY - deltaY
            }
        })
        game.canvas.addEventListener('mouseup', (event) => {
            enableDrag = false
        })
    }
}

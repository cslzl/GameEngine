class MainScene extends Scene {
    constructor() {
        super()
        this.sky = new GameImage('sky')
        this.pipes = new Pipes()
        this.ground = new Ground()
        this.bird = new Bird()
        this.startTip = new StartTip()
        this.addElement(this.sky)
        this.addElement(this.pipes)
        this.addElement(this.ground)
        this.addElement(this.bird)
        this.addElement(this.startTip)
        //
        this.start = false
        this.gameover = false
        this.bindActions()
    }

    bindActions() {
        game.registerAction(' ', () => {
            if (this.gameover) {
                return
            }
            if (!this.start) {
                this.start = true
                this.startTip.remove()
            }
            this.bird.jump()
        })
    }

    update() {
        if (!this.start || this.gameover) {
            return
        }
        super.update()
        if (this.pipes.collide(this.bird)) {
            this.gameover = true
            let endTip = new EndTip()
            this.addElement(endTip)
        }
    }
}

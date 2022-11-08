class EndTip {
    constructor() {
        this.image = new GameImage('gameover')
        this.image.x = 104
        this.image.y = 200
        this.label = new GameLabel('Press r to continue', 77, 300, '28px sans-serif', 'white')
        this.addToScene = false

        game.registerAction('r', () => {
            let scene = new MainScene()
            game.replaceScene(scene)
        })
    }

    draw() {
        if (this.addToScene) {
            return
        }
        this.scene.addElement(this.image)
        this.scene.addElement(this.label)
        this.addToScene = true
    }
}

class EndScene extends Scene {
    constructor() {
        super()
        let endImage = new GameImage('end')
        let label1 = new GameLabel('Gameover', 87, 260, '40px sans-serif')
        let label2 = new GameLabel('Press r to continue', 55, 320, '28px sans-serif')
        //
        this.addElement(endImage)
        this.addElement(label1)
        this.addElement(label2)
        //
        game.registerAction('r', () => {
            let scene = new StartScene()
            game.replaceScene(scene)
        })
    }
}

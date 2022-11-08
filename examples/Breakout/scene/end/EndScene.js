class EndScene extends Scene {
    constructor() {
        super()
        this.setBackground('#444')
        let label1 = new GameLabel('Gameover', 106, 120, '40px sans-serif', 'white')
        let label2 = new GameLabel('Press r to continue', 77, 200, '28px sans-serif', 'white')
        this.addElement(label1)
        this.addElement(label2)
        // 
        game.registerAction('r', () => {
            let scene = new StartScene()
            game.replaceScene(scene)
        })
    }
}

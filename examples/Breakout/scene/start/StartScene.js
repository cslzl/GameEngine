class StartScene extends Scene {
    constructor() {
        super()
        this.setBackground('#444')
        let label1 = new GameLabel('Breakout', 117, 100, '40px sans-serif', 'white')
        let label2 = new GameLabel('Press K to start', 97, 170, '28px sans-serif', 'white')
        let label3 = new GameLabel('Press B to edit', 101, 220, '28px sans-serif', 'white')
        let label4 = new GameLabel('F for fire', 159, 260, '20px sans-serif', 'white')
        this.addElement(label1)
        this.addElement(label2)
        this.addElement(label3)
        this.addElement(label4)
        // 
        game.registerAction('k', () => {
            let scene = new MainScene()
            game.replaceScene(scene)
        })
        game.registerAction('b', () => {
            let scene = new EditorScene()
            game.replaceScene(scene)
        })
    }
}

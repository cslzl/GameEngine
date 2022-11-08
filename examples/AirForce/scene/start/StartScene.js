class StartScene extends Scene {
    constructor() {
        super()
        let skyImage = new GameImage('sky')
        let playerImage = new GameImage('player')
        playerImage.x = 125
        playerImage.y = 350
        let label1 = new GameLabel('AirForce', 105, 150, '40px sans-serif', '#ffffff')
        let label2 = new GameLabel('Press K to start', 85, 230, '28px sans-serif', '#ffffff')
        let label3 = new GameLabel('W/S/A/D for direction', 87, 270, '20px sans-serif', '#ffffff')
        let label4 = new GameLabel('J for fire', 144, 300, '20px sans-serif', '#ffffff')
        //
        this.addElement(skyImage)
        this.addElement(playerImage)
        this.addElement(label1)
        this.addElement(label2)
        this.addElement(label3)
        this.addElement(label4)
        //
        game.registerAction('k', () => {
            let scene = new MainScene()
            game.replaceScene(scene)
        })
    }
}

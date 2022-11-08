let _main = () => {
    let images = {
        ball: 'img/ball.png',
        block1: 'img/block1.png',
        block2: 'img/block2.png',
        block3: 'img/block3.png',
        editor: 'img/editor.png',
        paddle: 'img/paddle.png',
    }

    new Game(images, () => {
        let scene = new StartScene()
        game.runWithScene(scene)
    })
    openDebugger()
}

_main()

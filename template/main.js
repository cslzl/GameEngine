let _main = () => {
    let images = {
        demo: 'img/demo.png',
    }

    new Game(images, () => {
        let scene = new MainScene()
        game.runWithScene(scene)
    })
    openDebugger()
}

_main()

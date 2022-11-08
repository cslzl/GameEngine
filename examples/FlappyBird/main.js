let _main = () => {
    let images = {
        bird0: 'img/animation/bird0.png',
        bird1: 'img/animation/bird1.png',
        bird2: 'img/animation/bird2.png',
        bird3: 'img/animation/bird3.png',
        gameover: 'img/gameover.png',
        ground: 'img/ground.png',
        pipe: 'img/pipe.png',
        sky: 'img/sky.png',
        start: 'img/start.png',        
    }

    new Game(images, () => {
        let scene = new MainScene()
        game.runWithScene(scene)
    })
    openDebugger()
}

_main()

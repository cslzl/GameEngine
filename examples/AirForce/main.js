let _main = () => {
    let images = {
        cloud: 'img/cloud.png',
        end: 'img/end.png',
        enemy_bullet: 'img/enemy_bullet.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        fire: 'img/fire.png',
        player_bullet: 'img/player_bullet.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
    }

    new Game(images, () => {
        let scene = new StartScene()
        game.runWithScene(scene)
    })
    openDebugger()
}

_main()

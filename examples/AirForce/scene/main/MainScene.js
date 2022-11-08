class MainScene extends Scene {
    constructor() {
        super()
        this.setup()
        this.bindActions()
    }

    setup() {
        // add sky, cloud, player
        this.sky = new Sky()
        this.cloud = new Cloud()
        this.player = new Player()
        this.player.x = 125
        this.player.y = 350
        this.addElement(this.sky)
        this.addElement(this.cloud)
        this.addElement(this.player)
        // add enemies
        let numberOfEnemies = 3
        for (let i = 0; i < numberOfEnemies; i++) {
            let enemy = new Enemy()
            this.addElement(enemy)
        }
    }

    bindActions() {
        game.registerAction('a', () => {
            this.player.moveLeft()
        })
        game.registerAction('d', () => {
            this.player.moveRight()
        })
        game.registerAction('w', () => {
            this.player.moveUp()
        })
        game.registerAction('s', () => {
            this.player.moveDown()
        })
        game.registerAction('j', () => {
            this.player.fire()
        })
    }

    hitEnemy(enemy, bullet) {
        // particle effect
        let x = enemy.x + enemy.w / 2
        let y = enemy.y + enemy.h / 2
        let particle = new ParticleSystem('fire', x, y)
        this.addElement(particle)
        // reset enemy position
        enemy.setup()
        // remove bullet
        this.elements = this.elements.filter((element) => element !== bullet)
    }

    gameover() {
        let x = this.player.x + this.player.w / 2
        let y = this.player.y + this.player.h / 2
        let particle = new ParticleSystem('fire', x, y)
        this.addElement(particle)
        setTimeout(() => {
            let scene = new EndScene()
            game.replaceScene(scene)
        }, 500)
    }

    update() {
        super.update()
        let playerBullets = this.elements.filter((element) => {
            return (element.constructor.name === 'PlayerBullet') && element.y >= 0 && element.y <= 540
        })
        let enemies = this.elements.filter((element) => {
            return element.constructor.name === 'Enemy' && element.y >= 0 && element.y <= 540
        })
        let enemyBullets = this.elements.filter((element) => {
            return element.constructor.name === 'EnemyBullet' && element.y >= 0 && element.y <= 540
        })
        //
        for (let enemy of enemies) {
            for (let bullet of playerBullets) {
                if (enemy.collide(bullet)) {
                    // enemy is hit by bullet
                    this.hitEnemy(enemy, bullet)
                }
            }
            // enemy collided with player, game over
            if (enemy.collide(this.player)) {
                this.gameover()
            }
        }
        // player is hit by bullet, game over
        for (let bullet of enemyBullets) {
            if (this.player.collide(bullet)) {
                this.gameover()
            }
        }
    }
}

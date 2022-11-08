class Enemy extends GameImage {
    constructor() {
        let type = randomBetween(0, 4)
        super(`enemy${type}`)
        this.setup()
    }

    setup() {
        this.speed = 1
        this.x = randomBetween(0, 276)
        this.y = -randomBetween(70, 300)
        this.cooldown = 200
        this.currentCooldown = this.cooldown
    }

    fire() {
        if (this.currentCooldown === 0) {
            this.currentCooldown = this.cooldown
            let bullet = new EnemyBullet()
            bullet.x = this.x + this.w / 2 - 7
            bullet.y = this.y + 60
            this.scene.addElement(bullet)
        }
    }

    update() {
        this.y += this.speed
        if (this.y > 540) {
            this.setup()
            return
        }
        if (this.currentCooldown > 0) {
            this.currentCooldown--
        }
        this.fire()
    }

    collide(element) {
        return rectIntersects(this, element).intersect
    }
}

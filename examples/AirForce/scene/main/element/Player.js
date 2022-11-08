class Player extends GameImage {
    constructor() {
        super('player')
        this.setup()
    }

    setup() {
        this.speed = 5
        this.cooldown = 10
        this.currentCooldown = this.cooldown
    }

    update() {
        if (this.currentCooldown > 0) {
            this.currentCooldown--
        }
    }

    fire() {
        if (this.currentCooldown === 0) {
            this.currentCooldown = this.cooldown
            let bullet = new PlayerBullet()
            bullet.x = this.x + this.w / 2 - 5
            bullet.y = this.y
            this.scene.addElement(bullet)
        }
    }

    collide(element) {
        return rectIntersects(this, element).intersect
    }

    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }

    debug() {
        this.speed = config.player_speed.value
        this.cooldown = config.player_bullet_cooldown.value
    }
}

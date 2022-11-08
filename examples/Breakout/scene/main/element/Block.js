class Block extends GameImage {
    constructor(config) {
        let health = config.health || 1
        super(`block${health}`)
        this.x = config.x * 50
        this.y = config.y * 20
        this.health = health
        this.alive = true
    }

    hit() {
        this.health--
        if (this.health < 1) {
            this.alive = false
            this.scene.removeElement(this)
        } else {
            this.replace(`block${this.health}`)
        }
    }

    collide(ball) {
        let { intersect, direction } = rectIntersects(this, ball)
        if (this.alive && intersect) {
            ball.collideDirection = direction
            return true
        } else {
            return false
        }
    }
}

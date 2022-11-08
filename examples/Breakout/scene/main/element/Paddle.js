class Paddle extends GameImage {
    constructor() {
        super('paddle')
        this.x = 100
        this.y = 250
        this.speed = 7
    }

    move(x) {
        if (x < 0) {
            x = 0
        } else if (x > 400 - this.w) {
            x = 400 - this.w
        }
        this.x = x
    }

    moveLeft() {
        this.move(this.x - this.speed)
    }

    moveRight() {
        this.move(this.x + this.speed)
    }

    collide(ball) {
        let { intersect, direction } = rectIntersects(this, ball)
        if (intersect) {
            ball.collideDirection = direction
            return true
        } else {
            return false
        }
    }
}

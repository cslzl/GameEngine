class Ball extends GameImage {
    constructor() {
        super('ball')
        this.x = 100
        this.y = 100
        this.speedX = 5
        this.speedY = 5
        this.fired = false
        this.collideDirection = ''
    }

    fire() {
        this.fired = true
    }

    update() {
        if (this.fired) {
            if (this.x < 0 || this.x + this.w > 400) {
                this.speedX *= -1
            }
            if (this.y < 0 || this.y + this.h > 300) {
                this.speedY *= -1
            }
            this.x += this.speedX
            this.y += this.speedY
        }
    }

    rebound() {
        if (this.collideDirection === 'x') {
            this.speedX *= -1
        } else if (this.collideDirection === 'y') {
            this.speedY *= -1
        } else if (this.collideDirection === 'both') {
            this.speedX *= -1
            this.speedY *= -1
        }
    }

    hasPoint(x, y) {
        let xIn = x >= this.x && x <= this.x + this.w
        let yIn = y >= this.y && y <= this.y + this.h
        return xIn && yIn
    }

    deltaDistance(x, y) {
        let deltaX = x - this.x
        let deltaY = y - this.y
        return {
            x: deltaX,
            y: deltaY,
        }
    }
}

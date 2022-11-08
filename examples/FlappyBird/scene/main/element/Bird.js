class Bird extends Animation {
    constructor() {
        super('bird')
        this.x = 120
        this.y = 200
        this.w = this.currentImage.w
        this.h = this.currentImage.h
        this.rotation = 0
        this.vx = 2     // x-speed
        this.vy = 0     // y-speed
        this.gy = 10    // gravity
    }

    update() {
        super.update()
        this.y += this.vy
        this.vy += this.gy * 0.06
        // canvas(600) - ground(100) - bird(24)
        let h = 476
        if (this.y > h) {
            this.y = h
        }
        if (this.rotation < 90 && this.y < h) {
            this.rotation += 2
        }
    }

    draw() {
        super.draw()
        this.currentImage.x = this.x
        this.currentImage.y = this.y
        this.currentImage.flipX = this.flipX
        this.currentImage.rotation = this.rotation
    }

    jump() {
        this.vy = -6
        this.rotation = -45
    }
}

class GameImage {
    constructor(name) {
        this.image = game.imageByName(name)
        this.x = 0
        this.y = 0
        this.w = this.image.width
        this.h = this.image.height
        // 
        this.flipX = false
        this.flipY = false
        this.rotation = 0
    }

    draw() {
        let context = game.context
        context.save()
        let w2 = this.w / 2
        let h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        let scaleX = this.flipX ? -1 : 1
        let scaleY = this.flipY ? -1 : 1
        context.scale(scaleX, scaleY)
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.image, 0, 0)
        context.restore()
    }

    update() {
    }

    replace(name) {
        this.image = game.imageByName(name)
    }
}

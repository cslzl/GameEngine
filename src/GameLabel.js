class GameLabel {
    constructor(text, x, y, font, color='#000000') {
        this.text = text
        this.x = x
        this.y = y
        this.font = font
        this.color = color
    }

    draw() {
        game.context.font = this.font
        game.context.fillStyle = this.color
        game.context.fillText(this.text, this.x, this.y)
        game.context.fillStyle = '#000000'
    }

    replace(text) {
        this.text = text
    }
}

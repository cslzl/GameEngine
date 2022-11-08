class PlayerBullet extends GameImage {
    constructor() {
        super('player_bullet')
        this.setup()
    }

    setup() {
        this.speed = 5
    }

    update() {
        this.y -= this.speed
    }

    debug() {
        this.speed = config.player_bullet_speed.value
    }
}

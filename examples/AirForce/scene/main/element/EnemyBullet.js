class EnemyBullet extends GameImage {
    constructor() {
        super('enemy_bullet')
        this.speed = 3
    }

    update() {
        this.y += this.speed
    }
}

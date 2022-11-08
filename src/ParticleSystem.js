class Particle extends GameImage {
    constructor(imageName, x, y, vx, vy, life) {
        super(imageName)
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.life = life
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
    }
}


class ParticleSystem {
    constructor(imageName, x, y, speed=5, life=7, number=100, duration=30) {
        this.imageName = imageName
        this.x = x
        this.y = y
        this.speed = speed          // max speed of each particle
        this.life = life            // life of each particle
        this.number = number        // number of particles
        this.duration = duration    // particle system duration(frames)
        this.particles = []
    }

    update() {
        this.duration--
        if (this.duration < 0) {
            // delete particle system from scene
            this.scene.removeElement(this)
            return
        }
        // add particle
        if (this.particles.length < this.number) {
            let vx = randomBetween(-this.speed, this.speed)
            let vy = randomBetween(-this.speed, this.speed)
            let particle = new Particle(this.imageName, this.x, this.y, vx, vy, this.life)
            this.particles.push(particle)
        }
        // update all particles
        for (let particle of this.particles) {
            particle.update()
        }
        // remove dead particles
        this.particles = this.particles.filter(particle => particle.life > 0)
    }

    draw() {
        for (let particle of this.particles) {
            particle.draw()
        }
    }
}

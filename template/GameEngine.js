class Animation {
    constructor(name) {
        let { number, duration } = animationConfig.find(item => item.name === name)
        this.name = name
        this.number = number
        this.duration = duration
        this.imageIndex = 0
        this.frameCount = 0
        this.currentImage = new GameImage(`${this.name}${this.imageIndex}`)
        this.addToScene = false
    }

    update() {
        this.frameCount += 1
        if (this.frameCount === this.duration) {
            this.frameCount = 0
            this.imageIndex = (this.imageIndex + 1) % this.number
            this.currentImage.replace(`${this.name}${this.imageIndex}`)
        }
    }

    draw() {
        if (this.addToScene) {
            return
        }
        this.scene.addElement(this.currentImage)
        this.addToScene = true
    }
}




/*
After calling openDebugger(), the debugger provides two features:
    1. Listen to the "p" key to pause the main loop
    2. Generate debug slider on page based on config.js
*/

const sliderTemplate = (key, config) => {
    let { name, value, min, max } = config
    let template = `
        <div>
            <label>
                <input class="auto-slider" type="range"
                    value="${value}"
                    min="${min}"
                    max="${max}"
                    data-key="${key}">
                ${name}: <span class="label">${value}</span>
            </label>
        </div>
    `
    return template
}

const insertSliders = () => {
    let html = '<hr><div style="color: gray;">Press "p" to pause</div>'
    for (let [k, c] of Object.entries(config)) {
        html += sliderTemplate(k, c)
    }
    document.querySelector('canvas').insertAdjacentHTML('afterend', html)
}

const bindEvents = () => {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'p') {
            // pause
            window.pause = !window.pause
        }
    })

    for (let slider of document.querySelectorAll('.auto-slider')) {
        slider.addEventListener('input', () => {
            let key = slider.dataset.key
            let value = slider.value
            eval(`config.${key}.value = ${value}`)
            slider.nextElementSibling.innerText = value
        })
    }
}

const openDebugger = () => {
    window.debugMode = true
    insertSliders()
    bindEvents()
}




/*
private
    init()
    update()
    clear()
    draw()
    runloop()

only for internal
    context
    imageByName(name)

public
    game
    width, height
    new Game(images, callback)
    runWithScene(scene)
    replaceScene(scene)
    registerAction(key, callback)
*/
class Game {
    constructor(images, callback) {
        this.images = images
        this.callback = callback
        // 
        this.canvas = document.querySelector('canvas')
        this.context = this.canvas.getContext('2d')
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        // 
        window.addEventListener('keydown', (event) => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', (event) => {
            this.keydowns[event.key] = false
        })
        // 
        this.init()
        window.game = this
    }

    init() {
        let length = Object.keys(this.images).length
        let loaded = []
        for (let [name, path] of Object.entries(this.images)) {
            let img = new Image()
            img.src = path
            img.onload = () => {
                this.images[name] = img
                loaded.push(1)
                if (loaded.length === length) {
                    // after all images are loaded successfully, call the 'callback'
                    this.callback()
                }
            }
        }
    }

    update() {
        if (window.pause) {
            return
        }
        this.scene.update()
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    draw() {
        this.scene.draw()
    }

    runloop() {
        for (let [key, callback] of Object.entries(this.actions)) {
            if (this.keydowns[key]) {
                // if the key is down, call the registered action
                callback()
            }
        }
        this.update()
        this.clear()
        this.draw()
        setTimeout(() => {
            this.runloop()
        }, 1000 / config?.fps?.value ?? 60)
    }

    imageByName(name) {
        let image = this.images[name]
        return image
    }

    runWithScene(scene) {
        this.scene = scene
        setTimeout(() => {
            this.runloop()
        }, 1000 / (config?.fps?.value ?? 60))
    }

    replaceScene(scene) {
        this.scene = scene
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }
}




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




class Scene {
    constructor() {
        this.elements = []
        this.background = 'white'
    }

    setBackground(color) {
        this.background = color
    }

    addElement(element) {
        element.scene = this
        this.elements.push(element)
    }

    removeElement(element) {
        this.elements = this.elements.filter(item => item !== element)
    }

    replaceElement(oldElement, newElement) {
        let oldIndex = this.elements.findIndex(item => item === oldElement)
        this.elements.splice(oldIndex, 1, newElement)
    }

    update() {
        if (window.debugMode) {
            this.debug?.()
            for (let element of this.elements) {
                element.debug?.()
            }
        }
        for (let element of this.elements) {
            element.update?.()
        }
    }

    draw() {
        game.context.fillStyle = this.background
        game.context.fillRect(0, 0, game.width, game.height)
        game.context.fillStyle = '#000000'
        for (let element of this.elements) {
            element.draw()
        }
    }
}




const rectIntersects = (a, b) => {
    let minx1 = a.x
    let miny1 = a.y
    let maxx1 = a.x + a.w
    let maxy1 = a.y + a.h
    //
    let minx2 = b.x
    let miny2 = b.y
    let maxx2 = b.x + b.w
    let maxy2 = b.y + b.h
    //
    let minx = Math.max(minx1, minx2)
    let miny = Math.max(miny1, miny2)
    let maxx = Math.min(maxx1, maxx2)
    let maxy = Math.min(maxy1, maxy2)
    //
    let intersect = minx <= maxx && miny <= maxy
    let direction = ''
    // intersect from the x-direction or the y-direction
    if (intersect) {
        let deltaX = maxx - minx
        let deltaY = maxy - miny
        if (deltaX < deltaY) {
            direction = 'x'
        } else if (deltaX > deltaY) {
            direction = 'y'
        } else {
            direction = 'both'
        }
    }
    let result = {
        intersect: intersect,
        direction: direction,
    }
    return result
}


const randomBetween = (start, end) => {
    let n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

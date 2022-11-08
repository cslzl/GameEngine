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

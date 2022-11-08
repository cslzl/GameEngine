class EditorScene extends Scene {
    constructor() {
        super()
        window.blocks = []
        this.setup()
        this.edit()
        game.registerAction('k', () => {
            let scene = new MainScene()
            game.replaceScene(scene)
        })
    }

    setup() {
        let editor = new GameImage('editor')
        let block1 = new Block({ x: 1, y: 8, health: 1, })
        let block2 = new Block({ x: 1, y: 10, health: 2, })
        let block3 = new Block({ x: 1, y: 12, health: 3, })
        let label1 = new GameLabel('one health point', 110, 172, '12px sans-serif')
        let label2 = new GameLabel('two health points', 110, 215, '12px sans-serif')
        let label3 = new GameLabel('three health points', 110, 255, '12px sans-serif')
        let label4 = new GameLabel('Click the grey box one or more times to edit, press K to start', 20, 285, '12px sans-serif')
        this.addElement(editor)
        this.addElement(block1)
        this.addElement(block2)
        this.addElement(block3)
        this.addElement(label1)
        this.addElement(label2)
        this.addElement(label3)
        this.addElement(label4)
    }

    edit() {
        const blocks = window.blocks
        game.canvas.addEventListener('mousedown', (event) => {
            let x = Math.floor(event.offsetX / 50)
            let y = Math.floor(event.offsetY / 20)
            if (y > 6) {
                return
            }
            let selected = false
            for (let i = 0; i < blocks.length; i++) {
                let block = blocks[i]
                if (block.x === x * 50 && block.y === y * 20) {
                    let health = (block.health + 1) % 4
                    if (health === 0) {
                        // cancel
                        blocks.splice(i, 1)
                        this.removeElement(block)
                    } else {
                        // change health
                        let config = { x: x, y: y, health: health, }
                        let oldElement = block
                        let newElement = new Block(config)
                        blocks[i] = newElement
                        this.replaceElement(oldElement, newElement)
                    }
                    selected = true
                }
            }
            if (!selected) {
                let config = { x: x, y: y, health: 1, }
                let block = new Block(config)
                blocks.push(block)
                this.addElement(block)
            }
        })
    }
}

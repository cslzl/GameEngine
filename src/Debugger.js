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

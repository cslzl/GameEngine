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

const Chunk = {
    canvasWidth: 800,
    canvasHeight: 600,
    pixelSize: 40,
    KEY_MAPPING: {
        39: "right",
        40: "down",
        37: "left",
        38: "up"
    },
    started: true,
    attrs: {},
    gameHeight: function() {
        return this.attrs.gameHeight || (this.attrs.gameHeight = this.canvasHeight / this.pixelSize);
    },
    gameWidth: function() {
        return this.attrs.gameWidth || (this.attrs.gameWidth = this.canvasWidth / this.pixelSize);
    },
    canvas: function() {
        if (Chunk.context) { return Chunk.context; }
        var canvas = document.getElementById("chunk-game");
        Chunk.context = canvas.getContext("2d");
        return Chunk.context;
    },
    executeNTimesPerSecond: function(tickCallback, gameSpeed) {
        tickCallback();
        Chunk.processID = setInterval(function() {
            tickCallback();
        }, 1000 / gameSpeed);
    },
    onArrowKey: function(callback) {
        document.addEventListener('keydown', function(e) {
            if (Chunk.KEY_MAPPING[e.which]) {
                e.preventDefault();
                callback(Chunk.KEY_MAPPING[e.which]);
            }
        });
    },
    endGame: function() {
        this.started = false
        clearInterval(Chunk.processID);
    },
    draw: function(objects) {
        if (this.started) {
            Chunk.clear();
            Chunk.drawObjects(objects);
        }
    },
    clear: function() {
        Chunk.canvas().clearRect(0, 0, Chunk.canvasWidth, Chunk.canvasHeight);
    },
    drawObjects: function(objects) {
        var ui = this;
        objects.forEach(function(object) {
            object.pixels.forEach(function(pixel) {
                ui.drawPixel(object.color, pixel);
            });
        });
    },
    drawPixel: function(color, pixel) {
        Chunk.canvas().fillStyle = color;
        var translatedPixel = Chunk.translatePixel(pixel);
        Chunk.context.fillRect(translatedPixel.left, translatedPixel.top, Chunk.pixelSize, Chunk.pixelSize);
    },
    translatePixel: function(pixel) {
        return { left: pixel.left * Chunk.pixelSize,
            top: pixel.top * Chunk.pixelSize }
    },
    gameBoundaries: function() {
        if (this.attrs.boundaries) { return this.attrs.boundaries; }
        this.attrs.boundaries = [];
        for (var top = -1; top <= Chunk.gameHeight(); top++) {
            this.attrs.boundaries.push({ top: top, left: -1});
            this.attrs.boundaries.push({ top: top, left: this.gameWidth() + 1});
        }
        for (var left = -1; left <= Chunk.gameWidth(); left++) {
            this.attrs.boundaries.push({ top: -1, left: left});
            this.attrs.boundaries.push({ top: this.gameHeight() + 1, left: left });
        }
        return this.attrs.boundaries;
    },
    detectCollisionBetween: function(objectA, objectB) {
        return objectA.some(function(pixelA) {
            return objectB.some(function(pixelB) {
                return pixelB.top === pixelA.top && pixelB.left === pixelA.left;
            });
        });
    },
    randomLocation: function() {
        return {
            top: Math.floor(Math.random()*Chunk.gameHeight()),
            left: Math.floor(Math.random()*Chunk.gameWidth()),
        }
    },
    flashMessage: function(message) {
        var canvas = document.getElementById("chunk-game");
        var context = canvas.getContext('2d');
        context.font = '20pt Calibri';
        context.fillStyle = 'yellow';
        context.fillText(message, 275, 100);
    }
}

export default Chunk;
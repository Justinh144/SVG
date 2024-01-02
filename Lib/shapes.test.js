const {Circle, Square, Triangle} = require("./shapes")



describe('Circle', () => {
    test('Displays Shape', () => {
        const shape = new Circle();
        var color=('blue')
        shape.setColor(color);
        expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" fill="${color}"></circle>`);
    });
});

describe('Square', () => {
    test('Displays Shape', () => {
        const shape = new Square();
        var color =('green')
        shape.setColor(color);
        expect(shape.render()).toEqual(`<rect x="50" height="200" width="200" fill="${color}"></rect>`);

    });
});

describe('Triangle', () => {
    test('Displays Shape', () => {
        const shape = new Triangle();
        var color =('pink')
        shape.setColor(color);
        expect(shape.render()).toEqual(`<polygon points="0, 200 300, 200 150,0" fill="${color}"></polygon>`);
    });
});
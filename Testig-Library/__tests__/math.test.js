const {add,subtract,multiply,division} = require('../math');

test('adds 1 + 2 to equal to 3',() => {
    expect(add(1,2)).toBe(3);
});

test('subtracts 5 - 2 to equal 3', () => {
    expect(subtract(5, 2)).toBe(3);
});

test('Multiply 5 * 10 to equal 50',() => {
    expect(multiply(5,10)).toBe(50);
});

test('Division 10 /5 to equal 2', () => {
    expect(division(10,5)).toBe(2);
});
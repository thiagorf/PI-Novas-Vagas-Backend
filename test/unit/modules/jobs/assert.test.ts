const sum = (x: number, y: number) => {
    return x + y;
};

it("should run", () => {
    const x = 2;
    const y = 3;

    expect(sum(x, y)).toBe(5);
});

describe("Hello world", function() {
    it("says hello", function() {
        expect(helloWorld()).toEqual("Hello world!");
    });
});

describe("welcome world", function() {
    it("says welcome", function() {
        expect(welcomeWorld()).toEqual("Welcome world!");
    });
});
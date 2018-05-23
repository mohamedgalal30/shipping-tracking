require("./global");
require("./bootstrap");

before(function (done) {
    factory.load()
    beforeAll.exec(done);
});

after(function (done) {
    afterAll.exec(done);
});
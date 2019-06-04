require("mocha");

const
    Chai = require("chai"),
    ChaiAsPromised = require("chai-as-promised");

Chai.use(ChaiAsPromised);
Chai.should();

describe("a-dollar", () => {
    require("../lib");

    describe("Array", () => {
        describe("#a$Map", () => {
            it("should correctly map array values", () =>
                [1, 2, 3, 4, 5].a$Map(async it => it + 1).should.eventually.deep.equal([2, 3, 4, 5, 6]));

            it("should throw error when callback throws", () =>
                [1, 2, 3, 4, 5].a$Map(async it => {
                    throw new Error("err")
                }).should.be.rejectedWith(Error));

            it("should pass index as second argument to callback", () =>
                [2, 3, 4, 5, 6].a$Map(async (it, i) => i).should.eventually.deep.equal([0, 1, 2, 3, 4]))
        });

        const eachTest = each => {
            it("should correctly call callback on all values", async () => {
                const values = [];
                await each([1, 2, 3, 4, 5], async it => values.push(it + 1));
                values.should.deep.equal([2, 3, 4, 5, 6]);
            });

            it("should throw error when callback throws", () =>
                each([1, 2, 3, 4, 5], async it => {
                    throw new Error("err")
                }).should.be.rejectedWith(Error));
        };

        describe("#a$ForEach", () => eachTest((arr, cb) => arr.a$ForEach(cb)));
        describe("#a$Each", () => eachTest((arr, cb) => arr.a$Each(cb)));
    });

    describe("Promise", () => {
        describe("a$Map", () => {
            async function getArray() {
                return [1, 2, 3, 4, 5];
            }

            it("should map the promise-returned array", async () => {
                const val = await getArray().a$Map(it => it + 1);
                val.should.deep.equal([2, 3, 4, 5, 6]);
            });
        });
    });
});

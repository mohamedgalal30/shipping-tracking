require(TEST_ROOT_PATH);
const taskFixture = require(`${TEST_FIXTURES_PATH}/Task`);

describe(TEST_NAME, function () {

    context('search tasks', function () {
        let sandBox, findStub, paginateStub, countStub;
        beforeEach(() => {
            sandBox = sinon.sandbox.create();
            const findReturn = {
                paginate: () => { }
            };

            findStub = sandBox.stub(Task, "find").returns(findReturn);
            paginateStub = sandBox.stub(findReturn, 'paginate').returns([]);
            countStub = sandBox.stub(Task, "count").returns(9);
        })


        afterEach(() => {
            sandBox.restore();
        })


        it("should return default number of tasks per page if no page size specified", async function () {
            const defaultLimit = sails.config.appConfig.defaultPaginationLimit;
            const result = await TaskService.search();
            return paginateStub.getCall(0).args[0].limit.should.be.equal(defaultLimit);
        });

        it("should return the specified number of tasks per page", async function () {
            const limit = 30;
            const result = await TaskService.search(null, limit);
            return paginateStub.getCall(0).args[0].limit.should.be.equal(limit);
        });

        it("should sort tasks by delivery date DESC by default", async function () {
            const defaultSort = 'deliveryDate DESC';
            const result = await TaskService.search();
            return findStub.getCall(0).args[0].sort.should.be.equal(defaultSort);
        });

        it("should sort tasks by specified sort column and direction", async function () {
            const sort = 'column DIR';
            const result = await TaskService.search(null, null, null, sort);
            return findStub.getCall(0).args[0].sort.should.be.equal(sort);
        });

        it("should return only the desired attributes", async function () {
            const selects = taskFixture.searchSelects;
            const result = await TaskService.search();
            return findStub.getCall(0).args[0].select.should.be.deep.equal(selects);
        });

        it("should return the filtered tasks when filter is present", async function () {
            const where = { critreria: true };
            const result = await TaskService.search(where);
            return findStub.getCall(0).args[0].where.should.be.deep.equal(where);
        });

        it("should return all tasks when no filters", async function () {
            const where = {};
            const result = await TaskService.search();
            return findStub.getCall(0).args[0].where.should.be.deep.equal(where);
        });

        it("should return the right count of returned tasks", async function () {
            const where = { critreria: true };
            const result = await TaskService.search(where);
            const countCriteria = countStub.getCall(0).args[0];
            const findCriteria = findStub.getCall(0).args[0].where;
            return countCriteria.should.be.deep.equal(findCriteria);
        });

        it("should return result witch has list of the data and total count", async function () {
            const where = { critreria: true };
            const result = await TaskService.search(where);
            return result.should.have.property("list").that.is.an('array') &&
                result.should.have.property("total").that.is.a('number')
        });
        
        it("should truncate empty values from filter", async function () {
            const where = { exist: true, nonExist: "" };
            const result = await TaskService.search(where);
            const expectedWhere = {exist: true}
            return findStub.getCall(0).args[0].where.should.be.deep.equal(expectedWhere);
        });

    });



});

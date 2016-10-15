var expect = require('chai').expect;
var ToDoStore = require("../../src/stores/todostore");
var ToDoActions = require("../../src/actions/todoactions");
var sinon = require("sinon");
var nock = require('nock');

describe("ToDoStore", function(){
  it("is configured to listen to ToDoActions", function(){
    //expect(ToDoStore.listenables).to.include(ToDoActions);
    expect(ToDoActions.updateList).to.be.a("function");
  });
  it("inserts a new todo item", function(done){
    let expectedResult = {
      action:"triggered",
      data: "hello"
    };
    nock('http://localhost/')
      .post('/todo',{
        "Item": "hello"
      })
      .reply(200,{"Response":"Succes"})

    sinon.stub(ToDoStore,"trigger",function(data){
      expect(data).to.deep.equal(expectedResult);
      expect(nock.isDone()).to.equal(true);
      ToDoStore.trigger.restore();
      done();
    })
    ToDoStore.onUpdateList("hello");
  })

  it("fetches the list of todos", function(done){
    let expectedData=[
      {Item:'Item1', Id:1},
      {Item:'Item2', Id:2}]
    nock('http://localhost/')
        .get('/todos')
        .reply(200,expectedData)
    ToDoStore.onFetchList();
    sinon.stub(ToDoStore,"trigger",function(trigger){
      expect(trigger.data.body).to.deep.equal(expectedData)
      ToDoStore.trigger.restore();
      done();
    });
  });
});

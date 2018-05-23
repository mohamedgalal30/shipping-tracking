const nodepath = require("path");
const async = require("async");
const _ = require("lodash");

const sinon = require("sinon");
const chai = require("chai");

//==============================================================================
//-- global properties

Object.defineProperty(global, "TEST_ROOT_PATH", {
  get: function() {
    return nodepath.join(process.cwd(), "test");
  }
});


//------------------------------------------------------------------------------

Object.defineProperty(global, "TEST_FACTORIES_PATH", {
  get: function() {
    return nodepath.join(TEST_ROOT_PATH, "factories");
  }
});

//------------------------------------------------------------------------------

Object.defineProperty(global, "TEST_FIXTURES_PATH", {
  get: function() {
    return nodepath.join(TEST_ROOT_PATH, "fixtures");
  }
});

//------------------------------------------------------------------------------

Object.defineProperty(global, "TEST_NAME", {
  get: function() {
    var name = "Anonymous";
    var caller = arguments.callee.caller.toString();
    var args = arguments.callee.caller.arguments;
    var match = caller.match(/exports, *require, *module, *__filename, *__dirname/);

    if (match) {
      var filename = args[3] || name;
      name = filename.replace(TEST_ROOT_PATH, "")
                .replace(/^.?unit(\\|\/)?/, "")
                .replace(/(\.(test|spec))?\.js$/, "");
    }
    return name;
  }
});

//==============================================================================

Object.defineProperty(global, "sinon", {
  get: function() { return sinon; }
});

Object.defineProperty(global, "beforeAll", {
  get: function() { return beforeAll; }
});

Object.defineProperty(global, "afterAll", {
  get: function() { return afterAll; }
});

//==============================================================================

var _beforeAll = [];
function beforeAll(callback) {
  _beforeAll.push(callback);
}

beforeAll.exec = function(done) {
  async.eachSeries(_beforeAll, function(item, next) {
    if (item.length > 0) {
      item(next);
    } else {
      item();
      next();
    }
  }, function(err) {
    done && done(err);
  });
};

//------------------------------------------------------------------------------

var _afterAll = [];
function afterAll(callback) {
  _afterAll.unshift(callback);
}

afterAll.exec = function(done) {
  async.eachSeries(_afterAll, function(item, next) {
    if (item.length > 0) {
      item(next);
    } else {
      item();
      next();
    }
  }, function(err) {
    done && done(err);
  });
};

//==============================================================================
//-- initializers...

chai.use(require("sinon-chai"));
chai.should();

//==============================================================================


//==============================================================================
//-- global properties

var xhr = null;
Object.defineProperty(global, "xhr", {
  get: function() {
    if (!xhr) {
      var app = (sails.express) ? sails.express.app : sails.hooks.http.app;
      xhr = require("supertest")(app);
    }
    return xhr;
  }
});

//------------------------------------------------------------------------------

var request = null;
Object.defineProperty(global, "request", {
  get: function() {
    if (!request) {
      var app = (sails.express) ? sails.express.app : sails.hooks.http.app;
      request = new (require("supertest-session")({app: app}))();
    }
    return request;
  }
});

//------------------------------------------------------------------------------

var factory = require("sails-factory");
Object.defineProperty(global, "factory", {
  get: function() {
    return factory;
  }
});
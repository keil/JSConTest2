//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.20.2
//////////////////////////////////////////////////

// load configuration
load("config.js");

// load logging engine
load("__lib_log4js.js");
var __logger = new __Log(__Log.NONE, __Log.consoleLogger);

// load system
load("system.js");

// load proxy
load("proxy.js");



//////////////////////////////////////////////////
// TEST
//////////////////////////////////////////////////

// load proxy
load("__lib_assert.js");

// load basic unittest
// load("__test_basic-unittest.js");

// load parser test
load("permit.js");
load("parser.js");
//load("__test_parser.js");
//load("__test_contract-literal.js");
load("__test_contract.js");

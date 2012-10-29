//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 1.00
//////////////////////////////////////////////////

// load configuration
load("config.js");

// load logging engine
load("__lib_log4js.js");
var __logger = new __Log(__Log.NONE, __Log.consoleLogger);

// load system
load("system.js");

// load trace path
load("path.js");

// load proxy
load("proxy.js");

// load permit
load("permit.js")

// load violation
load("violation.js")

// load contract
load("contract.js");

// load parser
load("parser.js");

// load assert
load("__lib_assert.js");



//////////////////////////////////////////////////
// TEST
//////////////////////////////////////////////////


// LOAD BASIC UNITTESTS
// load("__test_basic-unittest.js");

// LOAD PARSER TESTS
//load("permit.js");
//load("parser.js");

// LOAD PERMIT TESTS
//load("__test_parser.js");
//load("__test_contract_read.js");
//load("__test_contract_write.js");
//load("__test_set_read.js");
//load("__test_set_write.js");

//load("__test_permit.js");
//load("__test_permit2.js");
//load("__test_permit3.js");
//load("__test_permit4.js");
//load("__test_permit5.js");
//load("__test_permit6.js");

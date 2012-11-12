//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 2.00
//////////////////////////////////////////////////

// load hash set
load("__lib/__lib_apache_hashset.js");
// load string padding
load("__lib/__lib_padding.js");
// Load new waek map
load("__lib/__lib_harmony_weakmap.js");
// Load reflect API
load("__lib/__lib_reflect.js");
// load assert
load("__lib/__lib_apache_assert.js");



// load configuration
load("config.js");

// load logging engine
load("__lib/__lib_log4js.js");
var __logger = new __Log(__Log.NONE, __Log.consoleLogger);

// load system
load("system.js");

// load trace path
load("path.js");

// load proxy
load("proxy.js");

// load contract
load("contract.js");

// load permit
load("permit.js")

// load violation
load("violation.js")

// load parser
load("parser.js");



//////////////////////////////////////////////////
// TEST
//////////////////////////////////////////////////

/* Test Parser **/ // (TESTED)
//load("__test/__test_parser.js");

/* Test Path **/ // (TESTED)
//load("__test/__test_path.js");


/** Test Contract **/ // (TESTED)
//load("__test/__test_contract.js");

/** Test Contract (reduced) **/ // (TESTED)
//load("__test/__test_contract_reduce.js");

/* Test Contract (derive) **/
//load("__test/__test_contract_read.js");
//load("__test/__test_contract_write.js");
//load("__test/__test_set_read.js");
load("__test/__test_set_write.js");


/* Test Permit **/
//load("__test_permit.js");
//load("__test_permit2.js");
//load("__test_permit3.js");
//load("__test_permit4.js");
//load("__test_permit5.js");
//load("__test_permit6.js");


/* Test Permit (special) **/
//load("__test_scope.js");

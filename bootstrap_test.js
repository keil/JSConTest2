//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 2.01
//////////////////////////////////////////////////

// load hash set
load("__lib/__lib_apache_hashtable.js");
load("__lib/__lib_apache_hashset.js");
// load string padding
load("__lib/__lib_padding.js");
// Load new waek map
load("__lib/__lib_harmony_weakmap.js");
// Load reflect API
load("__lib/__lib_reflect.js");
// load assert
load("__lib/__lib_apache_assert.js");

// load logging engine
load("__lib/__lib_log4js.js");
var __logger = new __Log(__Log.NONE, __Log.consoleLogger);


// TODO
load("__JsConTest/jscontest.events.handler.effects3.js");


// load system
load("system.js");

// load apc
load("apc.js");

// load configuration
load("config.js");

// load trace path
load("path.js");

// load contract
load("contract.js");

// load violation
load("violation.js")

// load parser
load("parser.js");

// load proxy
load("proxy.js");

// load permit
load("permit.js")



//////////////////////////////////////////////////
// TEST
//////////////////////////////////////////////////

var __start = new Date().getTime();

/* Test Parser **/ // (TESTED)
//load("__test/__test_parser.js");

/* Test Path **/ // (TESTED)
//load("__test/__test_path.js");
//load("__test/__test_path2.js");

/** Test Contract **/ // (TESTED)
//load("__test/__test_contract.js");

/** Test Contract (reduced) **/ // (TESTED)
//load("__test/__test_contract_reduce.js");

/* Test Contract (derive) **/  // (TESTED)
//load("__test/__test_contract_read.js");
//load("__test/__test_contract_write.js");
//load("__test/__test_set_read.js");
//load("__test/__test_set_write.js");


/* Test Permit **/  // (TESTED)
//load("__test/__test_permit.js");
//load("__test/__test_permit2.js");
//load("__test/__test_permit3.js");
//load("__test/__test_permit4.js");
//load("__test/__test_permit5.js");
//load("__test/__test_permit6.js");
//load("__test/__test_permit7.js");


/* Test Permit (special) **/ // (TESTED)
//load("__test/__test_scope.js");
//load("__test/__test_scope2.js");


/* Test Path (membership) **/ // 
load("__test/__test_subset.js");
load("__test/__test_superset.js");
load("__test/__test_sreduce.js");
//load("__test/__test_flattening.js");




var __end = new Date().getTime();

__sysout("%% START: " + __start);
__sysout("%% END: " + __end);
__sysout("%% TIME: " + (__end - __start));


quit();

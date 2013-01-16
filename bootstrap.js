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

// load logging engine
//load("__lib/__lib_log4js.js");
//var __logger = new __Log(__Log.NONE, __Log.consoleLogger);

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

// load testcase
//load("__test/__test_.js");


// load assert
load("__lib/__lib_apache_assert.js");
load("__test/__test_contract_subset.js");


// ERROR
//var test = __APC.permit("(a.b)?", {});


quit();

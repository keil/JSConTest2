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

// load testcase
load("__test/__test_.js");

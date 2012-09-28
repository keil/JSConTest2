//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Version: 0.20
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

// load testcase
load("__test_.js");

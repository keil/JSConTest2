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

/* google v7 benchmark **/



load("../casestudy/trunk/google.v7/run.js");

/*load("../casestudy/trunk/google.v7/base.js");
load("../casestudy/trunk/google.v7/revisions.html");
load("../casestudy/trunk/google.v7/raytrace.js");
load("../casestudy/trunk/google.v7/style.css");
load("../casestudy/trunk/google.v7/crypto.js");
load("../casestudy/trunk/oogle.v7/splay.js");
load("../casestudy/trunk/oogle.v7/navier-stokes.js");
load("../casestudy/trunk/google.v7/regexp.js");
load("../casestudy/trunk/google.v7/earley-boyer.js");
load("../casestudy/trunk/google.v7/richards.js");
load("../casestudy/trunk/google.v7/deltablue.js");
load("../casestudy/trunk/google.v7/v8-logo.png");
*/
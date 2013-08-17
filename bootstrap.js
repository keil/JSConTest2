/*
 * JavaScript Reflection API
 *  for Access Permission Contracts
 *
 * Copyright (c) 2013, Proglang, University of Freiburg.
 *  http://proglang.informatik.uni-freiburg.de/
 * All rights reserved.
 *
 * Author Matthias Keil
 *  http://www.informatik.uni-freiburg.de/~keilr/
 *
 * $Date$
 * $Rev$
 */

// load hash set
load("__lib/__lib_apache_hashtable.js");
load("__lib/__lib_apache_hashset.js");
// load string padding
load("__lib/__lib_padding.js");
// Load new waek map
load("__lib/__lib_harmony_weakmap.js");
// Load reflect API
load("__lib/__lib_reflect.js");
// Load StringMap
load("__lib/__lib_StringMap.js");

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
load("pathtrie.js");

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

// load assert
load("__lib/__lib_apache_assert.js");

// load testcase
//load("__test/__test_.js");
//
///* Containment Calculus */
//load("__test/__test_contract_subset.js");
//load("__test/__test_contract_subset2.js");

g = function(x) {
//x.a=654;
//x.a;
//
}

h = __APC.permitArgs("arguments.0.@", g);
t = h({a:'4711'});

/*
function Object() {
		this.freeze = function() {};
	//	this.email setter = chaputureObject;
	//	this.__defineSetter__
	this.__defineSetter__("email", chaputureObject); 
	//return new Object().__defineSetter__("email", chaputureObject);
}
(new Object()).freeze(); 
function chaputureObject(value) {
		__sysout("###" + value);
}
*/

/*
with({Object:__APC.permit("?", Object)}) {
	function chaputureObject(value) {
			__sysout("### " + value);
		}

	Object.sdasd = 765;
		//Object.xprototype.__defineSetter__('user', chaputureObject);
}

var test = new Object();
test.user = "chacha";
*/

/*
Object.prototype.__defineSetter__('user', chaputureObject);

function chaputureObject(value) {
		__sysout("### " + value);
}


var test = new Object();
test.user = "chacha";
*/

var mail = {};
(function(){
 mail.test = "chacha";
 chacha = "love";
})(mail);

__sysout("@" + mail.test);
//__sysout("@" + mail.chacha);

var mail = (function() {

		var test = "chahca";
		return this;

})();



__look();


__testcase("__test/__test_contract_subset2.js");



/* normal */
var obj = {a:{}, b:{}};
obj.a = obj.b;

var result = (obj.a == obj.b) ? true: false; // true
__sysout(result);

/* proxy */
var obj = __APC.permit("(a+b)", {a:{}, b:{}}, "obj");
obj.a = obj.b;

var result = (obj.a == obj.b) ? true: false; // false
__sysout(result);


var obj = {};

var p1 = new Proxy(obj, {});
var p2 = new Proxy(obj, {});

var result = (p1 == p2) ? true: false; // false
__sysout("#" + result);

var result = (p1 === p2) ? true: false; // false
__sysout("#" + result);


var obj = {};
__sysout("RESULT: " +  obj==new Proxy(obj, {}));
__sysout("RESULT: " +  obj===new Proxy(obj, {}));



//
//
//quit();

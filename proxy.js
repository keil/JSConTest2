//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Version: 0.11
//////////////////////////////////////////////////



// Load logging engine
load("log4js.js");
var __logger = new __Log(__Log.NONE, __Log.consoleLogger);

// load trace path
load("path.js");



//////////////////////////////////////////////////
// MISCELLANEOUS
//////////////////////////////////////////////////

/* API Standard Output
*/
function __sysout(value) {
		if(typeof print != "undefined")
				// JS Shell concole oputput
				print(value);
		else if(document.write != "undefined")
				document.write(value);
		else if(typeof alert  != "undefined")
				// Standard alert notification
				alert(value);
}

/* Close Handler
*/
function __closeHandler() {
		return {
				get: function(receiver, name) {
						quit();
				}};
};
// assign close handler to __
__ = Proxy.create(__closeHandler());


/* Dump Values to String Output
*/
function __dump(value) {
		if (value === Object(value)) return "[" + typeof value + "]";
		if (typeof value == "string") return "\"" + value + "\"";
		return "" + value;
}



//////////////////////////////////////////////////
// HANDLER
//////////////////////////////////////////////////

/* Standard Access Handler
*/
function __AccessHandler(target, path) {
		return {
				get: function(receiver, name) {
						// new path
						tracePath = path.clone();
						tracePath.addProperty(name);

						// register at loggin engine
						__accessLogger.set(__Type.READ, tracePath);

						// value
						value =  target[name];
						return __createMembrane(value, tracePath);

						// TODO
						// * check if is wrapped/ hthen extens handler
						//
				},
						set: function(receiver, name, value) {
								// new path
								tracePath = path.clone();
								tracePath.addProperty(name);

								// register at loggin engine & return
								__accessLogger.set(__Type.WRITE, tracePath);

								// TODO		
								// * wrap object to wwrite ?
								//

								target[name] = value;
								return true;
						}
		}
};



//////////////////////////////////////////////////
// MEMBRANE
//////////////////////////////////////////////////
function __createMembrane(init, name) {

		//var path 
		initPath = new __TracePath(name);

		/* wrap Object / Function or return Primitive Value
		*/
		function wrap(target) {

				/* IF primitive value
				*/
				if (target !== Object(target)) {
						return target;
				}

				/* WRAP function
				*/
				function wrapFunction(func, base, args) {
						return wrap(func.apply(base, Array.prototype.map.call(args, wrap)));
				}

				// create AccessHandler
				var accessHandler = __AccessHandler(target, initPath);

				// FUNCTION
				if (typeof target === "function") {
						function callTrap() {
								var value = wrapFunction(target, wrap(this), arguments);
								return value;
						}
						function constructTrap() {
								function forward(args) {
										return target.apply(this, args);
								}
								return wrap(new forward(Array.prototype.map.call(arguments, wrap)));
						}
						return Proxy.createFunction(accessHandler, callTrap, constructTrap);
				}
				// OBJECT
				else {
						var prototype = wrap(Object.getPrototypeOf(target));
						return Proxy.create(accessHandler, prototype);

						// TODO
						// * add access handler as property to the proxy
						// * security reasons ???
						// var proxy = Proxy.create(accessHandler, prototype);
						// proxy["accesshandler"] = accessHandler;
						// return proxy;

				}
		}

		// RETURN wrapped object
		return wrap(init);
}



//////////////////////////////////////////////////
// MEMBRANE
//////////////////////////////////////////////////
function __applyProxy(base, name) {
		obj = base[name];
		base[name] = __createMembrane(obj, name);
}











//////////////////////////////////////////////////
// TEST
//////////////////////////////////////////////////




var p = {
		a: 6,
		b: {bb: 8},
		f: function(x) { return x },
		g: function(x) { return x.a },
		h: function(x) { this.q = x }
};

var o = {
		a: 6,
		b: {bb: 8},
		f: function(x) { return x },
		g: function(x) { return x.a },
		h: function(x) { this.q = x }
};
o[2] = {c: 7};




__applyProxy(this, "o");

__sysout("1 ##################################################");
var obbb = o.b.bb;
var obbb = o.b.bb;
__sysout("2 ##################################################");
var oa = o.a;
__sysout("3 ##################################################");
var x = o;
var y = x.b;
var z = y.bb;



// CALL EVALUATE
__evaluate();

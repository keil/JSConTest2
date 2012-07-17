//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Version: 0.11
//////////////////////////////////////////////////



// Load logging engine
load("log4js.js");
var __logger = new __Log(__Log.NONE, __Log.consoleLogger);

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
		__sysout("CREATE AccessHandler FOR " + path.toString());
		
		return {
				get: function(receiver, name) {
											//__sysout(path);
						__sysout("ACCESS " + name + " ON "  + path.toString());
							path.addProperty(name);


						/**/__logger.debug("call GET on AccessHandler");
						__sysout("[PROPERTY READ] " + name);
						value =  target[name];
						return value; 
				},
						set: function(receiver, name, value) {
								/**/__logger.debug("call SET on AccessHandler");
								__sysout("[PROPERTY WRITE] " + name);
								target[name] = value;
								return true;
						}
		}
};



//////////////////////////////////////////////////
// MEMBRANE
//////////////////////////////////////////////////
function __createMembrane(init, name) {

		/* wrap Target Value
		*/
		function wrap(target) {
				//		__sysout(name);
				/**/__logger.debug("CALL wrap for " + __dump(target));
				var value = wrapValue(target);
				/**/__logger.debug("WRAP " + __dump(target) + " AS " + __dump(value));
				return value;
		}

		/* wrap Object / Function or return Primitive Value
		*/
		function wrapValue(target) {

				/* IF primitive value
				*/
				if (target !== Object(target)) {
						/**/__logger.debug("RETURN primitive value " + __dump(target));
						return target;
				}

				/* WRAP function
				*/
				function wrapFunction(func, base, args) {
						/**/__logger.debug("CALL wrapFunction for " + __dump(func));
						var value = wrapFunctionCall(func, base, args);
						/**/__logger.debug("WRAP " + __dump(func) + " AS " + __dump(value));
						return value;
				}

				/* WRAP function
				*/
				function wrapFunctionCall(func, base, args) {
						/**/__logger.debug("CALL wrapFunctionCall for " + __dump(func));
						return wrap(func.apply(base, Array.prototype.map.call(args, wrap)));
				}




				//var path 
				var tracePath = new TracePath(name);


				// create AccessHandler
				var accessHandler = __AccessHandler(target, tracePath.prefix());
				// create MetaProxy
				var handler = Proxy.create(Object.freeze({
						get: function(receiver, name) {
								return function() {

										//__sysout("#" + arguments.);

										/**/__logger.debug("CALL get ON MetaProxy " + __dump(name));
										var value = wrapFunction(accessHandler[name], accessHandler, arguments);
										/**/__logger.debug("RETURN FROM MetaProxy " + __dump(value));
										return value;
								}
						}
				}));

				// FUNCTION
				if (typeof target === "function") {
						function callTrap() {
								/**/__logger.debug("CALL trap ON " + __dump(target));
								var value = wrapFunction(target, wrap(this), arguments);
								/**/__logger.debug("RETURN FROM trap " + __dump(value));
								return value;
						}
						function constructTrap() {
								/**/__logger.debug("CALL constructTrap FOR " + __dump(target));
								function forward(args) {
										/**/__logger.debug("CALL forward ON " + __dump(args));
										return target.apply(this, args);
								}
								return wrap(new forward(Array.prototype.map.call(arguments, wrap)));
						}
						/**/__logger.debug("CREATE FunctionProxy FOR " + __dump(target));
						return Proxy.createFunction(handler, callTrap, constructTrap);
				}
				// OBJECT
				else {
						var prototype = wrap(Object.getPrototypeOf(target));
						/**/__logger.debug("CREATE Proxy FOR " + __dump(target));
						return Proxy.create(handler, prototype);
				}
		}

		// RETURN wrapped object
		return Object.freeze({
				wrapper: wrap(init)
		}).wrapper;
}



//////////////////////////////////////////////////
// MEMBRANE
//////////////////////////////////////////////////
function __applyProxy(base, name) {
		obj = base[name];
		base[name] = __createMembrane(obj, name);
}






// todo encapsulate add method





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
//var m = createMembrane(o, "o");
//var w = m.wrapper;





//var w = __createMembrane(o, "o");

__applyProxy(this, "o");
var w = o;

__applyProxy(this, "p");


//var t = createMembrane(this);
//this = t.wrapper;


print("o =", __dump(o))
print("w =", __dump(w));

//var f = w.f;
//var x = f(66);
//var x = f({a: 1});
//var x = w.f({a: 1});
//var a = x.a;

//var wb = w.b;
//var wr = w.r;
//var wf = w.f;
//var wf3 = w.f(3);
//var wfx = w.f({a: 6});
//var wgx = w.g({a: {aa: 7}});
//var wh4 = new w.h(4);

__sysout("1 ##################################################");
var pa = p.a;
__sysout("2 ##################################################");
var pb = p.b;
__sysout("3 ##################################################");
var pbbb = p.b.bb;
__sysout("4 ##################################################");
var pbbb2 = pb.bb;
__sysout("5 ##################################################");


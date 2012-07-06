//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
//////////////////////////////////////////////////



// Load logging engine
load("log4js.js");
var __logger = new __Log(__Log.DEBUG, __Log.consoleLogger);



//////////////////////////////////////////////////
// MISCELLANEOUS
//////////////////////////////////////////////////

/* 
 * API Standard Output
 */
function __sysout(value) {
		if(typeof print != "undefined")
				// JS Shell concole oputput
				print(value);
		else if(typeof alert  != "undefined")
				// Standard alert notification
				alert(value);
}

/*
 * Close Handler
 */
function __closeHandler() {
		return {
				get: function(receiver, name) {
						quit();
				}};
};
// assign close handler to __
__ = Proxy.create(__closeHandler());



//////////////////////////////////////////////////
// HANDLER
//////////////////////////////////////////////////

/*
 * Standard Access Handler
 */
function __AccessHandler(target) {
		return {
				get: function(receiver, name) {
						/**/__logger.debug("call GET on Accesshandler");
						__sysout("[PROPERTY READ] " + name);
						value =  target[name];
						return value; 
				},
						set: function(receiver, name, val) {
								/**/__logger.debug("call SET on Accesshandler");
								__sysout("[PROPERTY WRITE] " + name);
								target[name] = val;
								return true;
						}
		}};



function createHandler(obj) {
		return {
				get: function(receiver, name) { print("GET " + name); return obj[name]; },
						set: function(receiver, name, val) {
								print("SET " + name);
								obj[name] = val;  // bad behavior when set fails in non-strict mode
								return true;
						}
		};
}



function str(x) {
		return "";
}




function createMembrane(init) {

		function wrap(obj) {
				print("wrap enter", str(obj));
				var x = wrap2(obj);
				print("wrap exit", str(obj), "as", str(x));
				return x;
		}

		function wrap2(obj) {
				if (obj !== Object(obj)) {
						return obj;
				}

				function wrapCall(fun, that, args) {
						print("wrapCall enter", fun, str(that));
						var x = wrapCall2(fun, that, args);
						print("wrapCall exit", fun, str(that), "returning", str(x));
						return x;
				}

				function wrapCall2(fun, that, args) {
						return wrap(fun.apply(that, Array.prototype.map.call(args, wrap)));
				}

				var baseHandler = createHandler(obj);
				var handler = Proxy.create(Object.freeze({
						get: function(receiver, name) {
								return function() {
										var arg = (name === "get" || name == "set") ? arguments[1] : "";
										print("handler enter", name, arg);
										var x = wrapCall(baseHandler[name], baseHandler, arguments);
										print("handler exit", name, arg, "returning", str(x));
										return x;
								}
						}
				}));

				if (typeof obj === "function") {
						function callTrap() {
								print("call trap enter", str(obj), str(this));
								var x = wrapCall(obj, wrap(this), arguments);
								print("call trap exit", str(obj), str(this), "returning", str(x));
								return x;
						}
						function constructTrap() {
								function forward(args) { return obj.apply(this, args) }
								return wrap(new forward(Array.prototype.map.call(arguments, wrap)));
						}
						return Proxy.createFunction(handler, callTrap, constructTrap);
				} else {
						var prototype = wrap(Object.getPrototypeOf(obj));
						return Proxy.create(handler, prototype);
				}
		}

		// RETURN wrapped object
		return Object.freeze({
				wrapper: wrap(init)
		});
}













var o = {
		a: 6,
		b: {bb: 8},
		f: function(x) { return x },
		g: function(x) { return x.a },
		h: function(x) { this.q = x }
};
o[2] = {c: 7};
var m = createMembrane(o);
var w = m.wrapper;
print("o =", str(o))
print("w =", str(w));

var f = w.f;
var x = f(66);
var x = f({a: 1});
var x = w.f({a: 1});
var a = x.a;

var wb = w.b;
var wr = w.r;
var wf = w.f;
var wf3 = w.f(3);
var wfx = w.f({a: 6});
var wgx = w.g({a: {aa: 7}});
var wh4 = new w.h(4);



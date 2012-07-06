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


function __dump(value) {
		if (value === Object(value)) return "[" + typeof value + "]";
		if (typeof value == "string") return "\"" + value + "\"";
		return "" + value;
}


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



//////////////////////////////////////////////////
// MEMBRANE
//////////////////////////////////////////////////
function createMembrane(init) {

		/*
		 */
		function wrap(target) {
				/**/__logger.debug("CALL wrap for " + __dump(target));
				var value = wrap2(target);
				/**/__logger.debug("WRAP " + __dump(target) + " AS " + __dump(value));
				return value;
		}

		/*
		 */
		function wrap2(target) {

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
						var value = wrapFunction2(func, base, args);
						/**/__logger.debug("WRAP " + __dump(func) + " AS " + __dump(value));
						return value;
				}

				/* WRAP function
				 */
				function wrapFunction2(func, base, args) {
						return wrap(func.apply(base, Array.prototype.map.call(args, wrap)));
				}

				var baseHandler = createHandler(target);
				// var accessHandler = __AccessHandler((target);

				var handler = Proxy.create(Object.freeze({
						get: function(receiver, name) {
								return function() {
										/**/__logger.debug("CALL get ON MetaProxy " + __dump(name));
										var value = wrapFunction(baseHandler[name], baseHandler, arguments);
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
				} else {
						var prototype = wrap(Object.getPrototypeOf(target));
						/**/__logger.debug("CREATE Proxy FOR " + __dump(target));
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



//////////////////////////////////////////////////
// JS Proxy API - TestCase
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.20.0
//////////////////////////////////////////////////

// obj in den contract mit einbauen
// so dass contract = obj.a.a.a
// und obj auch geschützt wird / bekommt man das mit ?


/* TODO:
 * test assoziatives array
 * with statement
 */




//////////////////////////////////////////////////
//

__config_ViolationMode = __ViolationMode.OBSERVER;
//__config_ViolationMode = __ViolationMode.PROTECTOR;



//////////////////////////////////////////////////
// OBJECTS

function createObject() {
		return {
				a: {a: {a: {a: {a: {a: 4711}}}}},
						b: {a: {b: {a: {b: {c: 4711}}}}},
						bb: {bb: 8},
						c: 4711,
						x: {x: 4711},
						y: {y: {y: {y: {y: 4711}}}},
						zzz: 4711,
						f: function() { return this.a },
						g: function() { return {a: 4711} },
						gg: function() { return this },
						h: function() { this.zzz = 4711 }
		};
}

function test(contract, exp) {
		__sysout("\n\n\n");
		obj = createObject();
		__permit(contract, this, "obj");
		__sysout("[" +contract+ "]: " + exp + " # " + __dump(eval(exp)));
		__dumpAccess();
		__dumpViolation();
}



//////////////////////////////////////////////////
// TESTS


// normal access
__sysout("\n\n\n");
obj = createObject();
__permit("a*", this, "obj");
__sysout("[a*]: obj.a.a # " + __dump(obj.a.a));
__sysout("[a*]: obj.a.a = 4711 # " + __dump(obj.a.a = 4711));
__dumpAccess();
__dumpViolation();

__sysout("\n\n\n");
obj = createObject();
__permit("c*", this, "obj");
__sysout("[c*]: obj.a.a # " + __dump(obj.a.a));
__sysout("[c*]: obj.a.a = 4711 # " + __dump(obj.a.a = 4711));
__dumpAccess();
__dumpViolation();


// evla
__sysout("\n\n\n");
obj = createObject();
__permit("a*", this, "obj");
__sysout("[a*]: eval(obj.a.a) # " + __dump(eval(obj.a.a)));
__sysout("[a*]: eval(obj.a.a = 4711) # " + __dump(eval(obj.a.a = 4711)));
__dumpAccess();
__dumpViolation();

__sysout("\n\n\n");
obj = createObject();
__permit("c*", this, "obj");
__sysout("[c*]: eval(obj.a.a) # " + __dump(eval(obj.a.a)));
__sysout("[c*]: eval(obj.a.a = 4711) # " + __dump(eval(obj.a.a = 4711)));
__dumpAccess();
__dumpViolation();





// e.e
__sysout("\n\n\n");
obj = createObject();
__permit("a*", this, "obj");
__sysout("[a*]: obj.a.a # " + __dump(obj.a.a));
__dumpAccess();
__dumpViolation();

// e.e = e
__sysout("\n\n\n");
obj = createObject();
__permit("a*", this, "obj");
__sysout("[a*]: obj.a.a = 4711 # " + __dump(obj.a.a = 4711));
__dumpAccess();
__dumpViolation();

// e.e
__sysout("\n\n\n");
obj = createObject();
__permit("c*", this, "obj");
__sysout("[c*]: obj.a.a # " + __dump(obj.a.a));
__dumpAccess();
__dumpViolation();

// e.e = e
__sysout("\n\n\n");
obj = createObject();
__permit("c*", this, "obj");
__sysout("[c*]: obj.a.a = 4711 # " + __dump(obj.a.a = 4711));
__dumpAccess();
__dumpViolation();





// e[e]
__sysout("\n\n\n");
obj = createObject();
__permit("a*", this, "obj");
__sysout("[a*]: obj[a] # " + __dump(obj["a"]));
__dumpAccess();
__dumpViolation();

// e[e] = e
__sysout("\n\n\n");
obj = createObject();
__permit("a*", this, "obj");
__sysout("[a*]: obj[a] = 4711 # " + __dump(obj["a"] = 4711));
__dumpAccess();
__dumpViolation();



// e[e]
__sysout("\n\n\n");
obj = createObject();
__permit("c*", this, "obj");
__sysout("[c*]: obj[a] # " + __dump(obj["a"]));
__dumpAccess();
__dumpViolation();

// e[e] = e
__sysout("\n\n\n");
obj = createObject();
__permit("c*", this, "obj");
__sysout("[c*]: obj[a] = 4711 # " + __dump(obj["a"] = 4711));
__dumpAccess();
__dumpViolation();





// f() - this.a
test("f", "obj.f()");

// f() - this.a
test("a", "obj.f()");

// g() - {a: 4711}
test("g", "obj.g()");

// g() - {a: 4711}
test("g", "obj.g().a");

// g() - {a: 4711}
test("g.a", "obj.g().a");

// h() - this.zzz = 4711
test("h", "obj.h()");

// h() - this.zzz = 4711
test("(h|zzz)", "obj.h()");

// gg() - this
test("gg", "obj.gg()");

// gg() - this
test("gg.a", "obj.gg().a");

// gg() - this
test("gg.c", "obj.gg().a");

// gg() - this
test("(gg|a)", "obj.gg().a");

// gg() - this
test("gg.c", "obj.gg().c = 4711");

// gg() - this
test("gg.a", "obj.gg().c = 4711");

// gg() - this
test("(gg|c)", "obj.gg().c = 4711");




// empty contract
test("", "obj.a");
test("", "obj.a = 4711");

test("", "obj");
test("", "obj = 4711");




// Object
test("", "obj");
test("", "obj = 4711");

test("a", "obj");
test("a", "obj = 4711");





// new propertie
test("a", "obj.c");
test("a", "obj.c = 4711");

test("c", "obj.c");
test("c", "obj.c = 4711");





// Array
__sysout("\n\n\n");
array = new Array("a", "b", "c");
__permit("0", this, "array");
__sysout("[0]: array[0] # " + __dump(array["0"]));
__sysout("[0]: array[1] # " + __dump(array["1"]));
__sysout("[0]: array[0] = 4711# " + __dump(array["0"] = 4711));
__sysout("[0]: array[1] = 4711# " + __dump(array["1"] = 4711));
__dumpAccess();
__dumpViolation();



// Array
__sysout("\n\n\n");
array = new Array("a", "b", "c");
__permit("0", this, "array");
array.foreach(function(k,v) {
		array[k];
});
__dumpAccess();
__dumpViolation();



// Array
__sysout("\n\n\n");
array = new Array("a", "b", "c");
__permit("0", this, "array");
array.foreach(function(k,v) {
		__sysout(v)
});
__dumpAccess();
__dumpViolation();



// Array
__sysout("\n\n\n");
array = new Array("a", "b", "c");
__permit("0", this, "array");
array.foreach(function(k,v) {
		__sysout(array[k] = 4711)
});
__dumpAccess();
__dumpViolation();






// A-Array
__sysout("\n\n\n");
array = new Array();
array["a"] = "a";
array["b"] = "b";
array["c"] = "c";
__permit("a", this, "array");
__sysout("[a]: array.a # " + __dump(array.a));
__sysout("[a]: array[a] # " + __dump(array["a"]));
__sysout("[a]: array[b] # " + __dump(array["b"]));
__sysout("[a]: array[a] = 4711# " + __dump(array["a"] = 4711));
__sysout("[a]: array[b] = 4711# " + __dump(array["b"] = 4711));
__dumpAccess();
__dumpViolation();



// A-Array
__sysout("\n\n\n");
array = new Array();
array["a"] = "a";
array["b"] = "b";
array["c"] = "c";
__permit("a", this, "array");
array.foreach(function(k,v) {
		array[k];
});
__dumpAccess();
__dumpViolation();



// A-Array
__sysout("\n\n\n");
array = new Array();
array["a"] = "a";
array["b"] = "b";
array["c"] = "c";
__permit("a", this, "array");
array.foreach(function(k,v) {
		__sysout(v)
});
__dumpAccess();
__dumpViolation();



// A-Array
__sysout("\n\n\n");
array = new Array();
array["a"] = "a";
array["b"] = "b";
array["c"] = "c";
__permit("a", this, "array");
array.foreach(function(k,v) {
		__sysout(array[k] = 4711)
});
__dumpAccess();
__dumpViolation();

//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// - TestCase -
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////



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
						f: function(x) { return this.a },
						g: function(x) { return {a: 4711} },
						h: function(x) { this.zzz = 4712 }
		};
}

function test(contract, exp) {
		__sysout("\n\n\n");
		obj = createObject();
		__apply(contract, this, "obj");
		__sysout("[" +contract+ "]: " + exp + " # " + __dump(eval(exp)));
		__dumpAccess();
		__dumpViolation();
}



//////////////////////////////////////////////////
// TESTS

/*
   {
   getOwnPropertyDescriptor: function(name) -> PropertyDescriptor | undefined // Object.getOwnPropertyDescriptor(proxy, name)
   getPropertyDescriptor:    function(name) -> PropertyDescriptor | undefined // Object.getPropertyDescriptor(proxy, name)   (not in ES5)
   getOwnPropertyNames:      function() -> [ string ]                         // Object.getOwnPropertyNames(proxy) 
   getPropertyNames:         function() -> [ string ]                         // Object.getPropertyNames(proxy)              (not in ES5)
   defineProperty:           function(name, propertyDescriptor) -> any        // Object.defineProperty(proxy,name,pd)
   delete:                   function(name) -> boolean                        // delete proxy.name
   fix:                      function() -> { string: PropertyDescriptor }     // Object.{freeze|seal|preventExtensions}(proxy)
   | undefined
   }
   {
   has:       function(name) -> boolean                  // name in proxy
   hasOwn:    function(name) -> boolean                  // ({}).hasOwnProperty.call(proxy, name)
   get:       function(receiver, name) -> any            // receiver.name
   set:       function(receiver, name, val) -> boolean   // receiver.name = val
   enumerate: function() -> [string]                     // for (name in proxy) (return array of enumerable own and inherited properties)
   keys:      function() -> [string]                     // Object.keys(proxy)  (return array of enumerable own properties only)
   }
   */


test("a", "Object.getOwnPropertyDescriptor(obj, \"a\");");
test("a", "Object.getOwnPropertyDescriptor(obj, \"b\");");
test("a.a", "Object.getOwnPropertyDescriptor(obj, \"b.a\");");
test("a.a", "Object.getOwnPropertyDescriptor(obj, \"a.b\");");

//test("a", "obj.getOwnPropertyDescriptor(\"a\");");
//test("a", "obj.getOwnPropertyDescriptor(\"b\");");
//test("a.a", "obj.getOwnPropertyDescriptor(\"b.a\");");
//test("a.a", "obj.getOwnPropertyDescriptor(\"a.b\");");



//test("a", "Object.getPropertyDescriptor(obj, \"a\");");
//test("a", "Object.getPropertyDescriptor(obj, \"b\");");

//test("a", "obj.getPropertyDescriptor(\"a\");");
//test("a", "obj.getPropertyDescriptor(\"b\");");



test("a", "Object.getOwnPropertyNames(obj);");
test("a", "Object.getOwnPropertyNames(obj);");

//test("a", "obj.getOwnPropertyNames();");
//test("a", "obj.getOwnPropertyNames();");



//test("a", "Object.getPropertyNames(obj);");
//test("a", "Object.getPropertyNames(obj);");

//test("a", "obj.getPropertyNames();");
//test("a", "obj.getPropertyNames();");



test("a", "Object.defineProperty(obj, \"a\", {value:4711});");
test("a", "Object.defineProperty(obj, \"b\", {value:4711});");
test("b.a", "Object.defineProperty(obj.b, \"a\", {value:4711});");
test("b.a", "Object.defineProperty(obj.b, \"b\", {value:4711});");

//test("a", "obj.defineProperty(\"a\", 4711);");
//test("a", "obj.defineProperty(\"b\", 4711);");
//test("b.a", "obj.b.defineProperty(\"a\", 4711);");
//test("b.a", "obj.b.defineProperty(\"b\", 4711);");



test("a", "delete obj.a;");
test("a", "delete obj.b;");



test("a", "Object.freeze(obj).a;");
test("a", "Object.freeze(obj).xx;");

//test("a", "obj.freeze().a;");
//test("a", "obj.freeze().b;");



test("a", "Object.seal(obj).a;");
test("a", "Object.seal(obj).xx;");

//test("a", "obj.seal().a;");
//test("a", "obj.seal().b;");



test("a", "Object.preventExtensions(obj).a;");
test("a", "Object.preventExtensions(obj).xx;");

//test("a", "obj.preventExtensions().a;");
//test("a", "obj.preventExtensions().b;");


/*
   {
   getOwnPropertyDescriptor: function(name) -> PropertyDescriptor | undefined // Object.getOwnPropertyDescriptor(proxy, name)
   getPropertyDescriptor:    function(name) -> PropertyDescriptor | undefined // Object.getPropertyDescriptor(proxy, name)   (not in ES5)
   getOwnPropertyNames:      function() -> [ string ]                         // Object.getOwnPropertyNames(proxy) 
   getPropertyNames:         function() -> [ string ]                         // Object.getPropertyNames(proxy)              (not in ES5)
   defineProperty:           function(name, propertyDescriptor) -> any        // Object.defineProperty(proxy,name,pd)
   delete:                   function(name) -> boolean                        // delete proxy.name
   fix:                      function() -> { string: PropertyDescriptor }     // Object.{freeze|seal|preventExtensions}(proxy)
   | undefined
   }
   {
   has:       function(name) -> boolean                  // name in proxy
   hasOwn:    function(name) -> boolean                  // ({}).hasOwnProperty.call(proxy, name)
   get:       function(receiver, name) -> any            // receiver.name
   set:       function(receiver, name, val) -> boolean   // receiver.name = val
   enumerate: function() -> [string]                     // for (name in proxy) (return array of enumerable own and inherited properties)
   keys:      function() -> [string]                     // Object.keys(proxy)  (return array of enumerable own properties only)
   }
   */

test("a", "('a' in obj);");
test("b", "('a' in obj.a);");


test("a", "obj.a.hasOwnProperty('a');");
test("b", "obj.a.hasOwnProperty('a');");

test("a", "for (x in obj) {obj[x];}");
test("b", "for (x in obj.a) {obj[x];}");
test("a", "for (x in obj) {obj[x]=4711;}");

test("a", "Object.keys(obj);");
test("a", "Object.keys(obj.a);");
test("a", "Object.keys(obj.b);");


//test("a", "obj.keys();");
//test("a", "obj.a.keys();");
//test("a", "obj.b.keys();");


//test("a", "obj.forEach(function(name) {obj[name];});");
//test("a", "obj.forEach(function(name) {obj[name];});");


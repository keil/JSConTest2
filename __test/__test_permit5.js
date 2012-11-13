//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// - TestCase -
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////

obj = {a:4711, b:4712};
__APC.apply("a", this, "obj");
function test() {
		obj.a;
		obj.b;
		__look();
}
test();

__sysout("\n\n\n");
obj = {a:4711, b:4712};
function test() {
		obj.a;
		obj.b;
		__look();
}
__APC.apply("a", this, "test");
test();

__sysout("\n\n\n");
obj = {a:4711, b:4712};

function test2(obj) {
		this.c = 3456;
		obj.a;
		obj.b;
		__look();
}

__APC.apply("a", this, "test2");

test2(obj);

test2.d = 76543;
test2.x;
__look();

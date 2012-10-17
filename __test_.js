//////////////////////////////////////////////////
// JS Proxy API - TestCase
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//

__config_ViolationMode = __ViolationMode.OBSERVER;
//__config_ViolationMode = __ViolationMode.PROTECTOR;

obj = {a:4711, b:4712};
__permit("a", this, "obj");
function test() {
	obj.a;
	obj.b;
	__dumpAccess();
	__dumpViolation();
}
test();

__sysout("\n\n\n");
obj = {a:4711, b:4712};
function test() {
	obj.a;
	obj.b;
	__dumpAccess();
	__dumpViolation();
}
__permit("a", this, "test");
test();

__sysout("\n\n\n");
obj = {a:4711, b:4712};

function test2(obj) {
	this.c = 3456;
	obj.a;
	obj.b;
	__dumpAccess();
	__dumpViolation();
}

__permit("a", this, "test2");

test2(obj);

test2.d = 76543;
test2.x;
	__dumpAccess();
	__dumpViolation();


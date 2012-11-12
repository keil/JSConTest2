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
// TESTS


func = function(x, y) {
		__sysout(x.a);
		__sysout(x.b);
		__sysout(y.a = 4711);
		__sysout(y.b = 4711);
}

test1 = __permitArgs("arguments.(0+1).a", func, "test1");

__sysout("\n\n\n");
test1({a:4711, b:4712}, {a:4713, b:4714});
__dumpAccess();
__dumpViolation();

__sysout("\n\n\n");
new test1({a:4711, b:4712}, {a:4713, b:4714});
__dumpAccess();
__dumpViolation();



func = function(x, y) {
		return function() {
				__sysout(x.a);
				__sysout(x.b);
				__sysout(y.a = 4711);
				__sysout(y.b = 4711);
		}
}

test1 = __permitArgs("arguments.(0+1).a", func, "test1");

__sysout("\n\n\n");
test1({a:4711, b:4712}, {a:4713, b:4714})();
__dumpAccess();
__dumpViolation();


func = function(x, y) {
		return {
				a: x,
						b: y,
						c: function() {x.b = 4711;}
		}
}

test1 = __permitArgs("arguments.(0+1).a", func, "test1");

__sysout("\n\n\n");
t = new test1({a:4711, b:4712}, {a:4713, b:4714});
__sysout(t.a.a);
__sysout(t.b.b);
__sysout(__dump(t.a));
__sysout(t.c());
__dumpAccess();
__dumpViolation();



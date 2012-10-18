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


g = {a:4713, b:4714};

(func = function(x, y) {
		var d = 654;
		__sysout(x.a);
		__sysout(y.a);
		__sysout(d);
		__sysout(g.a);
		this.h = function () {__sysout(x.a);}
		//return this.c;
})({a:3, b:5},{a:7, b:11});

test = __permitArgs("arguments.0.a", func);
//__permit("g.a", this, "test");
//__permit("g.a", this, "g");


obj = new test({a:3, b:5},{a:7, b:11});


__dumpAccess();
__dumpViolation();

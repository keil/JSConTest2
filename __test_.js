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



func = function(x, y) {
		__apply("x.b", this);
		__sysout(this.x);
		var d = 654;
		__sysout(x.a);
		__sysout(y.a);
		__sysout(d);
		__sysout("##### " + arguments.callee.name);
		var fName = arguments.callee.toString(0).match(
  /^function\s*(?:\s+([\w\$]*))?\s*\(/
);
fName = (fName ? fName[1] : "");
__sysout("call:" + fName)
		return this.c;
}

test = __permitArgs("x.a", func);

test({a:3, b:5},{a:7, b:11});

__dumpAccess();
__dumpViolation();

Function.prototype.getArg = function() {
__sysout(caller.toString());
}

function getParamNames(func) {
	__sysout(arguments.callee);
    var funStr = func.toString();
    return arguments.callee.toString().slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
}

//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// - TestCase -
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////

this.obj = {a:"chacha"};

function test() {
	__sysout(obj.a);
	obj.b=4711;
}


test();
__look();


(function() {
		var obj = __APC.permit("@", {a:4711});
		eval(test.toString());
		test();
})();
__look();

test();
__look();






/*
(function() {
x = __permit("@", x);
func();
})();
__dump();
*/

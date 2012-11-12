//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// - TestCase -
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////



function func(s) {
	__sysout(this.secret);
	this.x = 765;
	this.c;
}


test = __permitArgs("(arguments.0.@+secret)", func);
test2 = {secret: "chacha", func: test};


//test.call(this, {});
test2.func();
__look();




/*
(function() {
x = __permit("@", x);
func();
})();
__dump();
*/

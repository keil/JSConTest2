/*
 * JavaScript Reflection API
 *  for Access Permission Contracts
 *  - TestCase
 *
 * Copyright (c) 2013, Proglang, University of Freiburg.
 *  http://proglang.informatik.uni-freiburg.de/
 * All rights reserved.
 *
 * Author Matthias Keil
 *  http://www.informatik.uni-freiburg.de/~keilr/
 *
 * $Date$
 * $Rev$
 */


function func(s) {
	__sysout(this.secret);
	this.x = 765;
	this.c;
}


test = __APC.permitArgs("(arguments.0.@+secret)", func);
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

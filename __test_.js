//////////////////////////////////////////////////
// JS Proxy API - TestCase
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.20.0
//////////////////////////////////////////////////

var p = {
		a: 6,
		b: {bb: 8},
		f: function(x) { return x },
		g: function(x) { return x.a },
		h: function(x) { this.q = x }
};

var o = {
		a: 6,
		b: {bb: 8},
		f: function(x) { return x },
		g: function(x) { return x.a },
		h: function(x) { this.q = x }
};

o[2] = {c: 7};



// apply proxy
__permit("b.bb", this, "o");

__sysout("1 ##################################################");
var obbb = o.b.bb;
var obbb = o.b.bb;
__sysout("2 ##################################################");
var oa = o.a;
__sysout("3 ##################################################");
var x = o;
var y = x.b;
var z = x.f;
__sysout("4 ##################################################");
o.b.bb = 7;
__sysout("5 ##################################################");
o.a = 7;
__sysout("6 ##################################################");
var x = o;
x.b = 5;
x.f = 3;



// CALL EVALUATE
__evaluateAccess();
__evaluateViolation();

//////////////////////////////////////////////////
// JS Proxy API - TestCase
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.20.0
//////////////////////////////////////////////////



//////////////////////////////////////////////////
// TEST CASE 1
//////////////////////////////////////////////////


var o = {
		a: 6,
		b: {bb: 8},
		f: function(x) { return x },
		g: function(x) { return x.a },
		h: function(x) { this.q = x }
};
o[2] = {c: 7};

//////////////////////////////////////////////////
var m = __createMembrane(o, "o");
var w = m;
//////////////////////////////////////////////////


var f = w.f;
var x = f(66);
var x = f({a: 1});
var x = w.f({a: 1});
var a = x.a;

var wb = w.b;
var wr = w.r;
var wf = w.f;
var wf3 = w.f(3);
var wfx = w.f({a: 6});
var wgx = w.g({a: {aa: 7}});
var wh4 = new w.h(4);



//////////////////////////////////////////////////
// TEST CASE 2
//////////////////////////////////////////////////


var o = {
  a: 6,
  b: {bb: 8},
  f: function(x) { receiver = this; argument = x; return x },
  g: function(x) { receiver = this; argument = x; return x.a },
  h: function(x) { receiver = this; argument = x; this.q = x },
  s: function(x) { receiver = this; argument = x; this.x = {y: x}; return this }
}
o[2] = {c: 7}

//////////////////////////////////////////////////
var m = __createMembrane(o, "o")
var w = m;
//////////////////////////////////////////////////


var f = w.f
var x = f(66)
var x = f({a: 1})
var x = w.f({a: 1})
var a = x.a


var wb = w.b
var wr = w.r
var wf = w.f
var wf3 = w.f(3)
var wfx = w.f({a: 6})
var wgx = w.g({a: {aa: 7}})
var wh4 = new w.h(4)
var ws5 = w.s(5)
var ws5x = ws5.x




//////////////////////////////////////////////////
// TEST CASE 3
//////////////////////////////////////////////////

var o = {
  a: 6,
  b: {bb: 8},
  f: function(x) { return x },
  g: function(x) { return x.a },
  h: function(x) { this.q = x }
};
o[2] = {c: 7};

//////////////////////////////////////////////////
var m = __createMembrane(o, "o");
var w = m;
//////////////////////////////////////////////////

var f = w.f;
var x = f(66);
var x = f({a: 1});
var x = w.f({a: 1});
var a = x.a;

assertEquals(6, w.a);
assertEquals(8, w.b.bb);
assertEquals(7, w[2]["c"]);
assertEquals(undefined, w.c);
assertEquals(1, w.f(1));
assertEquals(1, w.f({a: 1}).a);
assertEquals(2, w.g({a: 2}));
assertEquals(3, (w.r = {a: 3}).a);
assertEquals(3, w.r.a);
assertEquals(3, o.r.a);

w.h(3);

assertEquals(3, w.q);
assertEquals(3, o.q);
assertEquals(4, (new w.h(4)).q);

var wb = w.b;
var wr = w.r;
var wf = w.f;
var wf3 = w.f(3);
var wfx = w.f({a: 6});
var wgx = w.g({a: {aa: 7}});
var wh4 = new w.h(4);

assertEquals(3, wf3);
assertEquals("object", typeof o.r);
assertEquals(5, (o.r = {a: 5}).a);
assertEquals(5, o.r.a);

assertEquals(6, w.a);
assertEquals(5, w.r.a);
assertEquals(5, o.r.a);
assertEquals(7, w.r = 7);
assertEquals(7, w.r);
assertEquals(7, o.r);
assertEquals(8, w.b.bb);
assertEquals(7, w[2]["c"]);
assertEquals(undefined, w.c);
assertEquals(8, wb.bb);
assertEquals(3, wr.a);
assertEquals(4, wf(4));
assertEquals(3, wf3);
assertEquals(6, wfx.a);
assertEquals(7, wgx.aa);
assertEquals(4, wh4.q);



//////////////////////////////////////////////////
// TEST CASE 4
//////////////////////////////////////////////////


var receiver
var argument
var o = {
  a: 6,
  b: {bb: 8},
  f: function(x) { receiver = this; argument = x; return x },
  g: function(x) { receiver = this; argument = x; return x.a },
  h: function(x) { receiver = this; argument = x; this.q = x },
  s: function(x) { receiver = this; argument = x; this.x = {y: x}; return this }
}
o[2] = {c: 7}

//////////////////////////////////////////////////
var m = __createMembrane(o, "o")
var w = m;
//////////////////////////////////////////////////

var f = w.f
var x = f(66)
var x = f({a: 1})
var x = w.f({a: 1})
var a = x.a

assertEquals(6, w.a)
assertEquals(8, w.b.bb)
assertEquals(7, w[2]["c"])
assertEquals(undefined, w.c)
assertEquals(1, w.f(1))
assertEquals(1, w.f({a: 1}).a)
assertEquals(2, w.g({a: 2}))
assertEquals(3, (w.r = {a: 3}).a)
assertEquals(3, w.r.a)
assertEquals(3, o.r.a)
w.h(3)
assertEquals(3, w.q)
assertEquals(3, o.q)
assertEquals(4, (new w.h(4)).q)
assertEquals(5, w.s(5).x.y)

var wb = w.b
var wr = w.r
var wf = w.f
var wf3 = w.f(3)
var wfx = w.f({a: 6})
var wgx = w.g({a: {aa: 7}})
var wh4 = new w.h(4)
var ws5 = w.s(5)
var ws5x = ws5.x

assertEquals(3, wf3)
assertEquals(5, (o.r = {a: 5}).a)
assertEquals(5, o.r.a)
assertEquals(3, wr.a)
assertEquals(6, wfx.a)
assertEquals(7, wgx.aa)


// CALL EVALUATE
__evaluate();

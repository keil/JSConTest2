//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// - TestCase -
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////

tpe1 = new __APC.TracePath.TraceEmpty();
tpe2 = new __APC.TracePath.TraceEmpty();

tpA1 = new __APC.TracePath.TraceProperty("a");
tpA2 = new __APC.TracePath.TraceProperty("a");

tpB1 = new __APC.TracePath.TraceProperty("b");
tpB2 = new __APC.TracePath.TraceProperty("b");

tpC1 = new __APC.TracePath.TraceProperty("c");
tpC2 = new __APC.TracePath.TraceProperty("c");

tpF1 = new __APC.TracePath.TraceProperty("f");
tpF2 = new __APC.TracePath.TraceProperty("f");


tpAA1 =  new __APC.TracePath.TracePath(tpA1, tpA2);
tpAA2 =  new __APC.TracePath.TracePath(tpA1, tpA2);

tpAB1 =  new __APC.TracePath.TracePath(tpA1, tpB2);

tpAB2 =  new __APC.TracePath.TracePath(tpA1, tpB1);

tpBC1 =  new __APC.TracePath.TracePath(tpB1, tpC1);
tpBC2 =  new __APC.TracePath.TracePath(tpB1, tpC1);

tpAAuAB = new __APC.TracePath.TraceSet(tpAA1, tpAB1);
tpABuBC = new __APC.TracePath.TraceSet(tpAB1, tpBC1);


tpFA = new __APC.TracePath.TraceArgument(tpF1, tpA1);


function test(p) {
		__sysout(p.toString() + " = " + p.freduce());
}


test(tpe1);
test(tpA1);
test(tpAA1);
test(tpAAuAB);
test(new __APC.TracePath.TracePath(tpAAuAB, tpA1));
test(new __APC.TracePath.TracePath(new __APC.TracePath.TracePath(tpAAuAB, tpA1), tpA1));



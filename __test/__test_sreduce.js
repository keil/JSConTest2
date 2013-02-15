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

tpAAuAB = new __APC.TracePath.TraceSet(tpAA1, tpAA1);
tpABuBC = new __APC.TracePath.TraceSet(tpAB1, tpBC1);


tpFA = new __APC.TracePath.TraceArgument(tpF1, tpA1);


function test(p) {
		// TODO: deactivated:
		//__sysout(p.toString() + " = " + p.sreduce());
}


test(__APC.TracePath.TraceSet(tpAA1, tpAA2));
test(tpAA2);
test(tpAB1);
test(tpAB2);
test(tpAAuAB);
test(tpABuBC);




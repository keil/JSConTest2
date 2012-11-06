//////////////////////////////////////////////////
// JS Proxy API - TestCase
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////



// parser
parser = new __ContractParser();

function test(string, name) {
		contract = parser.parse(string);
		var result = contract.writeable(name);
		__sysout("[" + contract.toString() + "] " + name + ": " + result);
}


__sysout("# TEST 1 #");
test("@.b.c", "a");
test("@.b*.c", "b");
test("@", "a");

__sysout("# TEST 2 #");
test("?.b.c", "a");
test("?.b*.c", "b");
test("?", "1");
test("?", "1");

__sysout("# TEST 3 #");
//test("[a-z].b.c", "a");
test("a.b.c", "a");
//test("[a-z].b.c", "b");
test("a.b.c", "b");
//test("[a-z]", "a");
test("a", "a");
test("b", "b");

__sysout("# TEST 4 #");
//test("[a-z].b.c", "a");
test("a*.b.c", "a");
//test("[a-z].b.c", "b");
test("a*.b.c", "b");
//test("[a-z]", "a");
test("a*", "a");
test("b*", "b");

__sysout("# TEST 5 #");
//test("[a-z].b.c", "a");
test("a?.b.c", "a");
//test("[a-z].b.c", "b");
test("a?.b.c", "b");
//test("[a-z]", "a");
test("a?", "a");
test("b?", "b");

__sysout("# TEST 6 #");
test("(a|b).b.c", "a");
test("(a|b).b.c", "b");
test("(a|b).b.c", "c");
test("(a|b)", "a");
test("(a|b)", "b");
test("(a|b)", "c");

__sysout("# TEST 7 #");
test("(a|b)*.b.c", "a");
test("(a|b)*.b.c", "b");
test("(a|b)*.b.c", "c");
test("(a|b)*", "a");
test("(a|b)*", "b");
test("(a|b)*", "c");


__sysout("# TEST 8 #");
test("(a|b)?.b.c", "a");
test("(a|b)?.b.c", "b");
test("(a|b)?.b.c", "c");
test("(a|b)?", "a");
test("(a|b)?", "b");
test("(a|b)?", "c");

__sysout("# TEST 9 #");
//test("(a|b*).b.c", "a");


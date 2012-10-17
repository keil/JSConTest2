//////////////////////////////////////////////////
// JS Proxy API - TestCase
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////



// parser
parser = new __ContractParser();

function test(string, name1, name2) {
		contract = parser.parse(string);
		var result1 = contract.readable(name1);
		__sysout("[" + contract.toString() + "] " + name1 + ": " + result1.readable + "/ " + (result1.contracts.toString()!="" ? result1.contracts : "{}"));
		var result2 = result1.contracts.writeable(name2);
		__sysout("[" + result1.contracts.toString() + "] " + name2 + ": " + result2);
}



__sysout("\n# TEST 1 #");
test("@.b.c", "a", "b");
test("@.b*.c", "b", "b");
test("@", "a", "");

__sysout("\n# TEST 2 #");
test("?.b.c", "a", "b");
test("?.b*.c", "b", "b");
test("?", "1", "b");
test("?", "1", "");

__sysout("\n# TEST 3 #");
//test("[a-z].b.c", "a", "b");
test("a.b.c", "a", "b");
//test("[a-z].b.c", "b", "b");
test("a.b.c", "b", "a");
//test("[a-z]", "a", "a");
test("a", "a", "a");
test("b", "b", "b");

__sysout("\n# TEST 4 #");
//test("[a-z].b.c", "a", "b");
test("a*.b.c", "a", "b");
//test("[a-z].b.c", "b", "b");
test("a*.b.c", "b", "b");
//test("[a-z]", "a", "a");
test("a*", "a", "a");
test("b*", "b", "a");

__sysout("\n# TEST 5 #");
//test("[a-z].b.c", "a", "b");
test("a?.b.c", "a", "a");
//test("[a-z].b.c", "b", "b");
test("a?.b.c", "b", "b");
//test("[a-z]", "a", "");
test("a?", "a", "b");
test("b?", "b", "b");

__sysout("\n# TEST 6 #");
test("(a|b).b.c", "a", "b");
test("(a|b).b.c", "b", "b");
test("(a|b).b.c", "c", "b");
test("(a|b)", "a", "a");
test("(a|b)", "b", "b");
test("(a|b)", "c", "");

__sysout("\n# TEST 7 #");
test("(a|b)*.b.c", "a", "a");
test("(a|b)*.b.c", "b", "a");
test("(a|b)*.b.c", "a", "b");
test("(a|b)*", "a", "a");
test("(a|b)*", "b", "b");
test("(a|b)*", "c", "c");


__sysout("\n# TEST 8 #");
test("(a|b)?.b.c", "a", "a");
test("(a|b)?.b.c", "b", "a");
test("(a|b)?.b.c", "a", "b");
test("(a|b)?", "a", "a");
test("(a|b)?", "b", "b");
test("(a|b)?", "c", "c");

__sysout("\n# TEST 9 #");
//test("(a|b*).b.c", "bbb", "a");


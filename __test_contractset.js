// parser
parser = new __ContractParser();

function test(string, name0, name1) {
		contract = parser.parse(string);
		var result1 = contract.readable(name1);
		__sysout("[" + contract.toString() + "] " + name0 + ": " + result1.readable + "/ " + (result1.contracts.toString()!="" ? result1.contracts : "{}"));
		var result2 = result1.contracts.readable(name1);
		__sysout("[" + result1.contracts.toString() + "] " + name1 + ": " + result2.readable + "/ " + (result2.contracts.toString()!="" ? result2.contracts : "{}"));
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


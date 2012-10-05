// parser
parser = new __ContractParser();

function test(string, name0, name1) {
		contract = parser.parse(string);
		var result = contract.readable(name1);
		__sysout("[" + contract.toString() + "] " + name0 + ": " + result.readable + "/ " + (result.contracts!="" ? result.contracts : "{}"));
		var result = result.contracts.readable(name1);
		__sysout("[" + result.contracts.toString() + "] " + name1 + ": " + result.readable + "/ " + (result.contracts!="" ? result.contracts : "{}"));
}



__sysout("# TEST 1 #");
test("@.b.c", "a", "b");
test("@.b*.c", "b", "b");
test("@", "a", "");

__sysout("# TEST 2 #");
test("?.b.c", "a", "b");
test("?.b*.c", "b", "b");
test("?", "1", "b");
test("?", "1", "");

__sysout("# TEST 3 #");
//test("[a-z].b.c", "a", "b");
test("a.b.c", "a", "b");
//test("[a-z].b.c", "b", "b");
test("a.b.c", "b", "a");
//test("[a-z]", "a", "a");
test("a", "a", "a");
test("b", "b", "b");

__sysout("# TEST 4 #");
//test("[a-z].b.c", "a", "b");
test("a*.b.c", "a", "b");
//test("[a-z].b.c", "b", "b");
test("a*.b.c", "b", "b");
//test("[a-z]", "a", "a");
test("a*", "a", "a");
test("b*", "b", "a");

__sysout("# TEST 5 #");
//test("[a-z].b.c", "a", "b");
test("a?.b.c", "a", "a");
//test("[a-z].b.c", "b", "b");
test("a?.b.c", "b", "b");
//test("[a-z]", "a", "");
test("a?", "a", "b");
test("b?", "b", "b");

__sysout("# TEST 6 #");
test("(a|b).b.c", "a", "b");
test("(a|b).b.c", "b", "b");
test("(a|b).b.c", "c", "b");
test("(a|b)", "a", "a");
test("(a|b)", "b", "b");
test("(a|b)", "c", "");

__sysout("# TEST 7 #");
test("(a|b)*.b.c", "a", "a");
test("(a|b)*.b.c", "b", "a");
test("(a|b)*.b.c", "a", "b");
test("(a|b)*", "a", "a");
test("(a|b)*", "b", "b");
test("(a|b)*", "c", "c");


__sysout("# TEST 8 #");
test("(a|b)?.b.c", "a", "a");
test("(a|b)?.b.c", "b", "a");
test("(a|b)?.b.c", "a", "b");
test("(a|b)?", "a", "a");
test("(a|b)?", "b", "b");
test("(a|b)?", "c", "c");

__sysout("# TEST 9 #");
//test("(a|b*).b.c", "bbb", "a");


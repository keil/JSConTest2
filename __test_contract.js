// parser
parser = new __ContractParser();

function test(string, name) {
		contract = parser.parse(string);
		var result = contract.readable(name);
		__sysout("[" + contract.toString() + "] " + name + ": " + result.readable + "/ " + (result.contracts!="" ? result.contracts : "{}"));
}


// # TEST 1 #
test("@.b.c", "a");
test("@.b*.c", "b");
test("@", "a");

// # TEST 2 #
test("?.b.c", "a");
test("?.b*.c", "b");
test("?", "1");
test("?", "1");

// # TEST 3 #
//test("[a-z].b.c", "a");
test("a.b.c", "a");
//test("[a-z].b.c", "b");
test("a.b.c", "b");
//test("[a-z]", "a");
test("a", "a");
test("b", "b");

// # TEST 4 #
//test("[a-z].b.c", "a");
test("a*.b.c", "a");
//test("[a-z].b.c", "b");
test("a*.b.c", "b");
//test("[a-z]", "a");
//test("a*", "a");
//test("b*", "b");

// # TEST 5 #
//test("[a-z].b.c", "a");
test("a?.b.c", "a");
//test("[a-z].b.c", "b");
test("a?.b.c", "b");
//test("[a-z]", "a");
//test("a?", "a");
//test("b?", "b");

// # TEST 6 #
test("(a|b).b.c", "a");
test("(a|b).b.c", "b");
test("(a|b).b.c", "c");
test("(a|b)", "a");
test("(a|b)", "b");
test("(a|b)", "c");

// # TEST 7 #
test("(a|b)*.b.c", "a");
test("(a|b)*.b.c", "b");
test("(a|b)*.b.c", "c");
//test("(a|b)*", "a");
//test("(a|b)*", "b");
//test("(a|b)*", "c");


// # TEST 8 #
test("(a|b)?.b.c", "a");
test("(a|b)?.b.c", "b");
test("(a|b)?.b.c", "c");
//test("(a|b)?", "a");
//test("(a|b)?", "b");
//test("(a|b)?", "c");


//test("(a|b*).b.c", "a");


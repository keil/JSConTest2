//////////////////////////////////////////////////
// JS Proxy API - TestCase
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////



__sysout("\n\n################################")
var test = new __ContractLiteral(__CType.AT, "@");
__sysout(test.toString());
__sysout(test.match("a"));
__sysout(test.match("bb"));
__sysout(test.match("4711"));
__sysout(test.match("cc4711"));
__sysout(test.match("abc"));


__sysout("\n\n################################")
var test = new __ContractLiteral(__CType.QMark, "?"); 
__sysout(test.toString());
__sysout(test.match("a"));
__sysout(test.match("bb"));
__sysout(test.match("4711"));
__sysout(test.match("cc4711"));
__sysout(test.match("abc"));

__sysout("\n\n################################")
var test = new __ContractLiteral(__CType.RegEx, "bb");
__sysout(test.toString());
__sysout(test.match("a"));
__sysout(test.match("bb"));
__sysout(test.match("4711"));
__sysout(test.match("cc4711"));
__sysout(test.match("abc"));

__sysout("\n\n################################")
var test = new __ContractLiteral(__CType.RegEx,"(abc)");
__sysout(test.toString());
__sysout(test.match("a"));
__sysout(test.match("bb"));
__sysout(test.match("4711"));
__sysout(test.match("cc4711"));
__sysout(test.match("abc"));

__sysout("\n\n################################")
var test = new __ContractLiteral(__CType.RegEx,"(a|bb|abc)"); 
__sysout(test.toString());
__sysout(test.match("a"));
__sysout(test.match("bb"));
__sysout(test.match("4711"));
__sysout(test.match("cc4711"));
__sysout(test.match("abc"));

__sysout("\n\n################################")
var test = new __ContractLiteral(__CType.RegEx, "bb*"); 
__sysout(test.toString());
__sysout(test.match("a"));
__sysout(test.match("bb"));
__sysout(test.match("4711"));
__sysout(test.match("cc4711"));
__sysout(test.match("abc"));

__sysout("\n\n################################")
var test = new __ContractLiteral(__CType.RegEx,"abc?"); 
__sysout(test.toString());
__sysout(test.match("a"));
__sysout(test.match("bb"));
__sysout(test.match("4711"));
__sysout(test.match("cc4711"));
__sysout(test.match("abc"));

__sysout("\n\n################################")
var test = new __ContractLiteral(__CType.RegEx,"(a|bb)*"); 
__sysout(test.toString());
__sysout(test.match("a"));
__sysout(test.match("bb"));
__sysout(test.match("4711"));
__sysout(test.match("cc4711"));
__sysout(test.match("abc"));

__sysout("\n\n################################")
var test = new __ContractLiteral(__CType.RegEx,"(a|bb)?"); 
__sysout(test.toString());
__sysout(test.match("a"));
__sysout(test.match("bb"));
__sysout(test.match("4711"));
__sysout(test.match("cc4711"));
__sysout(test.match("abc"));

__sysout("\n\n################################")
var test = new __ContractLiteral(__CType.RegEx,""); 
__sysout(test.toString());
__sysout(test.match("a"));
__sysout(test.match("bb"));
__sysout(test.match("4711"));
__sysout(test.match("cc4711"));
__sysout(test.match("abc"));


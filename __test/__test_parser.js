//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// - TestCase -
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////

contract = __ContractParser.parse("");
contract = __ContractParser.parse("a");
contract = __ContractParser.parse("aaaa");
contract = __ContractParser.parse("a123");
contract = __ContractParser.parse("@");
contract = __ContractParser.parse("?");

contract = __ContractParser.parse("/a*/");
contract = __ContractParser.parse("/^a?$/");
contract = __ContractParser.parse("/[a-z]/");
contract = __ContractParser.parse("/abc*/");
contract = __ContractParser.parse("/(abc)*/");

contract = __ContractParser.parse("a.b.c");
contract = __ContractParser.parse("a.@.c");
contract = __ContractParser.parse("a.?.c");
contract = __ContractParser.parse("a./reg/.c");
contract = __ContractParser.parse("a.(a+b).c");
contract = __ContractParser.parse("a.(a+b).c");
contract = __ContractParser.parse("a.!(a).c");
contract = __ContractParser.parse("a.!(@).c");
contract = __ContractParser.parse("a.!(?).c");
contract = __ContractParser.parse("a.!(/reg/).c");

contract = __ContractParser.parse("a.b?.c");
contract = __ContractParser.parse("a.b*.c");
contract = __ContractParser.parse("a.(a+b)?.c");
contract = __ContractParser.parse("a.(a&b)*.c");
contract = __ContractParser.parse("a.!(a)?.c");
contract = __ContractParser.parse("a.!(@)*.c");

contract = __ContractParser.parse("((/^get.*$/+length)&!(/^set.*$/)).@");

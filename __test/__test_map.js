//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// - TestCase -
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////

map = new __APC.Util.Map();
map.set("x", 7);
map.set("y", 6345);
map.set("z", 64);

map.contains("x");

map.contains("asdf");


map.get("z");
map.get("asdf");

echo = function (k,v) { __sysout("[#" + k + "] " + v); }; 
map.foreach(echo);

map.clear();

//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 2.01
//////////////////////////////////////////////////

// load hash set
load("__lib/__lib_apache_hashtable.js");
load("__lib/__lib_apache_hashset.js");
// load string padding
load("__lib/__lib_padding.js");
// Load new waek map
load("__lib/__lib_harmony_weakmap.js");
// Load reflect API
load("__lib/__lib_reflect.js");
// Load StringMap
load("__lib/__lib_StringMap.js");

// load logging engine
//load("__lib/__lib_log4js.js");
//var __logger = new __Log(__Log.NONE, __Log.consoleLogger);

// TODO
load("__JsConTest/jscontest.events.handler.effects3.js");

// load system
load("system.js");

// load apc
load("apc.js");

// load configuration
load("config.js");

// load trace path
load("path.js");

// load contract
load("contract.js");

// load violation
load("violation.js")

// load parser
load("parser.js");

// load proxy
load("proxy.js");

// load permit
load("permit.js")



//////////////////////////////////////////////////
// TEST
//////////////////////////////////////////////////

// load assert
load("__lib/__lib_apache_assert.js");

// load testcase
//load("__test/__test_.js");

load("path2.js")

start = new __APC.TracePath.TraceEmpty();

a = new __APC.TracePath.TraceProperty("a");
b = new __APC.TracePath.TraceProperty("b");
c = new __APC.TracePath.TraceProperty("c");
d = new __APC.TracePath.TraceProperty("d");
e = new __APC.TracePath.TraceProperty("e");
f = new __APC.TracePath.TraceProperty("f");


p1 = new __APC.TracePath.TracePath(b, c);

q1 =  new __APC.TracePath.TracePath(d, e);

s0 = new __APC.TracePath.TraceSet(p1, q1);

b0 = new __APC.TracePath.TracePath(start, a);
b1 = new __APC.TracePath.TracePath(b0, s0);
b2 = new __APC.TracePath.TracePath(b1, f);


// final
//finalTrie = new __APC.TracePath.PathTrie();
//finalTrie.insert(start, new __APC.TracePath.PathTrie());


trie = new __APC.TracePath.PathTrie();
trie.append(a);
trie.append(b);
trie.append(c);

trie2 = new __APC.TracePath.PathTrie();
trie2.append(a);

trie.merge(trie2);

__sysout("@ " + trie.toString());
__sysout("$ " + trie.dump("#", new Array()));


quit();

//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// - TestCase -
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////


empty = new __APC.TracePath.TraceEmpty();

a = new __APC.TracePath.TraceProperty("a");
b = new __APC.TracePath.TraceProperty("b");
c = new __APC.TracePath.TraceProperty("c");
d = new __APC.TracePath.TraceProperty("d");
e = new __APC.TracePath.TraceProperty("e");
f = new __APC.TracePath.TraceProperty("f");

//p1 = new __APC.TracePath.TracePath(b, c);
//q1 =  new __APC.TracePath.TracePath(d, e);
//s0 = new __APC.TracePath.TraceSet(p1, q1);
//b0 = new __APC.TracePath.TracePath(start, a);
//b1 = new __APC.TracePath.TracePath(b0, s0);
//b2 = new __APC.TracePath.TracePath(b1, f);

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


trie = new __APC.TracePath.PathTrie();
trie.endOfPath = true;
__sysout(trie);
trie.append(a);
trie.append(b);
trie.append(c);


//////////////////////////////////////////////////
trie1 = new __APC.TracePath.PathTrie();
trie1.endOfPath = true;
trie1.append(a);

trie.merge(trie1);


//////////////////////////////////////////////////
trie2 = new __APC.TracePath.PathTrie();
trie2.endOfPath = true;
trie2.append(b);
trie2.append(c);

trie.merge(trie2);


//////////////////////////////////////////////////
trie3 = new __APC.TracePath.PathTrie();
trie3.endOfPath = true;
trie3.append(b);
trie3.append(c);
trie3.append(c);

trie.merge(trie3);


//////////////////////////////////////////////////
trieX = new __APC.TracePath.PathTrie();
trieX.endOfPath = true;

trieX.append(a);
trieX.append(b);
trieX.append(c);

trieY = new __APC.TracePath.PathTrie();
trieY.endOfPath = true;

trieY.append(a);
trieY.append(b);
trieY.append(c);
trieY.append(d);
trieY.append(f);

trieX.merge(trieY);


//////////////////////////////////////////////////
trie.merge(trieX);

trieY.append(__APC.TracePath.TraceProperty("SASA"));

//////////////////////////////////////////////////
__sysout("\n\n### TO STRING");
__sysout(trie);
__sysout(trie.print());

__sysout("\n\n### DUMP");
__sysout(trie.paths);


trie.paths.foreach(function(s, o) {
__sysout(":" + o);
});

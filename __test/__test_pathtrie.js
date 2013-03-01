

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

// final
//finalTrie = new __APC.TracePath.PathTrie();
//finalTrie.insert(start, new __APC.TracePath.PathTrie());

trie = new __APC.TracePath.PathTrie();

trie.endOfPath = true;

trie.add(a);
trie.add(b);
trie.add(c);

//trie2 = new __APC.TracePath.PathTrie();
//trie2.append(a);

//trie.merge(trie2);

__sysout(trie);

__sysout("\n\n### TO STRING");
__sysout(trie.print());

__sysout("\n\n### DUMP");
//__sysout(trie.dump());


trie.dump().foreach(function(s, o) {
__sysout(o + "\n");
});






trie1 = new __APC.TracePath.PathTrie();
trie1.endOfPath = true;
trie1.add(a);

trie.merge(trie1);




trie2 = new __APC.TracePath.PathTrie();
trie2.endOfPath = true;
trie2.add(b);
trie2.add(c);

trie.merge(trie2);

trie3 = new __APC.TracePath.PathTrie();
trie3.endOfPath = true;
trie3.add(b);
trie3.add(c);
trie3.add(c);

trie.merge(trie3);

__sysout("\n\n### TO STRING");
__sysout(trie.print());

__sysout("\n\n### DUMP");
__sysout(trie.dump());


trie.dump().foreach(function(s, o) {
__sysout(":" + o);
});






start = new __TraceEmpty();

a = new __TraceProperty("a");
b = new __TraceProperty("b");
c = new __TraceProperty("c");
d = new __TraceProperty("d");
e = new __TraceProperty("e");
f = new __TraceProperty("f");


p1 = new __TracePath(b, c);

q1 =  new __TracePath(d, e);

s0 = new __TraceSet(p1, q1);

b0 = new __TracePath(start, a);
b1 = new __TracePath(b0, s0);
b2 = new __TracePath(b1, f);

__sysout(b2);

(b2.dump(new Array())).foreach(function(k,v){
		__sysout(v);
});



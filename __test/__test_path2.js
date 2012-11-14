var fname = "f";
var vname = "v";

obj = __APC.permit("@", {a:2, b:3, x:{a:2, b:3, c:4, d:5}, y:{a:2, b:3, c:4, d:5}}, vname);

obj.a;
obj.b;
obj.x.a
obj.y.b
obj.a = 4711;
obj.x = {};
obj.x.a = 4712;


var reffect = __APC.Effect.getReadEffect(fname);
reffect.foreach(function(k, v){
		__sysout("<READ> " + v);
});

var weffect = __APC.Effect.getWriteEffect(fname);
weffect.foreach(function(k, v){
		__sysout("<WRITE> " + v);
});

// NOTE - todo deletes the list
__look();

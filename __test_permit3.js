//////////////////////////////////////////////////
// JS Proxy API - TestCase
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////

// obj in den contract mit einbauen
// so dass contract = obj.a.a.a
// und obj auch geschützt wird / bekommt man das mit ?


/* TODO:
 * test assoziatives array
 * with statement
 * for in
 */




//////////////////////////////////////////////////
//

__config_ViolationMode = __ViolationMode.OBSERVER;
//__config_ViolationMode = __ViolationMode.PROTECTOR;

function(obj) {
__permit("", this, "obj");
}


__permit("dsfasdf", function(a, b) {
});




// WITH
__sysout("\n\n\n");
obj = createObject();
__permit("a*", this, "obj");
with(obj) {
		__sysout(this.a);
		__sysout(__dump(b));
		__sysout(__dump(c));
		__sysout(__dump(a=4711));
		__sysout(__dump(c=4711));
		__sysout(__dump(b=4711));
		f();
		g();
		gg();
		gg().a;
		h();
}
__dumpAccess();
__dumpViolation();


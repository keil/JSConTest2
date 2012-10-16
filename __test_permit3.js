//////////////////////////////////////////////////
// JS Proxy API - TestCase
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.20.0
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

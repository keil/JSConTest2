//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 2.00
//////////////////////////////////////////////////



//////////////////////////////////////////////////
// ARRAY FOREACH
//////////////////////////////////////////////////

Array.prototype.foreach = function( callback ) {
		for( var k=0; k<this .length; k++ ) {
				callback( k, this[ k ] );
		}
}



//////////////////////////////////////////////////
// SYSOUT
//////////////////////////////////////////////////

/* API Standard Output
*/
function __sysout(value) {
		if(typeof print != "undefined")
				// JS Shell concole oputput
				print(value);
		else if(document.write != "undefined")
				document.write(value);
		else if(typeof alert  != "undefined")
				// Standard alert notification
				alert(value);
}



//////////////////////////////////////////////////
// DUMP
//////////////////////////////////////////////////

/* Dump Values to String Output
*/
function __dump(value) {
		if (value === Object(value)) return "[" + typeof value + "]";
		if (typeof value == "string") return "\"" + value + "\"";
		return "" + value;
}



//////////////////////////////////////////////////
// CHECK
//////////////////////////////////////////////////

/* Check function
*/
function __look() {
		__dumpAccess();
		__dumpViolation();
}

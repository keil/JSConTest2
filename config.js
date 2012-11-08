//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// - Configuration File -
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 2.00
//////////////////////////////////////////////////



//////////////////////////////////////////////////
// VIOLATION MODE
// PROTECTOR: return undefined, if property access in not allowed
// OBSERVER: recorded access violations
//////////////////////////////////////////////////

// Violation Mode
var __ViolationMode = {
		PROTECTOR: "protector",
		OBSERVER: "observer"
}



//////////////////////////////////////////////////
// Properties
//////////////////////////////////////////////////

// violation mode
__config_ViolationMode = __ViolationMode.OBSERVER;

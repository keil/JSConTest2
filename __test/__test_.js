//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// - TestCase -
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//

__config_ViolationMode = __ViolationMode.OBSERVER;
//__config_ViolationMode = __ViolationMode.PROTECTOR;

test = __permit("a", {});

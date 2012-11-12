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

//////////////////////////////////////////////////
// TESTS

obj = {
	get value(){
        return this._value;
    },
    set value(val){
        this._value = val;
    }
}
test = __permit("@", obj);
test.value;
test.value = "chacha";
__look();

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
// TESTS

obj = {
	get value(){
        return this._value;
    },
    set value(val){
        this._value = val;
    }
}
test = __APC.permit("@", obj);
test.value;
test.value = "chacha";
__look();

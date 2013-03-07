/*
 * JavaScript Reflection API
 *  for Access Permission Contracts
 *  - TestCase
 *
 * Copyright (c) 2013, Proglang, University of Freiburg.
 *  http://proglang.informatik.uni-freiburg.de/
 * All rights reserved.
 *
 * Author Matthias Keil
 *  http://www.informatik.uni-freiburg.de/~keilr/
 *
 * $Date$
 * $Rev$
 */

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

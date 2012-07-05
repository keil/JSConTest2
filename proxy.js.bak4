//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
//////////////////////////////////////////////////



//////////////////////////////////////////////////
// MISCELLANEOUS
//////////////////////////////////////////////////

/* 
 * API Standard Output
 */
function sysout(value) {
		if(sysout.jsshell)
				print(value);
		else 
				alert(value);
}

// JS Shell concole oputput
sysout.jsshell = true;



/*
 * Wraps obj with a Proxy
 */
function makeProxy(obj) {
		if(obj instanceof Function) {
				return Proxy.createFunction(AccessHandler(obj), Object.getPrototypeOf(obj));
		} else if(obj instanceof Object) {
				return Proxy.create(AccessHandler(obj), Object.getPrototypeOf(obj));
		}
}

/*
 * Apply Proxy to base[name]
 */
function applyProxy(base, name) {
		obj = base[name];
		base[name] = makeProxy(obj);
}





//function ValueWrapper(target) {
//		return {
//				toSource: function () {return "X";},
//				toString: function () {return "X";}
//		}
//}


//////////////////////////////////////////////////
// HANDLER
//////////////////////////////////////////////////

function AccessHandler(target) {
		return {
				get: function(receiver, name) {
						sysout("[PROPERTY READ] " + name);
						value =  target[name];
						return value; 
						//						if(name == "toSource") {
						//								print("CALL toSource()");
						//								return target.toSource();
						//						}


						//						if(value instanceof Function) {
						//								print("FUNCTION");
						//								return undefinied;
						//						}
						//						else if(value instanceof Object) {
						//								return Proxy.create(AccessHandler(value));
						//						} else {
						//								return value;
						//
						//						}
						//

						//						if(name == "toString") {
						//								print("call to string");
						//								return "XXX";
						//						}

						//						if(name == "toSource") {
						//								print("call to source");
						//								return target[name];
						//						}

						//						return Proxy.create(AccessHandler(value));



						//						return ValueWrapper(Proxy.create(AccessHandler(value)));


						//return Proxy.create(AccessHandler(value));

						// return 





						//						return receiver;
				},
				set: function(receiver, name, val) {
						sysout("[PROPERTY WRITE] " + name);
						target[name] = val;
						return true;
				}//`:w

				,
						//				toString: function() {return target.toString();} 


		}}


;

// ...
//////////////////////////////////////////////////
// PROXY
//////////////////////////////////////////////////

var test = {
		x: 4711,
		y: {a:47, b:11},
		z: 4712
};

//test = applyProxy(test);

//test = Proxy.create(AccessHandler(test));
//test2 = Proxy.create(handlerMaker(test));


var test1 = {
		x: 6543,
		y: {a:34, b:35},
		z: 435345
};

//test1 = applyProxy(test1);


applyProxy(this, "test");
applyProxy(this, "test1");





//var px = Proxy.create({
//		get: function(proxy, name) {
//				return 'Hello, '+ name;
//		}
//});


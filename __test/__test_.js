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

test = __APC.permit("a", {});



obj = {x:4711};

//eval("__sysout(obj.x)");

//with({}) {
//		obj = {x:"chacha"};
//		eval("__sysout(obj.x)");

//}


/*
function load(exp) {
		if(scope==null) {
				var scope = {obj:{x:"chahca"}};
		}

		function httpGet(theUrl)
		{
				var xmlHttp = null;

				xmlHttp = new XMLHttpRequest();
				xmlHttp.open( "GET", theUrl, false );
				xmlHttp.send( null );
				return xmlHttp.responseText;
		}

		with(scope) {
				eval(httpGet(exp));
				__sysout(onFocusUser);
		}
}



load("http://rm-keil.de/javascripts/functions.js");
*/

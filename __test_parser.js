//////////////////////////////////////////////////
// JS Proxy API - TestCase
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////



Array.prototype.foreach = function( callback ) {
  for( var k=0; k<this .length; k++ ) {
    callback( k, this[ k ] );
  }
}

var testcases = ["", "@", "?", "aa", "(aa|bb)", "(aa|bb|cc)", "aa?", "(aa|bb)?", "(aa|bb|cc)?", "aa*", "(aa|bb)*", "(aa|bb|cc)*" ];


testcases.foreach(function(k,v){

		parser = new __ContractParser();
		contract = parser.parse(v);

		__sysout(k + ") " + v + " => " + contract.toString());

});


var testcases2 = ["", "a.b.@", "a.b.?", "aa.bb", "aa.(aa|bb).cc", "?.(aa|bb|cc).*", "aa.aa?.aa", "aa.(aa|bb)?.cc", "aa.(aa|bb|cc)?.dd", "aa.aa*", "aa.(aa|bb)*", "aa.(aa|bb|cc)*" ];


testcases2.foreach(function(k,v){

		parser = new __ContractParser();
		contract = parser.parse(v);

		__sysout("\n\n###################################");
		__sysout(k + ") " + v + " \n=> " + contract.dump());
		__sysout("###################################");

});


//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.20.0
//////////////////////////////////////////////////



////////////////////////////////////////////////////
// PERMIT CONTRACT
////////////////////////////////////////////////////

/** Standard Access Handler
 * @param contract Access Permission Contract to apply
 * @param value Target value
 */
function __permit(contract, value) {
		// TODO
		// apply contract and wrap value
}


// TODO
//////////////////////////////////////////////////
// Contract
// data structure for contracts
// Contract Literal	c = @ | ? | RegEx | RegEx? | RegEx*
// Contract			C = [] | c.C 
//////////////////////////////////////////////////

var __CType = {
		AT: "@",
		QM: "?",
		RegEx: "RegEx",
		RegExQM: "RegEx?",
		RegExS: "RegEx*"
} 

function __ContractLiteral(type, value) {
		return {
				type : type, 
				value : value
		}
}

function __Contract(literal, contract) {
		return {
				c : literal,
				cp : contract,


				readable: function() {
				}
				
				writeable: function() {
				}
		}
}

function __Contracts() {
		return {
				contracts : new Array(),

						  set : function(c) {
								  this.contracts.push(c);
						  },

						  forach : function(func) {
								  this.contracts.forach(func);
						  }

							readable : function () {
							
							
									return {
											valid: true,
											cts: contracts
									};
							},
							writeable : function () {
							

								return true;
							}
		}
}

//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 1.00
//////////////////////////////////////////////////

// load trace path
load("parser.js");



//////////////////////////////////////////////////
// Contract
// data structure for contracts
//
// RegEx              = /.../
// Name               = x...
// Literal            = @ | ? | Name | RegEx
// Set                = Literal | (Contract+Contract) | (Contract&Contract) | !(Contract)
// Quantifiable       = Set | Set? | Set*
// Contract           = Quantifiable | Quantifiable.Contract 
//////////////////////////////////////////////////


function Literal() {
		return {
				/** Get Value
				 * @return value
				 */
				getValue: function() {
						return value;
				},

						/** Is Nullable
						 * @return nullable
						 */
						isNullable: function() {
								return nullable;
						},

						/** Dump
						 * @return string
						 */
						dump: function() {
								return value;
						},


						/** To String
						 * @return string
						 */
						toString: function() {
								return value;
						}
		};
}




function AtLiteral() {
		return {

				value: "@",
				nullable: false,

				/** Match
				 * @param name Variable name
				 * @return true iff the literal matches the name, false otherwise
				 */
				match: function(name) {
						return false;

				}

		};
}
AtLiteral.prototype = new Literal();




function QMarkLiteral() {
		return {
				value: "?",
						nullable: false,


						/** Match
						 * @param name Variable name
						 * @return true iff the literal matches the name, false otherwise
						 */
						match: function(name) {
								return true;

						}

		};
}
QMarkLiteral.prototype = new Literal();


function NameLiteral(name) {
		return {
				value: name,
						nullable: false,


						/** Match
						 * @param name Variable name
						 * @return true iff the literal matches the name, false otherwise
						 */
						match: function(name) {
								return true;

						}

		};
}
NameLiteral.prototype = new Literal();


function RegExLiteral(regex) {
		return {
				value: regex,
						nullable: false,


						/** Match
						 * @param name Variable name
						 * @return true iff the literal matches the name, false otherwise
						 */
						match: function(name) {
								return (new RegExp("^" + value + "$")).test(name);
						}

		};
}
RegExLiteral.prototype = new Literal();






function Contract() {
		return {



		};
}






















// TODO dump


function QMarkContract(contract) {
		return {
				isNullable: function() {
						return true;
				},
				isReadable: function(name) {
						return contract.isReadable();
				},
				isWriteable: function(name) {
						return contract.isWriteable();
				},
				dump: function() {
						return "[" + contract.dump() + "]"
				},
				toString: function() {
						return contract.toString() + "?";
				},
		};
}

function StarContract(contract) {
		return {
				isNullable: function() {
						return true;
				},
				isReadable: function(name) {
						return contract.isReadable();
				},
				isWriteable: function(name) {
						return contract.isWriteable();
				},
				dump: function() {
						return "[" + contract.dump() + "]"
				},
				toString: function() {
						return contract.toString() + "*";
				},
		};
}

function OrContract(contract0, contract1) {
return {
				isNullable: function() {
						return (contract0.isNullable() || contract0.isNullable());
				},
				isReadable: function(name) {
						return (contract0.isReadable() || contract0.isReadable());
				},
				isWriteable: function(name) {
						return (contract0.isWriteable() || contract0.isWriteable());
				},
				dump: function() {
						return "[+ C0:" + contract0.dump() + " C1:" +  contract1.dump() +  "]"
				},
				toString: function() {
						return contract0.toString() + "+" + contract1.toString();
				},
		};
}

function AndContract(contract0, contract1) {
return {
				isNullable: function() {
						return (contract0.isNullable() && contract0.isNullable());
				},
				isReadable: function(name) {
						return (contract0.isReadable() && contract0.isReadable());
				},
				isWriteable: function(name) {
						return (contract0.isWriteable() && contract0.isWriteable());
				},
				dump: function() {
						return "[& C0:" + contract0.dump() + " C1:" +  contract1.dump() +  "]"
				},
				toString: function() {
						return contract0.toString() + "&" + contract1.toString();
				},
		};
}

function NegContract(contract) {
		return {
				isNullable: function() {
						return contract.isNullable() ? false : true;
				},
				isReadable: function(name) {
						return contract.isReadable() ? false : true;
				},
				isWriteable: function(name) {
						return contract.isWriteable() ? false : true;
				},
				dump: function() {
						return "[& C0:" + contract0.dump() + " C1:" +  contract1.dump() +  "]"
				},
				toString: function() {
						return contract0.toString() + "&" + contract1.toString();
				},
		};
}

function ConcatContract(contract0, contract1) {
	return {
				isNullable: function() {
						return (contract0.isNullable() && contract0.isNullable());
				},
				isReadable: function(name) {
						// TODO
						//return (contract0.isReadable() && contract0.isReadable());
				},
				isWriteable: function(name) {
						// TODO
						//return (contract0.isWriteable() && contract0.isWriteable());
				},
				dump: function() {
						return "[& C0:" + contract0.dump() + " C1:" +  contract1.dump() +  "]"
				},
				toString: function() {
						return contract0.toString() + "." + contract1.toString();
				},
		};

}



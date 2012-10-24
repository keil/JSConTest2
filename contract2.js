//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 1.00
//////////////////////////////////////////////////

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




function __EmptyLiteral() {
		return {
				isNullable: function() {
						return true;
				},
				isReadable: function(name) {
						return false;
				},
				isWriteable: function(name) {
						return false;
				},
				derive: function(name) {
						// TODO
						return new __AtLiteral();
				},
				dump: function() {
						return "[-]";
				},
				toString: function() {
						return "-"; 
				},
		};
}


function __AtLiteral() {
		return {
				isNullable: function() {
						return false;
				},
				isReadable: function(name) {
						return false;
				},
				isWriteable: function(name) {
						return false;
				},
				derive: function(name) {
						// TODO
						return new __AtLiteral();
				},
				dump: function() {
						return "[@]";
				},
				toString: function() {
						return "@"; 
				},
		};
}


function __QMarkLiteral() {
		return {
				isNullable: function() {
						return false;
				},
				isReadable: function(name) {
						return true;
				},
				isWriteable: function(name) {
						return true;
				},
				derive: function(name) {
						// TODO
						return new __EmptyLiteral();
				},
				dump: function() {
						return "[?]";
				},
				toString: function() {
						return "?"; 
				}
		};
}


function __NameLiteral(varname) {
		return {
				isNullable: function() {
						return false;
				},
				isReadable: function(name) {
						return (name == varname);
				},
				isWriteable: function(name) {
						return (name == varname);
				},
				derive: function(name) {
						// TODO
						return (name == varname) ? new __EmptyLiteral() : new __AtLiteral();
				},
				dump: function() {
						return "[" + varname + "]";
				},
				toString: function() {
						return varname; 
				}
		};
}


function __RegExLiteral(regex) {
		return {
				isNullable: function() {
						return false;
				},
				isReadable: function(name) {
						return (new RegExp(regex)).test(name);
				},
				isWriteable: function(name) {
						return (new RegExp(regex)).test(name);
				},
				derive: function(name) {
						// TODO
						return (new RegExp(regex)).test(name) ? new __EmptyLiteral() : new __AtLiteral();
				},
				dump: function() {
						return "/" + regex + "/";
				},
				toString: function() {
						return varname; 
				}
		};
}



















// TODO dump


function __QMarkContract(contract) {
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
				derive: function(name) {
						// TODO
						return contract.derive(name);
				},
				dump: function() {
						return "[" + contract.dump() + "]"
				},
				toString: function() {
						return contract.toString() + "?";
				},
		};
}

function __StarContract(contract) {
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
				derive: function(name) {
						// TODO
						return contract.derive(name);
				},
				dump: function() {
						return "[" + contract.dump() + "]"
				},
				toString: function() {
						return contract.toString() + "*";
				},
		};
}

function __OrContract(contract0, contract1) {
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
				derive: function(name) {
						// TODO
						return new __OrContract(contract0.derive(name), contract1.derive(name));
				},
				dump: function() {
						return "[+ C0:" + contract0.dump() + " C1:" +  contract1.dump() +  "]"
				},
				toString: function() {
						return contract0.toString() + "+" + contract1.toString();
				},
		};
}

function __AndContract(contract0, contract1) {
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
				derive: function(name) {
						// TODO
						return new __AndContract(contract0.derive(name), contract1.derive(name));
				},
				dump: function() {
						return "[& C0:" + contract0.dump() + " C1:" +  contract1.dump() +  "]"
				},
				toString: function() {
						return contract0.toString() + "&" + contract1.toString();
				},
		};
}

function __NegContract(contract) {
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
				derive: function(name) {
						// TODO
						return new __NegContract(contract.derive(name));
				},
				dump: function() {
						return "[& C0:" + contract0.dump() + " C1:" +  contract1.dump() +  "]"
				},
				toString: function() {
						return contract0.toString() + "&" + contract1.toString();
				},
		};
}

function __ConcatContract(contract0, contract1) {
		return {
				isNullable: function() {
						return (contract0.isNullable() && contract0.isNullable());
				},
				isReadable: function(name) {
						if(contract0.isNullable()) return (contract0.isReadable() || contract0.isReadable())
						else return contract0.isReadable();
				},
				isWriteable: function(name) {
						if(contract0.isNullable()) return contract1.isWriteable();
						else if(contract1.isNullable()) return contract0.isWriteable();
						else return false;
				},
				derive: function(name) {
						// TODO
						if(contract0.isNullable()) return new __OrContract(__ConcatContract(contract0.derive(name), contract1), contract1.derive(name));
						else __ConcatContract(contract0.derive(name), contract1);
				},
				dump: function() {
						return "[& C0:" + contract0.dump() + " C1:" +  contract1.dump() +  "]"
				},
				toString: function() {
						return contract0.toString() + "." + contract1.toString();
				},
		};
}


// TODO fix dump


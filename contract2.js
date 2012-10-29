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
// Literal            = ''| @ | ? | Name | RegEx
// Set                = Literal | (Contract+Contract) | (Contract&Contract) | !(Contract)
// Quantifiable       = Set | Set? | Set*
// Contract           = Quantifiable | Quantifiable.Contract 
//////////////////////////////////////////////////



/**
 * '' Literal (Empty Literal)
 */
function __EmptyLiteral() {
		return {
				/** v('') :== true */
				isNullable: function() {
						return true;
				},
				/** '' ~ name */
				isReadable: function(name) {
						return (name=='');
				},
				/** '' ~ name */
				isWriteable: function(name) {
						return (name=='');
				},
				/** (d_name '') ::= @ */
				derive: function(name) {
						return new __AtLiteral();
				},
				/** Dump
				 * @return string
				 */
				dump: function() {
						return "[\'\']";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return ""; 
				},
		};
}

/**
 * @ Literal (Empty Set)
 */
function __AtLiteral() {
		return {
				/** v(@) :== false */
				isNullable: function() {
						return false;
				},
				/** false */
				isReadable: function(name) {
						return false;
				},
				/** false */
				isWriteable: function(name) {
						return false;
				},
				/** (d_name @) ::= @ */
				derive: function(name) {
						return new __AtLiteral();
				},
				/** Dump
				 * @return string
				 */
				dump: function() {
						return "[@]";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return "@"; 
				},
		};
}

/**
 * ? Literal (universe)
 */
function __QMarkLiteral() {
		return {
				/** v(?) :== false */
				isNullable: function() {
						return false;
				},
				/** true */
				isReadable: function(name) {
						return true;
				},
				/** true */
				isWriteable: function(name) {
						return true;
				},
				/** (d_name ?) ::= '' */
				derive: function(name) {
						return new __EmptyLiteral();
				},
				/** Dump
				 * @return string
				 */
				dump: function() {
						return "[?]";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return "?"; 
				}
		};
}

/**
 * x Literal (property name)
 */
function __NameLiteral(varname) {
		return {
				/** v(varname) :== false */
				isNullable: function() {
						return false;
				},
				/** varname == name */
				isReadable: function(name) {
						return (name == varname);
				},
				/** varname == name */
				isWriteable: function(name) {
						return (name == varname);
				},
				/** (d_name varname) ::= '' if varname == name, @ otherwise */
				derive: function(name) {
						return (name == varname) ? new __EmptyLiteral() : new __AtLiteral();
				},
				/** Dump
				 * @return string
				 */
				dump: function() {
						return "[" + varname + "]";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return varname; 
				}
		};
}

/**
 * RegEx Literal (regular expression)
 */
function __RegExLiteral(regex) {
		return {
				/** v(RegEx) :== false */
				isNullable: function() {
						return false;
				},
				/** RegEx ~ name */
				isReadable: function(name) {
						return (new RegExp(regex)).test(name);
				},
				/** RegEx ~ name */
				isWriteable: function(name) {
						return (new RegExp(regex)).test(name);
				},
				/** (d_name RegEx) ::= '' if RegEx ~ name, @ otherwise */
				derive: function(name) {
						return (new RegExp(regex)).test(name) ? new __EmptyLiteral() : new __AtLiteral();
				},
				/** Dump
				 * @return string
				 */
				dump: function() {
						return "/" + regex + "/";
				},
				/** To String
				 * @return string
				 */
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
				/**
				 * Dump
				 * @return string
				 */
				dump: function() {
						return "[" + contract.dump() + "]"
				},
				/**
				 * To String
				 * @return string
				 */
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
				/**
				 * Dump
				 * @return string
				 */
				dump: function() {
						return "[" + contract.dump() + "]"
				},
				/**
				 * To String
				 * @return string
				 */
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
				/**
				 * Dump
				 * @return string
				 */
				dump: function() {
						return "[+ C0:" + contract0.dump() + " C1:" +  contract1.dump() +  "]"
				},
				/**
				 * To String
				 * @return string
				 */
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
				/**
				 * Dump
				 * @return string
				 */
				dump: function() {
						return "[& C0:" + contract0.dump() + " C1:" +  contract1.dump() +  "]"
				},
				/**
				 * To String
				 * @return string
				 */
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
				/**
				 * Dump
				 * @return string
				 */
				dump: function() {
						return "[& C0:" + contract0.dump() + " C1:" +  contract1.dump() +  "]"
				},
				/**
				 * To String
				 * @return string
				 */
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
				/**
				 * Dump
				 * @return string
				 */
				dump: function() {
						return "[& C0:" + contract0.dump() + " C1:" +  contract1.dump() +  "]"
				},
				/**
				 * To String
				 * @return string
				 */
				toString: function() {
						return contract0.toString() + "." + contract1.toString();
				},
		};
}


// TODO fix dump


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
// Literal            = '' | @ | ? | Name | RegEx
// Set                = Literal | (Contract+Contract) | (Contract&Contract) | !(Contract)
// Quantifiable       = Set | Set? | Set*
// Contract           = Quantifiable | Quantifiable.Contract 
//////////////////////////////////////////////////



//////////////////////////////////////////////////
// LITERALE
//////////////////////////////////////////////////

/**
 * '' Literal (Empty Literal)
 */
function __EmptyLiteral() {
		return {
				/** n('') ::= false */
				isEmpty: function() {
						return false;
				},
				/** v('') ::= true */
				isNullable: function() {
						return true;
				},
				/** r('') ::= false */
				isReadable: function(name) {
						return false;
				},
				/** w('') ::= false */
				isWriteable: function(name) {
						return false;
				},
				/** (d_name '') ::= @ */
				derive: function(name) {
						return new __AtLiteral();
				},
				/** Dump
				 * @return string
				 */
				dump: function() {
						return " [] ";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return ""; 
				},
				/** Reduce Contract
				 * @return n-reduced contract
				 */
				reduce: function() {
						return this;
				}
		};
}

/**
 * @ Literal (Empty Set)
 */
function __AtLiteral() {
		return {
				/** n(@) ::= true */
				isEmpty: function() {
						return true;
				},
				/** v(@) ::= false */
				isNullable: function() {
						return false;
				},
				/** r(@) ::= false */
				isReadable: function(name) {
						return false;
				},
				/** w(@) ::= false */
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
						return " [@] ";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return "@"; 
				},
				/** Reduce Contract
				 * @return n-reduced contract
				 */
				reduce: function() {
						return this;
				}
		};
}

/**
 * ? Literal (universe)
 */
function __QMarkLiteral() {
		return {
				/** n(?) ::= false */
				isEmpty: function() {
						return false;
				},
				/** v(?) ::= false */
				isNullable: function() {
						return false;
				},
				/** r(?) ::= true */
				isReadable: function(name) {
						return true;
				},
				/** w(?) ::= true */
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
						return " [?] ";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return "?"; 
				},
				/** Reduce Contract
				 * @return n-reduced contract
				 */
				reduce: function() {
						return this;
				}
		};
}

/**
 * x Literal (property name)
 */
function __NameLiteral(varname) {
		return {
				/** n(varname) ::= false */
				isEmpty: function() {
						return false;
				},
				/** v(varname) ::= false */
				isNullable: function() {
						return false;
				},
				/** r(varname) ::= varname == name */
				isReadable: function(name) {
						return (name == varname);
				},
				/** w(varname) ::= varname == name */
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
						return " [" + varname + "] ";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return varname; 
				},
				/** Reduce Contract
				 * @return n-reduced contract
				 */
				reduce: function() {
						return this;
				}
		};
}

/**
 * RegEx Literal (regular expression)
 */
function __RegExLiteral(regex) {
		return {
				/** n(RegEx) ::= false */
				isEmpty: function() {
						return false;
				},
				/** v(RegEx) ::= false */
				isNullable: function() {
						return false;
				},
				/** r(RegEx) ::= RegEx ~ name */
				isReadable: function(name) {
						return (new RegExp(regex)).test(name);
				},
				/** w(RegEx) ::= RegEx ~ name */
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
						return " [/" + regex + "/] ";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return "/" + regex + "/"; 
				},
				/** Reduce Contract
				 * @return n-reduced contract
				 */
				reduce: function() {
						return this;
				}
		};
}



//////////////////////////////////////////////////
// QUANTIFIABLE
//////////////////////////////////////////////////

/**
 * C? Contract (optional)
 */
function __QMarkContract(contract) {
		return {
				/** n(C?) ::= false */
				isEmpty: function() {
						return false;
				},
				/** v(C?) :== true */
				isNullable: function() {
						return true;
				},
				/** r(C?) ::= r(C) */
				isReadable: function(name) {
						return contract.isReadable(name);
				},
				/** w(C?) ::= w(C) */
				isWriteable: function(name) {
						return contract.isWriteable(name);
				},
				/** (d_name C?) ::= (d_name C) */
				derive: function(name) {
						return  contract.derive(name);
				},
				/** Dump
				 * @return string
				 */
				dump: function() {
						return contract.dump() + "? ";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return contract.toString() + "?";
				},
				/** Reduce Contract
				 * @return n-reduced contract
				 */
				reduce: function() {
						return new __QMarkContract(contract.reduce());
				}
		};
}

/**
 * C* Contract (kleene star)
 */
function __StarContract(contract) {
		return {
				/** n(C*) ::= false */
				isEmpty: function() {
						return false;
				},
				/** v(C*) :== true */
				isNullable: function() {
						return true;
				},
				/** r(C*) ::= r(C) */
				isReadable: function(name) {
						return contract.isReadable(name);
				},
				/** w(C*) ::= w(C) */
				isWriteable: function(name) {
						return contract.isWriteable(name);
				},
				/** (d_name C*) ::= (d_name C).C* */
				derive: function(name) {
						return new __ConcatContract(contract.derive(name), this);
				},
				/** Dump
				 * @return string
				 */
				dump: function() {
						return contract.dump() + "* ";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return contract.toString() + "*";
				},
				/** Reduce Contract
				 * @return n-reduced contract
				 */
				reduce: function() {
						return new __StarContract(contract.reduce());
				}
		};
}



//////////////////////////////////////////////////
// SETS
//////////////////////////////////////////////////

/**
 * C0+C1 Contract (logical or)
 */
function __OrContract(contract0, contract1) {
		return {
				/** n(C0+C1) ::= n(C0) & n(C1) */
				isEmpty: function() {
						return contract0.isEmpty() && contract1.isEmpty();
				},
				/** v(C0+C1) :== v(C0) + v(C1) */
				isNullable: function() {
						return (contract0.isNullable() || contract1.isNullable());
				},
				/** r(C0+C1) :== r(C0) + r(C1) */
				isReadable: function(name) {
						return (contract0.isReadable(name) || contract1.isReadable(name));
				},
				/** w(C0+C1) :== w(C0) + w(C1) */
				isWriteable: function(name) {
						return (contract0.isWriteable(name) || contract1.isWriteable(name));
				},
				/** (d_name C0+C1) :== (d_name C0) + (d_name C1) */
				derive: function(name) {
						return new __OrContract(contract0.derive(name), contract1.derive(name));
				},
				/** Dump
				 * @return string
				 */
				dump: function() {
						return " (" + contract0.dump() + " + " +  contract1.dump() +  ") ";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return "(" + contract0.toString() + "+" + contract1.toString() + ")";
				},
				/** Reduce Contract
				 * @return n-reduced contract
				 */
				reduce: function() {
						if(this.isEmpty())
								return new __AtLiteral();
						else if(contract0.isEmpty())
								return contract1.reduce();
						else if(contract1.isEmpty())
								return contract0.reduce();
						else 
								return new  __OrContract(contract0.reduce(), contract1.reduce());
				}
		};
}

/**
 * C0&C1 Contract (logical and)
 */
function __AndContract(contract0, contract1) {
		return {
				/** n(C0+C1) ::= n(C0) + n(C1) */
				isEmpty: function() {
						return contract0.isEmpty() || contract1.isEmpty();
				},
				/** v(C0&C1) :== v(C0) & v(C1) */
				isNullable: function() {
						return (contract0.isNullable() && contract1.isNullable());
				},
				/** r(C0&C1) :== r(C0) & r(C1) */
				isReadable: function(name) {
						return (contract0.isReadable(name) && contract1.isReadable(name));
				},
				/** w(C0&C1) :== w(C0) & w(C1) */
				isWriteable: function(name) {
						return (contract0.isWriteable(name) && contract1.isWriteable(name));
				},
				/** (d_name C0&C1) :== (d_name C0) & (d_name C1) */
				derive: function(name) {
						return new __AndContract(contract0.derive(name), contract1.derive(name));
				},
				/** Dump
				 * @return string
				 */
				dump: function() {
						return " (" + contract0.dump() + " & " +  contract1.dump() +  ") ";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return "(" + contract0.toString() + "&" + contract1.toString() + ")";
				},
				/** Reduce Contract
				 * @return n-reduced contract
				 */
				reduce: function() {
						if(this.isEmpty())
								return new __AtLiteral();
						else 
								return new  __AndContract(contract0.reduce(), contract1.reduce());
				}
		};
}

/**
 * !C Contract (negation)
 */
function __NegContract(contract) {
		return {
				/** n(!C) ::= true if C=?, false otherwise */
				isEmpty: function() {
						if(contract.toString()=="?")
								return true;
						else 
								return false;
				},
				/** v(!C) ::= false if v(C), false otherwise */
				isNullable: function() {
						return contract.isNullable() ? false : true;
				},
				/** r(!C) ::= false if r(C), false otherwise */
				isReadable: function(name) {
						return contract.isReadable(name) ? false : true;
				},
				/** w(!C) ::= false if w(C), false otherwise */
				isWriteable: function(name) {
						return contract.isWriteable(name) ? false : true;
				},
				/** (d_name !C) :== !(d_name C) */
				derive: function(name) {
						return new __NegContract(contract.derive(name));
				},
				/** Dump
				 * @return string
				 */
				dump: function() {
						return " !(" + contract.dump() +  ") ";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return "!(" + contract.toString() + ")" ;
				},
				/** Reduce Contract
				 * @return n-reduced contract
				 */
				reduce: function() {
						if(this.isEmpty())
								return new __AtLiteral();
						else 
								return new  __NegContract(contract.reduce());
				}
		};
}



//////////////////////////////////////////////////
// CONTRACT
//////////////////////////////////////////////////


/**
 * C.C Contract (concatenation)
 */
function __ConcatContract(contract0, contract1) {
		return {
				/** n(C0.C1) ::= n(C0) */
				isEmpty: function() {
						return contract0.isEmpty();
				},
				/** v(C0.C1) :== v(C0) & v(C1) */
				isNullable: function() {
						return (contract0.isNullable() && contract1.isNullable());
				},
				/** r(C0.C1) :== r(C0)+r(C1) if v(C0), r(C0) otherwise */
				isReadable: function(name) {
						if(contract0.isNullable()) return (contract0.isReadable(name) || contract1.isReadable(name))
						else return contract0.isReadable(name);
				},
				/** r(C0.C1) :== w(C1) if v(C0), w(C0) if v(C1,) false otherwise */
				isWriteable: function(name) {
						if(contract0.isNullable()) return contract1.isWriteable(name);
						else if(contract1.isNullable()) return contract0.isWriteable(name);
						else return false;
				},
				/** (d_name C0.C1) :== (D_name C0).C1 + (D_name C1) if V(C0), (D_name C0).C1 otherwise */
				derive: function(name) {
						if(contract0.isNullable()) return new __OrContract(__ConcatContract(contract0.derive(name), contract1), contract1.derive(name));
						else return __ConcatContract(contract0.derive(name), contract1);
				},
				/** Dump
				 * @return string
				 */
				dump: function() {
						return  " " + contract0.dump() + " . " +  contract1.dump() +  " ";
				},
				/** To String
				 * @return string
				 */
				toString: function() {
						return contract0.toString() + "." + contract1.toString();
				},
				/** Reduce Contract
				 * @return n-reduced contract
				 */
				reduce: function() {
						if(this.isEmpty())
								return new __AtLiteral();
						else 
								return new  __ConcatContract(contract0.reduce(), contract1.reduce());
				}
		};
}

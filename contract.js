//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 2.01
//////////////////////////////////////////////////

(function(APC){

		//////////////////////////////////////////////////
		// Contract
		// data structure for contracts
		//
		// RegEx              = /.../
		// Name               = x...
		// Literal            = '' | @ | ? | Name | RegEx | !(Literal)
		// Set                = Literal | (Contract) | (Contract+Contract) | (Contract&Contract) 
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
				return __cache.c({
						/** n('') ::= false */
						isEmpty: function() {
								return false;
						},
					   /** v('') ::= true */
					   isNullable: function() {
							   return true;
					   },
					   /** m('') ::= false */
					   isIndifferent: function() {
							   return false;
					   },
					   /** m*('') ::= false */
					   isUniversal: function() {
							   return false;
					   },
					   //////////////////////////////////////////////////
					   /** r('') ::= false */
					   isReadable: function(name) {
							   return false;
					   },
					   /** w('') ::= false */
					   isWriteable: function(name) {
							   return false;
					   },
					   //////////////////////////////////////////////////
					   /** first('') ::= '' */
					   first: function() {
							   return new Array(this);
					   },
					   /** (d_name '') ::= @ */
					   derive: function(name) {
							   return new __AtLiteral();
					   },
					   /** (d_literal '') ::= '' if literal == '', @ oterhwise */
					   lderive: function(larg) {
							   return (larg==this) ? new __EmptyLiteral() : new __AtLiteral();
					   },
					   //////////////////////////////////////////////////
					   /** Reduce Contract
						* @return n-reduced contract
						*/
					   reduce: function() {
							   // TODO
							   return this;
					   },
					   /** ctx |- C <= this */
					   isSuperSetOf: function(arg, ctx) {
							   /** C <= C' |= true  | C=C' */
							   if(arg==this) return true;
							   /** C <= C' |= true  | n(C) */
							   else if (arg.isEmpty()) return true;

							   /** otherwise */
							   else return false;
					   },
					   /** ctx |- C >= this */
					   isSubSetOf: function(arg, ctx) {
							   /** C <= C' |= true  | n(C') */
							   if(arg.isNullable()) return true;
							   /** C <= C' |= false  | v(C) and ~v(C') */
							   else return false;
					   },
					   //////////////////////////////////////////////////
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
							   return "''"; 
					   }
				});
		}

		/**
		 * @ Literal (Empty Set)
		 */
		function __AtLiteral() {
				return __cache.c({
						/** n(@) ::= true */
						isEmpty: function() {
								return true;
						},
					   /** v(@) ::= false */
					   isNullable: function() {
							   return false;
					   },
					   /** m(@) ::= false */
					   isIndifferent: function() {
							   return false;
					   },
					   /** m*(@) ::= false */
					   isUniversal: function() {
							   return false;
					   },
					   //////////////////////////////////////////////////
					   /** r(@) ::= false */
					   isReadable: function(name) {
							   return false;
					   },
					   /** w(@) ::= false */
					   isWriteable: function(name) {
							   return false;
					   },
					   //////////////////////////////////////////////////
					   /** first(@) ::= @ */
					   first: function() {
							   return new Array(this);
					   },
					   /** (d_name @) ::= @ */
					   derive: function(name) {
							   return new __AtLiteral();
					   },
					   /** (d_literal @) ::= @ */
					   lderive: function(larg) {
							   return new __AtLiteral();
					   },
					   //////////////////////////////////////////////////
					   /** Reduce Contract
						* @return n-reduced contract
						*/
					   reduce: function() {
							   // TODO
							   return this;
					   },
					   /** ctx |- C <= this */
					   isSuperSetOf: function(arg, ctx) {
							   /** C <= C' |= true  | C=C' */
							   if(arg==this) return true;
							   /** C <= C' |= false  | v(C) and ~v(C') */
							   else if(arg.isNullable() && !this.isNullable()) return false;
							   /** C <= C' |= true  | n(C) */
							   else if (arg.isEmpty()) return true;

							   /** otherwise */
							   else return false;
					   },
					   /** ctx |- C >= this */
					   isSubSetOf: function(arg, ctx) {
							   /** C <= C' |= true  | n(C) */
							   return true;
					   },
					   //////////////////////////////////////////////////
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
					   }
				});
		}

		/**
		 * ? Literal (universe)
		 */
		function __QMarkLiteral() {
				return __cache.c({
						/** n(?) ::= false */
						isEmpty: function() {
								return false;
						},
					   /** v(?) ::= false */
					   isNullable: function() {
							   return false;
					   },
					   /** m(?) ::= false */
					   isIndifferent: function() {
							   return true;
					   },
					   /** m*(?) ::= false */
					   isUniversal: function() {
							   return false;
					   },
					   //////////////////////////////////////////////////
					   /** r(?) ::= true */
					   isReadable: function(name) {
							   return true;
					   },
					   /** w(?) ::= true */
					   isWriteable: function(name) {
							   return true;
					   },
					   //////////////////////////////////////////////////
					   /** first(?) ::= ? */
					   first: function() {
							   return new Array(this);
					   },
					   /** (d_name ?) ::= '' */
					   derive: function(name) {
							   return new __EmptyLiteral();
					   },
					   /** (d_literal ?) ::= '' */
					   lderive: function(larg) {
							   return new __EmptyLiteral();
					   },
					   //////////////////////////////////////////////////
					   /** Reduce Contract
						* @return n-reduced contract
						*/
					   reduce: function() {
							   // TODO
							   return this;
					   },
					   /** ctx |- C <= this */
					   isSuperSetOf: function(arg, ctx) {
							   /** C <= C' |= true  | C=C' */
							   if(arg==this) return true;
							   /** C <= C' |= false  | v(C) and ~v(C') */
							   else if(arg.isNullable()) return false;
							   /** C <= C' |= true  | n(C) */
							   else if (arg.isEmpty()) return true;
							   /** C <= C' |= false  | m(C) and !m(C') */
							   else if(arg.isUniversal()) return false;

							   /** C <= C' |= true  | ctx(C <= C') */
							   ccExp = new __CcExp(arg, this);
							   if(ctx.contains(ccExp)) return true;
							   /** otherwise */
							   var thisContract = this
							   var result = true;
							   arg.first().foreach(function(k, literal) {
									   result = result && thisContract.lderive(literal).isSuperSetOf(arg.lderive(literal), ctx.bind(ccExp));
							   });
							   /** (d_literal C >= C') |= (d_literal C) >= (d_literal C') */
							   return result;
					   },
					   /** ctx |- C >= this */
					   isSubSetOf: function(arg, ctx) {
							   return arg.isSuperSetOf(this, ctx);
					   },
					   //////////////////////////////////////////////////
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
					   }
				});
		}

		/**
		 * x Literal (property name)
		 */
		function __NameLiteral(varname) {
				return __cache.c({
						/** n(varname) ::= false */
						isEmpty: function() {
								return false;
						},
					   /** v(varname) ::= false */
					   isNullable: function() {
							   return false;
					   },
					   /** m(varname) ::= false */
					   isIndifferent: function() {
							   return false;
					   },
					   /** m*(varname) ::= false */
					   isUniversal: function() {
							   return false;
					   },
					   //////////////////////////////////////////////////
					   /** r(varname) ::= varname == name */
					   isReadable: function(name) {
							   return (name == varname);
					   },
					   /** w(varname) ::= varname == name */
					   isWriteable: function(name) {
							   return (name == varname);
					   },
					   //////////////////////////////////////////////////
					   /** first(varname) ::= varname */
					   first: function() {
							   return new Array(this);
					   },
					   /** (d_name varname) ::= '' if varname == name, @ otherwise */
					   derive: function(name) {
							   return (name == varname) ? new __EmptyLiteral() : new __AtLiteral();
					   },
					   /** (d_literal varname) ::= '' if literal == varname, @ oterhwise */
					   lderive: function(larg) {
							   return (larg==this) ? new __EmptyLiteral() : new __AtLiteral();
					   },
					   //////////////////////////////////////////////////
					   /** Reduce Contract
						* @return n-reduced contract
						*/
					   reduce: function() {
							   // TODO
							   return this;
					   },
					   /** ctx |- C <= this */
					   isSuperSetOf: function(arg, ctx) {
							   /** C <= C' |= true  | C=C' */
							   if(arg==this) return true;
							   /** C <= C' |= true  | n(C) */
							   else if (arg.isEmpty()) return true;

							   /** otherwise */
							   else return false;
					   },
					   /** ctx |- C >= this */
					   isSubSetOf: function(arg, ctx) {
							   return arg.isSuperSetOf(this, ctx);
					   },
					   //////////////////////////////////////////////////
					   /** Dump
						* @return string
						*/
					   dump: function() {
							   return " [" + varname + "] ";					   },
					   /** To String
						* @return string
						*/
					   toString: function() {
							   return "\"" + varname + "\"";
					   }
				});
		}

		/**
		 * RegEx Literal (regular expression)
		 */
		function __RegExLiteral(regex) {
				return __cache.c({
						/** n(RegEx) ::= false */
						isEmpty: function() {
								return false;
						},
					   /** v(RegEx) ::= false */
					   isNullable: function() {
							   return false;
					   },
					   /** m(RegEx) ::= false */
					   isIndifferent: function() {
							   return false;
					   },
					   /** m*(RegEx) ::= false */
					   isUniversal: function() {
							   return false;
					   },
					   //////////////////////////////////////////////////
					   /** r(RegEx) ::= RegEx ~ name */
					   isReadable: function(name) {
							   return (new RegExp(regex)).test(name);
					   },
					   /** w(RegEx) ::= RegEx ~ name */
					   isWriteable: function(name) {
							   return (new RegExp(regex)).test(name);
					   },
					   //////////////////////////////////////////////////
					   /** first(RegEx) ::= RegEx */
					   first: function() {
							   return new Array(this);
					   },
					   /** (d_name RegEx) ::= '' if RegEx ~ name, @ otherwise */
					   derive: function(name) {
							   return (new RegExp(regex)).test(name) ? new __EmptyLiteral() : new __AtLiteral();
					   },
					   /** (d_literal RegEx) ::= '' if literal == RegEx, @ oterhwise */
					   lderive: function(larg) {
							   return (larg==this) ? new __EmptyLiteral() : new __AtLiteral();
					   },
					   //////////////////////////////////////////////////
					   /** Reduce Contract
						* @return n-reduced contract
						*/
					   reduce: function() {
							   // TODO
							   return this;
					   },
					   /** ctx |- C <= this */
					   isSuperSetOf: function(arg, ctx) {
							   /** C <= C' |= true  | C=C' */
							   if(arg==this) return true;
							   /** C <= C' |= true  | n(C) */
							   else if (arg.isEmpty()) return true;

							   /** otherwise */
							   else return false;

					   },
					   /** ctx |- C >= this */
					   isSubSetOf: function(arg, ctx) {
							   return arg.isSuperSetOf(this, ctx);
					   },
					   //////////////////////////////////////////////////
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
					   }
				});
		}



		//////////////////////////////////////////////////
		// QUANTIFIABLE
		//////////////////////////////////////////////////

		/**
		 * C? Contract (optional)
		 */
		function __QMarkContract(contract) {
				return __cache.c({
						/** n(C?) ::= false */
						isEmpty: function() {
								return false;
						},
					   /** v(C?) :== true */
					   isNullable: function() {
							   return true;
					   },
					   /** m(C?) ::= m(C) */
					   isIndifferent: function() {
							   return contract.isIndifferent();
					   },
					   /** m*(C?) ::= m*(C) */
					   isUniversal: function() {
							   return contract.isUniversal();
					   },
					   //////////////////////////////////////////////////
					   /** r(C?) ::= r(C) */
					   isReadable: function(name) {
							   return contract.isReadable(name);
					   },
					   /** w(C?) ::= w(C) */
					   isWriteable: function(name) {
							   return contract.isWriteable(name);
					   },
					   //////////////////////////////////////////////////
					   /** first(C?) ::= first(C) */
					   first: function() {
							   return contract.first();
					   },
					   /** (d_name C?) ::= (d_name C) */
					   derive: function(name) {
							   return  contract.derive(name);
					   },
					   /** (d_literal C?) ::= (d_literal C) */
					   lderive: function(larg) {
							   return  contract.lderive(larg);
					   },
					   //////////////////////////////////////////////////
					   /** Reduce Contract
						* @return n-reduced contract
						*/
					   reduce: function() {
							   // TODO
							   return new __QMarkContract(contract.reduce());
					   },
					   /** ctx |- C <= this */
					   isSuperSetOf: function(arg, ctx) {
							   /** C <= C' |= true  | C=C' */
							   if(arg==this) return true;
							   /** '' <= C' |= true  | v(C') */
							   else if((arg==new __EmptyLiteral()) /*&& this.isNullable()*/) return true;
							   /** C <= C' |= true  | n(C) */
							   else if (arg.isEmpty()) return true;

							   /** C <= C' |= true  | m(C') */
							   else if(this.isUniversal()) return true;
							   /** C <= C' |= false  | m(C) and !m(C') */
							   else if(!this.isUniversal() && arg.isUniversal()) return false;

							   /** C <= C' |= true  | ctx(C <= C') */
							   ccExp = new __CcExp(arg, this);
							   if(ctx.contains(ccExp)) return true;
							   /** otherwise */
							   var thisContract = this
							   var result = true;
							   arg.first().foreach(function(k, literal) {
									   result = result && thisContract.lderive(literal).isSuperSetOf(arg.lderive(literal), ctx.bind(ccExp));
							   });
							   /** (d_literal C >= C') |= (d_literal C) >= (d_literal C') */
							   return result;
					   },
					   /** ctx |- C >= this */
					   isSubSetOf: function(arg, ctx) {
							   return arg.isSuperSetOf(this, ctx);
					   },
					   //////////////////////////////////////////////////
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
					   }
				});
		}

		/**
		 * C* Contract (kleene star)
		 */
		function __StarContract(contract) {
				return __cache.c({
						/** n(C*) ::= false */
						isEmpty: function() {
								return false;
						},
					   /** v(C*) :== true */
					   isNullable: function() {
							   return true;
					   },
					   /** m(C*) ::= m(C) */
					   isIndifferent: function() {
							   return  contract.isIndifferent();
					   },
					   /** m*(C*) ::= m*(C) + m() */
					   isUniversal: function() {
							   return (contract.isIndifferent() ||  contract.isUniversal());
					   },
					   //////////////////////////////////////////////////
					   /** r(C*) ::= r(C) */
					   isReadable: function(name) {
							   return contract.isReadable(name);
					   },
					   /** w(C*) ::= w(C) */
					   isWriteable: function(name) {
							   return contract.isWriteable(name);
					   },
					   //////////////////////////////////////////////////
					   /** first(C*) ::= first(C) */
					   first: function() {
							   return contract.first();
					   },
					   /** (d_name C*) ::= (d_name C).C* */
					   derive: function(name) {
							   return new __ConcatContract(contract.derive(name), this);
					   },
					   /** (d_literal C*) ::= (d_literal C).C* */
					   lderive: function(larg) {
							   return new __ConcatContract(contract.lderive(larg), this);
					   },
					   //////////////////////////////////////////////////
					   /** Reduce Contract
						* @return n-reduced contract
						*/
					   reduce: function() {
							   // TODO
							   return new __StarContract(contract.reduce());
					   },
					   /** ctx |- C <= this */
					   isSuperSetOf: function(arg, ctx) {
							   /** C <= C' |= true  | C=C' */
							   if(arg==this) return true;
							   /** '' <= C' |= true  | v(C') */
							   else if((arg==new __EmptyLiteral()) /*&& this.isNullable()*/) return true;
							   /** C <= C' |= true  | n(C) */
							   else if (arg.isEmpty()) return true;

							   /** C <= C' |= true  | m(C') */
							   else if(this.isUniversal()) return true;
							   /** C <= C' |= false  | m(C) and !m(C') */
							   else if(!this.isUniversal() && arg.isUniversal()) return false;

							   /** C <= C' |= true  | ctx(C <= C') */
							   ccExp = new __CcExp(arg, this);
							   if(ctx.contains(ccExp)) return true;
							   /** otherwise */
							   var thisContract = this
							   var result = true;
							   arg.first().foreach(function(k, literal) {
									   result = result && thisContract.lderive(literal).isSuperSetOf(arg.lderive(literal), ctx.bind(ccExp));
							   });
							   /** (d_literal C >= C') |= (d_literal C) >= (d_literal C') */
							   return result;
					   },
					   /** ctx |- C >= this */
					   isSubSetOf: function(arg, ctx) {
							   return arg.isSuperSetOf(this, ctx);
					   },
					   //////////////////////////////////////////////////
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
					   }
				});
		}



		//////////////////////////////////////////////////
		// SETS
		//////////////////////////////////////////////////

		/**
		 * C0+C1 Contract (logical or)
		 */
		function __OrContract(contract0, contract1) {
				if(contract0.isSuperSetOf(contract1, new __CcContext())) return contract0;
				else if(contract1.isSuperSetOf(contract0, new __CcContext())) return contract1;

				return __cache.c({
						/** n(C0+C1) ::= n(C0) & n(C1) */
						isEmpty: function() {
								return contract0.isEmpty() && contract1.isEmpty();
						},
					   /** v(C0+C1) :== v(C0) + v(C1) */
					   isNullable: function() {
							   return (contract0.isNullable() || contract1.isNullable());
					   },
					   /** m(C0+C1) ::= m(C0) + m(C1) */
					   isIndifferent: function() {
							   return  (contract0.isIndifferent() ||  contract1.isIndifferent());
					   },
					   /** m*(C0+C1) ::= m*(C0) + m*(C1) */
					   isUniversal: function() {
							   return (contract0.isUniversal() || contract1.isUniversal());
					   },
					   //////////////////////////////////////////////////
					   /** r(C0+C1) :== r(C0) + r(C1) */
					   isReadable: function(name) {
							   return (contract0.isReadable(name) || contract1.isReadable(name));
					   },
					   /** w(C0+C1) :== w(C0) + w(C1) */
					   isWriteable: function(name) {
							   return (contract0.isWriteable(name) || contract1.isWriteable(name));
					   },
					   //////////////////////////////////////////////////
					   /** first(C0+C1) ::= first(C0) + first(C1) */
					   first: function() {
							   return contract0.first().concat(contract1.first());
					   },
					   /** (d_name C0+C1) :== (d_name C0) + (d_name C1) */
					   derive: function(name) {
							   return new __OrContract(contract0.derive(name), contract1.derive(name));
					   },
					   /** (d_literal C0+C1) ::= (d_literal C0) + (d_literal C1) */
					   lderive: function(larg) {
							   return new __OrContract(contract0.lderive(larg), contract1.lderive(larg));
					   },
					   //////////////////////////////////////////////////
					   /** Reduce Contract
						* @return n-reduced contract
						*/
					   reduce: function() {
							   // TODO
							   if(this.isEmpty())
									   return new __AtLiteral();
							   else if(contract0.isEmpty())
									   return contract1.reduce();
							   else if(contract1.isEmpty())
									   return contract0.reduce();
							   else 
									   return new  __OrContract(contract0.reduce(), contract1.reduce());
					   },
					   /** ctx |- C <= this */
					   isSuperSetOf: function(arg, ctx) {
							   /** C <= C' |= true  | C=C' */
							   if(arg==this) return true;
							   /** '' <= C' |= true  | v(C') */
							   else if((arg==new __EmptyLiteral()) && this.isNullable()) return true;
							   /** C <= C' |= false  | v(C) and ~v(C') */
							   else if(arg.isNullable() && !this.isNullable()) return false;
							   /** C <= C' |= true  | n(C) */
							   else if (arg.isEmpty()) return true;
							   /** C <= C' |= true  | n(C) and !n(C') */
							   else if(!arg.isEmpty() && this.isEmpty()) return false;

							   /** C <= C' |= true  | m(C') */
							   else if(this.isUniversal()) return true;
							   /** C <= C' |= false  | m(C) and !m(C') */
							   else if(!this.isUniversal() && arg.isUniversal()) return false;

							   /** C <= C' |= true  | ctx(C <= C') */
							   ccExp = new __CcExp(arg, this);
							   if(ctx.contains(ccExp)) return true;
							   /** otherwise */
							   var thisContract = this
							   var result = true;
							   arg.first().foreach(function(k, literal) {
									   result = result && thisContract.lderive(literal).isSuperSetOf(arg.lderive(literal), ctx.bind(ccExp));
							   });
							   /** (d_literal C >= C') |= (d_literal C) >= (d_literal C') */
							   return result;
					   },
					   /** ctx |- C >= this */
					   isSubSetOf: function(arg, ctx) {
							   return arg.isSuperSetOf(this, ctx);
					   },
					   //////////////////////////////////////////////////
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
					   }
				});
		}

		/**
		 * C0&C1 Contract (logical and)
		 */
		function __AndContract(contract0, contract1) {
				if(contract0.isSubSetOf(contract1, new __CcContext())) return contract0;
				else if(contract1.isSubSetOf(contract0, new __CcContext())) return contract1;

				return __cache.c({
						/** n(C0+C1) ::= n(C0) + n(C1) */
						isEmpty: function() {
								return contract0.isEmpty() || contract1.isEmpty();
						},
					   /** v(C0&C1) :== v(C0) & v(C1) */
					   isNullable: function() {
							   return (contract0.isNullable() && contract1.isNullable());
					   },
					   /** m(C0&C1) ::= m(C0) & m(C1) */
					   isIndifferent: function() {
							   return (contract0.isIndifferent() && contract1.isIndifferent());
					   },
					   /** m*(C0&C1) ::= m*(C0) & m*(C1) */
					   isUniversal: function() {
							   return (contract0.isUniversal() && contract1.isUniversal());
					   },
					   //////////////////////////////////////////////////
					   /** r(C0&C1) :== r(C0) & r(C1) */
					   isReadable: function(name) {
							   return (contract0.isReadable(name) && contract1.isReadable(name));
					   },
					   /** w(C0&C1) :== w(C0) & w(C1) */
					   isWriteable: function(name) {
							   return (contract0.isWriteable(name) && contract1.isWriteable(name));
					   },
					   //////////////////////////////////////////////////
					   /** first(C0&C1) ::= first(C0) & first(C1) */
					   first: function() { 
							   var result = new Array();
							   arr0 = contract0.first();
							   arr1 = contract1.first();
							   arr0.foreach(function(k0, v0) {
									   arr1.foreach(function(k1, v1) {
											   if(v0==v1)
											   result.push(v0);
									   });
							   });
					   },
					   /** (d_name C0&C1) :== (d_name C0) & (d_name C1) */
					   derive: function(name) {
							   return new __AndContract(contract0.derive(name), contract1.derive(name));
					   },
					   /** (d_literal C0&C1) ::= (d_literal C0) & (d_literal C1) */
					   lderive: function(larg) {
							   return new __AndContract(contract0.lderive(larg), contract1.lderive(larg));
					   },
					   //////////////////////////////////////////////////
					   /** Reduce Contract
						* @return n-reduced contract
						*/
					   reduce: function() {
							   // TODO
							   if(this.isEmpty())
									   return new __AtLiteral();
							   else 
									   return new  __AndContract(contract0.reduce(), contract1.reduce());
					   },
					   /** ctx |- C <= this */
					   isSuperSetOf: function(arg, ctx) {
							   /** C <= C' |= true  | C=C' */
							   if(arg==this) return true;
							   /** '' <= C' |= true  | v(C') */
							   else if((arg==new __EmptyLiteral()) && this.isNullable()) return true;
							   /** C <= C' |= false  | v(C) and ~v(C') */
							   else if(arg.isNullable() && !this.isNullable()) return false;
							   /** C <= C' |= true  | n(C) */
							   else if (arg.isEmpty()) return true;
							   /** C <= C' |= true  | n(C) and !n(C') */
							   else if(!arg.isEmpty() && this.isEmpty()) return false;

							   /** C <= C' |= true  | m(C') */
							   else if(this.isUniversal()) return true;
							   /** C <= C' |= false  | m(C) and !m(C') */
							   else if(!this.isUniversal() && arg.isUniversal()) return false;

							   /** C <= C' |= true  | ctx(C <= C') */
							   ccExp = new __CcExp(arg, this);
							   if(ctx.contains(ccExp)) return true;
							   /** otherwise */
							   var thisContract = this
							   var result = true;
							   arg.first().foreach(function(k, literal) {
									   result = result && thisContract.lderive(literal).isSuperSetOf(arg.lderive(literal), ctx.bind(ccExp));
							   });
							   /** (d_literal C >= C') |= (d_literal C) >= (d_literal C') */
							   return result;
					   },
					   /** ctx |- C >= this */
					   isSubSetOf: function(arg, ctx) {
							   return arg.isSuperSetOf(this, ctx);
					   },
					   //////////////////////////////////////////////////
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
					   }
				});
		}

		/**
		 * !C Contract (negation)
		 */
		function __NegContract(contract) {
				return __cache.c({
						/** n(!C) ::= m(C) + m*(C) */
						isEmpty: function() {
								// negation only effects to literals
								return (contract.isUniversal() || contract.isIndifferent());
						},
					   /** v(!C) ::= false if v(C), false otherwise */
					   isNullable: function() {
							   return contract.isNullable() ? false : true;
					   },
					   /** m(!C) ::= v(C) + n(C) */
					   isIndifferent: function() {
							   return (contract.isNullable() || contract.isEmpty());
					   },
					   /** m*(!C) ::= false */
					   isUniversal: function() {
							   return (contract.isEmpty())
					   },
					   //////////////////////////////////////////////////
					   /** r(!C) ::= false if r(C), false otherwise */
					   isReadable: function(name) {
							   return contract.isReadable(name) ? false : true;
					   },
					   /** w(!C) ::= false if w(C), false otherwise */
					   isWriteable: function(name) {
							   return contract.isWriteable(name) ? false : true;
					   },
					   //////////////////////////////////////////////////
					   /** first(!C) ::= first(C) */
					   first: function() {
							   return contract.first();
					   },
					   /** (d_name !C) :== !(d_name C) */
					   derive: function(name) {
							   return new __NegContract(contract.derive(name));
					   },
					   /** (d_literal !C) ::= !(d_literal C) */
					   lderive: function(larg) {
							   return new __NegContract(contract.lderive(larg));
					   },
					   //////////////////////////////////////////////////
					   /** Reduce Contract
						* @return n-reduced contract
						*/
					   reduce: function() {
							   // TODO
							   if(this.isEmpty())
									   return new __AtLiteral();
							   else 
									   return new  __NegContract(contract.reduce());
					   },
					   /** ctx |- C <= this */
					   isSuperSetOf: function(arg, ctx) {
							   /** C <= C' |= true  | C=C' */
							   if(arg==this) return true;
							   /** '' <= C' |= true  | v(C') */
							   else if((arg==new __EmptyLiteral()) && this.isNullable()) return true;
							   /** C <= C' |= false  | v(C) and ~v(C') */
							   else if(arg.isNullable() && !this.isNullable()) return false;
							   /** C <= C' |= true  | n(C) */
							   else if(arg.isEmpty()) return true;
							   /** C <= C' |= true  | n(C) and !n(C') */
							   else if(!arg.isEmpty() && this.isEmpty()) return false;

							   /** C <= C' |= true  | m(C') */
							   else if(this.isUniversal()) return true;
							   /** C <= C' |= false  | m(C) and !m(C') */
							   else if(!this.isUniversal() && arg.isUniversal()) return false;

							   /** C <= !(C') |= false  | (C <= C') + (C >= C') */
							   else if(contract.isSuperSetOf(arg, new __CcContext()) || arg.isSuperSetOf(contract, new __CcContext())) return false;

							   /** C <= C' |= true  | ctx(C <= C') */
							   ccExp = new __CcExp(arg, this);
							   if(ctx.contains(ccExp)) return true;
							   /** otherwise */
							   var thisContract = this
							   var result = true;
							   arg.first().foreach(function(k, literal) {
									   result = result && thisContract.lderive(literal).isSuperSetOf(arg.lderive(literal), ctx.bind(ccExp));
							   });
							   /** (d_literal C >= C') |= (d_literal C) >= (d_literal C') */
							   return result;
					   },
					   /** ctx |- C >= this */
					   isSubSetOf: function(arg, ctx) {
							   return arg.isSuperSetOf(this, ctx);
					   },
					   //////////////////////////////////////////////////
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
					   }
				});
		}



		//////////////////////////////////////////////////
		// CONTRACT
		//////////////////////////////////////////////////


		/**
		 * C.C Contract (concatenation)
		 */
		function __ConcatContract(contract0, contract1) {
				if(contract0.isEmpty()) return new __AtLiteral();
				else if(contract0 == new __EmptyLiteral()) return contract1;

				return __cache.c({
						/** n(C0.C1) ::= n(C0) */
						isEmpty: function() {
								return contract0.isEmpty();
						},
					   /** v(C0.C1) :== v(C0) & v(C1) */
					   isNullable: function() {
							   return (contract0.isNullable() && contract1.isNullable());
					   },
					   /** m(C0.C1) ::= false */
					   isIndifferent: function() {
							   if(contract0.isNullable()) return contract1.isIndifferent();
							   else return contract0.isIndifferent();
					   },
					   /** m*(C0.C1) ::= false */
					   isUniversal: function() {
							   return (contract0.isUniversal() && contract1.isNullable())
						|| (contract1.isUniversal() && contract0.isNullable())
						|| (contract0.isUniversal() && contract1.isUniversal());
					   },
					   //////////////////////////////////////////////////
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
					   //////////////////////////////////////////////////
					   /** first(C0.C1) ::= first(C1) if v(C0), first(C0) otherwise */
					   first: function() {
							   if(contract0.isNullable()) return contract1.first();
							   else contract0.first();
					   },
					   /** (d_name C0.C1) :== (d_name C0).C1 + (d_name C1) if v(C0), (d_name C0).c1 otherwise */
					   derive: function(name) {
							   if(contract0.isNullable()) return new __OrContract(__ConcatContract(contract0.derive(name), contract1), contract1.derive(name));
							   else return new __ConcatContract(contract0.derive(name), contract1);
					   },
					   /** (d_literal C0.C1) ::= (d_literal C0).C1 + (d_literal C1) if v(C0), (d_literal C0).c1 otherwise */
					   lderive: function(larg) {
							   if(contract0.isNullable()) return new __OrContract(__ConcatContract(contract0.lderive(larg), contract1), contract1.lderive(larg));
							   else return new __ConcatContract(contract0.lderive(larg), contract1);
					   },
					   //////////////////////////////////////////////////
					   /** Reduce Contract
						* @return n-reduced contract
						*/
					   reduce: function() {
							   // TODO
							   if(this.isEmpty())
									   return new __AtLiteral();
							   else 
									   return new  __ConcatContract(contract0.reduce(), contract1.reduce());
					   },
					   /** ctx |- C <= this */
					   isSuperSetOf: function(arg, ctx) {
							   /** C <= C' |= true  | C=C' */
							   if(arg==this) return true;
							   /** '' <= C' |= true  | v(C') */
							   else if((arg==new __EmptyLiteral()) && this.isNullable()) return true;
							   /** C <= C' |= false  | v(C) and ~v(C') */
							   else if(arg.isNullable() && !this.isNullable()) return false;
							   /** C <= C' |= true  | n(C) */
							   else if(arg.isEmpty()) return true;
							   /** C <= C' |= true  | n(C) and !n(C') */
							   else if(!arg.isEmpty() && this.isEmpty()) return false;

							   /** C <= C' |= true  | m(C') */
							   else if(this.isUniversal()) return true;
							   /** C <= C' |= false  | m(C) and !m(C') */
							   else if(!this.isUniversal() && arg.isUniversal()) return false;

							   /** C <= C' |= true  | ctx(C <= C') */
							   ccExp = new __CcExp(arg, this);
							   if(ctx.contains(ccExp)) return true;
							   /** otherwise */
							   var thisContract = this
							   var result = true;
							   arg.first().foreach(function(k, literal) {
									   result = result && thisContract.lderive(literal).isSuperSetOf(arg.lderive(literal), ctx.bind(ccExp));
							   });
							   /** (d_literal C >= C') |= (d_literal C) >= (d_literal C') */
							   return result;
					   },
					   /** ctx |- C >= this */
					   isSubSetOf: function(arg, ctx) {
							   return arg.isSuperSetOf(this, ctx);
					   },
					   //////////////////////////////////////////////////
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
					   }
				});
		}



		//////////////////////////////////////////////////
		// APC . Contract
		//////////////////////////////////////////////////
		APC.Contract = {};

		APC.Contract.EmptyLiteral	= __EmptyLiteral;
		APC.Contract.AtLiteral		= __AtLiteral;
		APC.Contract.QMarkLiteral	= __QMarkLiteral;
		APC.Contract.NameLiteral	= __NameLiteral;
		APC.Contract.RegExLiteral	= __RegExLiteral;

		APC.Contract.QMarkContract	= __QMarkContract;
		APC.Contract.StarContract	= __StarContract;
		APC.Contract.OrContract		= __OrContract;
		APC.Contract.AndContract	= __AndContract;
		APC.Contract.NegContract	= __NegContract;
		APC.Contract.ConcatContract	= __ConcatContract;





		//////////////////////////////////////////////////
		//  CONTAINMENT CALCULUS
		//  context and expressions
		//////////////////////////////////////////////////

		/** Containment Calculus
		 * Expression: C0 <= C1
		 */
		function __CcExp(contract0, contract1) {
				return {
						/** To String
						 * @return string
						 */
						toString: function() {
								return contract0.toString() + "<=" + contract1.toString();
						}
				}
		}

		/** Containment Calculus
		 * Context: {} | <Context, Expression>
		 */
		function __CcContext() {	
				// cache array
				var context = new Array();

				return {

						/* bind function
						 * @param CC Expression
						 * @return <CC Context, CC Expression>
						 */
						bind: function(ccExp) {
								// clone context
								var newCtx = new __CcContext();
								context.foreach(function(k, v) {
										newCtx.put(v)
								});
								// bind new CC Expression
								if(!newCtx.contains(ccExp)) {
										newCtx.put(ccExp);
								}
								return newCtx;
						},

								/* put
								 * @param ccExp CC Expression
								 * $return CC Expression
								 */
								put: function(ccExp) {
										var key = ccExp.toString();
										context["\"" + key + "\""] = ccExp;
										return ccExp;
								},

								/* get
								 * @param ccExp CC Expression
								 * $return CC Expression
								 */
								get: function(ccExp) {
										var key = ccExp.toString();
										return context["\"" + key + "\""];
								},

								/* contains
								 * @param ccExp CC Expression
								 * $return true, if ccExp in cache, false otherwise
								 */
								contains: function(ccExp) {
										var key = ccExp.toString();
										return (context["\"" + key + "\""]!==undefined) ? true : false;
								}
				}
		};



		//////////////////////////////////////////////////
		// APC . Contract
		//////////////////////////////////////////////////
		APC.Contract.Containment = {};
		APC.Contract.Containment.Expression = __CcExp;
		APC.Contract.Containment.Context = __CcContext;





		//////////////////////////////////////////////////
		//  CONTRACT CACHE
		//  cache for access permission contracts
		//////////////////////////////////////////////////

		/** Path Cache 
		*/
		function __ContractCache() {
				// cache array
				var cache = new Array();

				return {

						/* cache function
						 * @param contract access permission contract
						 * @return access permission contract
						 */
						c: function(contract) {
								if(this.contains(contract.toString())) {
										return this.get(contract.toString());
								} else {
										return this.put(contract.toString(), contract);
								}
						},

								/* put
								 * @param key cache key
								 * @param value cahe value
								 * $return value
								 */
								put: function(key, value) {
										cache["\"" + key + "\""] = value;
										return value;
								},

								/* get
								 * @param key cache key
								 * $return value
								 */
								get: function(key) {
										return cache["\"" + key + "\""];
								},

								/* contains
								 * @param key cache key
								 * $return true, if key in cache, false otherwise
								 */
								contains: function(key) {
										return (cache["\"" + key + "\""]!==undefined) ? true : false;
								},

								/* clear cache
								*/
								clear: function() {
										cache = new Array();
								}
				}
		}

		// current path cache
		var __cache = new __ContractCache();



		//////////////////////////////////////////////////
		// APC . Contract
		//////////////////////////////////////////////////
		APC.Contract.Cache = __cache;



})(__APC);

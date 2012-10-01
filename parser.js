//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.20.0
//////////////////////////////////////////////////


function __ContractParser() {

		// . token
		var Token_DOT= ".";

		// @ token
		var RegEx_AT=		/^@$/;
		// ? token
		var RegEx_QMmark=	/^\?$/;
		// a token
		var RegEx_Var=		/^\w*$/;
		// a? token
		var RegEx_VarQMark=	/^\w*\?$/;
		// a* token
		var RegEx_VarStar=	/^\w*\*$/;
		// (a|b) token
		var RegEx_Set=		/^\(\w*(\|\w*)*\)$/;
		// (a|b)? token
		var RegEx_SetQMark=	/^\(\w*(\|\w*)*\)\?$/;
		// (a|b)* token
		var RegEx_SetStar= 	/^\(\w*(\|\w*)*\)\*$/;


		return {


				parse: function(string) {

						tokens = string.split(Token_DOT);
						contract = new __Contract(null, null);



						tokens.foreach(function(k, v) {

								if(RegEx_AT.test(v)) {
										var literal = new __ContractLiteral(__CType.AT,v);
								} else if(RegEx_QMmark.test(v)) {
										var literal = new __ContractLiteral(__CType.QM,v);
								} else if(RegEx_Var.test(v)) {
										var literal = new __ContractLiteral(__CType.RegEx,v);
								} else if(RegEx_VarQMark.test(v)) {
										var literal = new __ContractLiteral(__CType.RegExQMark,v);
								} else if(RegEx_VarStar.test(v)) {
										var literal = new __ContractLiteral(__CType.RegExStar,v);
								} else if(RegEx_Set.test(v)) {
										var literal = new __ContractLiteral(__CType.RegEx,v);
								} else if(RegEx_SetQMark.test(v)) {
										var literal = new __ContractLiteral(__CType.RegExQMark,v);
								} else if(RegEx_SetStar.test(v)) {
										var literal = new __ContractLiteral(__CType.RegExStar,v);
								}

								contract = new __Contract(literal, contract);

						});

						return contract;

				}
		};

}

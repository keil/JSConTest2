//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.22
//////////////////////////////////////////////////

/* Grammar:
 * INPUT = ""
 *       | LITERAL "." LITERAL
 *
 * LITERAL = "@"
 *         | "?"
 *         | REGEX
 *         | REGEX?
 *         | REGEX*
 *
 * REGEX = x | (x|..)
 */

/** Contract Parser
 * @return Access Permission Contract
 */
function __ContractParser() {

		// . token
		const Token_DOT= ".";

		// @ token
		const RegEx_AT=		/^@$/;
		// ? token
		const RegEx_QMmark=	/^\?$/;
		// a token
		const RegEx_Var=		/^\w*$/;
		// a? token
		const RegEx_VarQMark=	/^\w*\?$/;
		// a* token
		const RegEx_VarStar=	/^\w*\*$/;
		// (a|b) token
		const RegEx_Set=		/^\(\w*(\|\w*)*\)$/;
		// (a|b)? token
		const RegEx_SetQMark=	/^\(\w*(\|\w*)*\)\?$/;
		// (a|b)* token
		const RegEx_SetStar= 	/^\(\w*(\|\w*)*\)\*$/;

		return {

				/** Parse
				 * @param string Input value
				 * @retutn Access Permission Contract
				 */
				parse: function(string) {
						// split and reversed input
						tokens = string.split(Token_DOT).reverse();
						// empty contract
						contract = null;

						tokens.foreach(function(k, v) {
								if(RegEx_AT.test(v)) {
										var literal = new __ContractLiteral(__CType.AT,v);
								} else if(RegEx_QMmark.test(v)) {
										var literal = new __ContractLiteral(__CType.QMark,v);
								} else if(RegEx_Var.test(v)) {
										var literal = new __ContractLiteral(__CType.RegEx,v);
								} else if(RegEx_VarQMark.test(v)) {
										var literal = new __ContractLiteral(__CType.RegExQMark, v.substr(0, v.length-1));
								} else if(RegEx_VarStar.test(v)) {
										var literal = new __ContractLiteral(__CType.RegExStar,v.substr(0, v.length-1));
								} else if(RegEx_Set.test(v)) {
										var literal = new __ContractLiteral(__CType.RegEx,v);
								} else if(RegEx_SetQMark.test(v)) {
										var literal = new __ContractLiteral(__CType.RegExQMark,v.substr(0, v.length-1));
								} else if(RegEx_SetStar.test(v)) {
										var literal = new __ContractLiteral(__CType.RegExStar,v.substr(0, v.length-1));
								}
								contract = new __Contract(literal, contract);
						});

						return contract;
				}
		};
}

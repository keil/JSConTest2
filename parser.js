//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.20.0
//////////////////////////////////////////////////


function __ContractParser() {




		return {

				Token_DOT: ".",

				RegEx_AT:	/^@$/,
				RegEx_QM:	/^?$/,
				RegEx_VAR:	/^\w*$/,
				RegEx_SET:	/^\(\w*(\|\w*)*\)\$/,
				RegEx_QSET:	/^\(\w*(\|\w*)*\)\?$/,
				RegEx_SSET:	/^\(\w*(\|\w*)*\)\*$/,





				function parse(string) {

						tokens = string.split(this.DOT);

						contract = new __Contract(null);


						tokens.foreach(new function(k, v){

// alles uuber regexp
//




								switch(v) {

										case AT:
												break;
										case QM:
												break;
										default:
												if(VAR_REGEX.test(v)) {
												} else if(SET_REGEX.test(v))  {
												} else if(QM_REGEX.test(v))  {
												} else if(STAR_REGEX.test(v)) {}







								}




						});

				}




		};
}

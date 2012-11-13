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

		////////////////////////////////////////////////////
		// OBJECT CONTRACTS
		////////////////////////////////////////////////////

		/** Permit
		 * @param string Access Permission Contract to apply
		 * @param obj Object
		 * @param name Object name [optional]
		 * @return Object proxy
		 */
		function __permit(string, obj, name) {
				// optional name
				objname = name!=null ? new APC.TracePath.TraceProperty(name) : new APC.TracePath.TraceEmpty();

				// parse contracts
				contract = APC.Parser.parse(string);

				// create proxy
				return __createMembrane(obj, contract, objname);
		}

		/** Apply
		 * @param string Access Permission Contract
		 * @param base Current object
		 * @param name Property name
		 */
		function __apply(string, base, name) {
				obj = base[name];
				base[name] = __permit(string, obj, name);
		}





		////////////////////////////////////////////////////
		// FUNCTION CONTRACTS
		////////////////////////////////////////////////////

		/** Permit Arguments 
		 * @param string Access Permission Contract
		 * @param function Function
		 * @return Function proxy
		 */
		function __permitArgs(string, func) {
				// parse contracts
				contract = APC.Parser.parse(string);

				// create function proxy
				return __createFunctionMembrane(func, contract);
		}

		/** Apply Arguments 
		 * @param string Access Permission Contract
		 * @param base Current object
		 * @param name Function name
		 */
		function __applyArgs(string, base, name) {
				func = base[name];
				base[name] = __permitArgs(string, func);
		}



		//////////////////////////////////////////////////
		// APC . Contract
		//////////////////////////////////////////////////
		APC.permit		= __permit;
		APC.apply		= __apply;
		APC.permitArgs	= __permitArgs;
		APC.applyArgs	= __applyArgs;

})(APC);

//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// - Configuration File -
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 2.01
//////////////////////////////////////////////////
(function(APC) {

		//////////////////////////////////////////////////
		// EVALUATION MODE
		// PROTECTOR: return undefined, if property access in not allowed
		// OBSERVER: recorded access violations
		//////////////////////////////////////////////////

		// Violation Mode
		var __EvaluationMode = { PROTECTOR: "protector", OBSERVER: "observer" }

		//////////////////////////////////////////////////
		// APC . Config
		//////////////////////////////////////////////////
		APC.Evaluation = {};
		APC.Evaluation.Mode = __EvaluationMode;



		//////////////////////////////////////////////////
		// APC . Config
		//////////////////////////////////////////////////
		APC.Config = {};
		APC.Config.EvaluationMode = __EvaluationMode.OBSERVER;

})(__APC);

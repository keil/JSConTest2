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
		// FLATTENING MODE
		// PROTECTOR: return undefined, if property access in not allowed
		// OBSERVER: recorded access violations
		//////////////////////////////////////////////////

		// Violation Mode
		var __FlatteningMode = { ON: true, OFF: false }

		//////////////////////////////////////////////////
		// APC . Config
		//////////////////////////////////////////////////
		APC.Flattening = {};
		APC.Flattening.Mode = __FlatteningMode;





		//////////////////////////////////////////////////
		// APC . Config
		//////////////////////////////////////////////////
		APC.Config = {};
		APC.Config.EvaluationMode = __EvaluationMode.OBSERVER;
		APC.Config.FlatteningMode = __FlatteningMode.ON;

})(__APC);

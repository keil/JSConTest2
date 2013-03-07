/*
 * JavaScript Reflection API
 *  for Access Permission Contracts
 *
 * Copyright (c) 2013, Proglang, University of Freiburg.
 *  http://proglang.informatik.uni-freiburg.de/
 * All rights reserved.
 *
 * Author Matthias Keil
 *  http://www.informatik.uni-freiburg.de/~keilr/
 *
 * $Date$
 * $Rev$
 */
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

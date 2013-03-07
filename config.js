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
		// FLATTENING MODE
		// ON: flattening enabled
		// OFF: flattening disabled
		//////////////////////////////////////////////////

		// Violation Mode
		var __FlatteningMode = { ON: true, OFF: false }

		//////////////////////////////////////////////////
		// APC . Config
		//////////////////////////////////////////////////
		APC.Flattening = {};
		APC.Flattening.Mode = __FlatteningMode;



		//////////////////////////////////////////////////
		// SUBSET REDUCTION MODE
		// ON: subset reduction enabled
		// OFF: subset reduction disabled
		//////////////////////////////////////////////////

		// Violation Mode
		var __SubsetReductionMode = { ON: true, OFF: false }

		//////////////////////////////////////////////////
		// APC . Config
		//////////////////////////////////////////////////
		APC.SubsetReduction = {};
		APC.SubsetReduction.Mode = __SubsetReductionMode;





		//////////////////////////////////////////////////
		// APC . Config
		//////////////////////////////////////////////////
		APC.Config = {};
		APC.Config.EvaluationMode = __EvaluationMode.OBSERVER;
		APC.Config.FlatteningMode = __FlatteningMode.ON;
		APC.Config.SubsetReductionMode = __SubsetReductionMode.ON;

})(__APC);

//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 2.01
//////////////////////////////////////////////////
__APC.Parser = (function(APC){
		/*
		 * Generated by PEG.js 0.7.0.
		 *
		 * http://pegjs.majda.cz/
		 */

		function quote(s) {
				/*
				 * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
				 * string literal except for the closing quote character, backslash,
				 * carriage return, line separator, paragraph separator, and line feed.
				 * Any character may appear in the form of an escape sequence.
				 *
				 * For portability, we also escape escape all control and non-ASCII
				 * characters. Note that "\0" and "\v" escape sequences are not used
				 * because JSHint does not like the first and IE the second.
				 */
				return '"' + s
		.replace(/\\/g, '\\\\')  // backslash
		.replace(/"/g, '\\"')    // closing quote character
		.replace(/\x08/g, '\\b') // backspace
		.replace(/\t/g, '\\t')   // horizontal tab
		.replace(/\n/g, '\\n')   // line feed
		.replace(/\f/g, '\\f')   // form feed
		.replace(/\r/g, '\\r')   // carriage return
		.replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)
		+ '"';
		}

		var result = {
				/*
				 * Parses the input with a generated parser. If the parsing is successfull,
				 * returns a value explicitly or implicitly specified by the grammar from
				 * which the parser was generated (see |PEG.buildParser|). If the parsing is
				 * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
				 */
				parse: function(input, startRule) {
						var parseFunctions = {
								"Start": parse_Start,
								"RegEx": parse_RegEx,
								"Name": parse_Name,
								"Literal": parse_Literal,
								"Set": parse_Set,
								"Quantifiable": parse_Quantifiable,
								"Contract": parse_Contract
						};

						if (startRule !== undefined) {
								if (parseFunctions[startRule] === undefined) {
										throw new Error("Invalid rule name: " + quote(startRule) + ".");
								}
						} else {
								startRule = "Start";
						}

						var pos = 0;
						var reportFailures = 0;
						var rightmostFailuresPos = 0;
						var rightmostFailuresExpected = [];

						function padLeft(input, padding, length) {
								var result = input;

								var padLength = length - input.length;
								for (var i = 0; i < padLength; i++) {
										result = padding + result;
								}

								return result;
						}

						function escape(ch) {
								var charCode = ch.charCodeAt(0);
								var escapeChar;
								var length;

								if (charCode <= 0xFF) {
										escapeChar = 'x';
										length = 2;
								} else {
										escapeChar = 'u';
										length = 4;
								}

								return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
						}

						function matchFailed(failure) {
								if (pos < rightmostFailuresPos) {
										return;
								}

								if (pos > rightmostFailuresPos) {
										rightmostFailuresPos = pos;
										rightmostFailuresExpected = [];
								}

								rightmostFailuresExpected.push(failure);
						}

						function parse_Start() {
								var result0;
								var pos0;

								pos0 = pos;
								result0 = parse_Contract();
								if (result0 !== null) {
										result0 = (function(offset, contract) { return contract; })(pos0, result0);
								}
								if (result0 === null) {
										pos = pos0;
								}
								return result0;
						}

						function parse_RegEx() {
								var result0, result1, result2;
								var pos0, pos1;

								pos0 = pos;
								pos1 = pos;
								if (input.charCodeAt(pos) === 47) {
										result0 = "/";
										pos++;
								} else {
										result0 = null;
										if (reportFailures === 0) {
												matchFailed("\"/\"");
										}
								}
								if (result0 !== null) {
										if (/^[a-zA-Z0-9_^$?*+.\\(){}[\],|\-]/.test(input.charAt(pos))) {
												result2 = input.charAt(pos);
												pos++;
										} else {
												result2 = null;
												if (reportFailures === 0) {
														matchFailed("[a-zA-Z0-9_^$?*+.\\\\(){}[\\],|\\-]");
												}
										}
										if (result2 !== null) {
												result1 = [];
												while (result2 !== null) {
														result1.push(result2);
														if (/^[a-zA-Z0-9_^$?*+.\\(){}[\],|\-]/.test(input.charAt(pos))) {
																result2 = input.charAt(pos);
																pos++;
														} else {
																result2 = null;
																if (reportFailures === 0) {
																		matchFailed("[a-zA-Z0-9_^$?*+.\\\\(){}[\\],|\\-]");
																}
														}
												}
										} else {
												result1 = null;
										}
										if (result1 !== null) {
												if (input.charCodeAt(pos) === 47) {
														result2 = "/";
														pos++;
												} else {
														result2 = null;
														if (reportFailures === 0) {
																matchFailed("\"/\"");
														}
												}
												if (result2 !== null) {
														result0 = [result0, result1, result2];
												} else {
														result0 = null;
														pos = pos1;
												}
										} else {
												result0 = null;
												pos = pos1;
										}
								} else {
										result0 = null;
										pos = pos1;
								}
								if (result0 !== null) {
										result0 = (function(offset, regex) {
												var string = "";
												regex.foreach(function(k,v) {
														string += v;
												});
												return string;
										})(pos0, result0[1]);
								}
								if (result0 === null) {
										pos = pos0;
								}
								return result0;
						}

						function parse_Name() {
								var result0, result1;
								var pos0;

								pos0 = pos;
								result0 = [];
								if (/^[a-zA-Z0-9_]/.test(input.charAt(pos))) {
										result1 = input.charAt(pos);
										pos++;
								} else {
										result1 = null;
										if (reportFailures === 0) {
												matchFailed("[a-zA-Z0-9_]");
										}
								}
								while (result1 !== null) {
										result0.push(result1);
										if (/^[a-zA-Z0-9_]/.test(input.charAt(pos))) {
												result1 = input.charAt(pos);
												pos++;
										} else {
												result1 = null;
												if (reportFailures === 0) {
														matchFailed("[a-zA-Z0-9_]");
												}
										}
								}
								if (result0 !== null) {
										result0 = (function(offset, name) {
												var string = "";
												name.foreach(function(k,v) {
														string += v;
												});
												return string;
										})(pos0, result0);
								}
								if (result0 === null) {
										pos = pos0;
								}
								return result0;
						}

						function parse_Literal() {
								var result0, result1, result2;
								var pos0, pos1;

								pos0 = pos;
								if (input.charCodeAt(pos) === 64) {
										result0 = "@";
										pos++;
								} else {
										result0 = null;
										if (reportFailures === 0) {
												matchFailed("\"@\"");
										}
								}
								if (result0 !== null) {
										result0 = (function(offset, l) { return new APC.Contract.AtLiteral(); })(pos0, result0);
								}
								if (result0 === null) {
										pos = pos0;
								}
								if (result0 === null) {
										pos0 = pos;
										if (input.charCodeAt(pos) === 63) {
												result0 = "?";
												pos++;
										} else {
												result0 = null;
												if (reportFailures === 0) {
														matchFailed("\"?\"");
												}
										}
										if (result0 !== null) {
												result0 = (function(offset, l) { return new APC.Contract.QMarkLiteral(); })(pos0, result0);
										}
										if (result0 === null) {
												pos = pos0;
										}
										if (result0 === null) {
												pos0 = pos;
												pos1 = pos;
												if (input.substr(pos, 2) === "!(") {
														result0 = "!(";
														pos += 2;
												} else {
														result0 = null;
														if (reportFailures === 0) {
																matchFailed("\"!(\"");
														}
												}
												if (result0 !== null) {
														result1 = parse_Literal();
														if (result1 !== null) {
																if (input.charCodeAt(pos) === 41) {
																		result2 = ")";
																		pos++;
																} else {
																		result2 = null;
																		if (reportFailures === 0) {
																				matchFailed("\")\"");
																		}
																}
																if (result2 !== null) {
																		result0 = [result0, result1, result2];
																} else {
																		result0 = null;
																		pos = pos1;
																}
														} else {
																result0 = null;
																pos = pos1;
														}
												} else {
														result0 = null;
														pos = pos1;
												}
												if (result0 !== null) {
														result0 = (function(offset, l) { return new APC.Contract.NegContract(l); })(pos0, result0[1]);
												}
												if (result0 === null) {
														pos = pos0;
												}
												if (result0 === null) {
														pos0 = pos;
														result0 = parse_RegEx();
														if (result0 !== null) {
																result0 = (function(offset, l) { return new APC.Contract.RegExLiteral(l); })(pos0, result0);
														}
														if (result0 === null) {
																pos = pos0;
														}
														if (result0 === null) {
																pos0 = pos;
																result0 = parse_Name();
																if (result0 !== null) {
																		result0 = (function(offset, l) { return new APC.Contract.NameLiteral(l); })(pos0, result0);
																}
																if (result0 === null) {
																		pos = pos0;
																}
														}
												}
										}
								}
								return result0;
						}

						function parse_Set() {
								var result0, result1, result2, result3, result4;
								var pos0, pos1;

								pos0 = pos;
								pos1 = pos;
								if (input.charCodeAt(pos) === 40) {
										result0 = "(";
										pos++;
								} else {
										result0 = null;
										if (reportFailures === 0) {
												matchFailed("\"(\"");
										}
								}
								if (result0 !== null) {
										result1 = parse_Contract();
										if (result1 !== null) {
												if (input.charCodeAt(pos) === 43) {
														result2 = "+";
														pos++;
												} else {
														result2 = null;
														if (reportFailures === 0) {
																matchFailed("\"+\"");
														}
												}
												if (result2 !== null) {
														result3 = parse_Contract();
														if (result3 !== null) {
																if (input.charCodeAt(pos) === 41) {
																		result4 = ")";
																		pos++;
																} else {
																		result4 = null;
																		if (reportFailures === 0) {
																				matchFailed("\")\"");
																		}
																}
																if (result4 !== null) {
																		result0 = [result0, result1, result2, result3, result4];
																} else {
																		result0 = null;
																		pos = pos1;
																}
														} else {
																result0 = null;
																pos = pos1;
														}
												} else {
														result0 = null;
														pos = pos1;
												}
										} else {
												result0 = null;
												pos = pos1;
										}
								} else {
										result0 = null;
										pos = pos1;
								}
								if (result0 !== null) {
										result0 = (function(offset, s0, s1) { return new APC.Contract.OrContract(s0, s1); })(pos0, result0[1], result0[3]);
								}
								if (result0 === null) {
										pos = pos0;
								}
								if (result0 === null) {
										pos0 = pos;
										pos1 = pos;
										if (input.charCodeAt(pos) === 40) {
												result0 = "(";
												pos++;
										} else {
												result0 = null;
												if (reportFailures === 0) {
														matchFailed("\"(\"");
												}
										}
										if (result0 !== null) {
												result1 = parse_Contract();
												if (result1 !== null) {
														if (input.charCodeAt(pos) === 38) {
																result2 = "&";
																pos++;
														} else {
																result2 = null;
																if (reportFailures === 0) {
																		matchFailed("\"&\"");
																}
														}
														if (result2 !== null) {
																result3 = parse_Contract();
																if (result3 !== null) {
																		if (input.charCodeAt(pos) === 41) {
																				result4 = ")";
																				pos++;
																		} else {
																				result4 = null;
																				if (reportFailures === 0) {
																						matchFailed("\")\"");
																				}
																		}
																		if (result4 !== null) {
																				result0 = [result0, result1, result2, result3, result4];
																		} else {
																				result0 = null;
																				pos = pos1;
																		}
																} else {
																		result0 = null;
																		pos = pos1;
																}
														} else {
																result0 = null;
																pos = pos1;
														}
												} else {
														result0 = null;
														pos = pos1;
												}
										} else {
												result0 = null;
												pos = pos1;
										}
										if (result0 !== null) {
												result0 = (function(offset, s0, s1) { return new APC.Contract.AndContract(s0, s1); })(pos0, result0[1], result0[3]);
										}
										if (result0 === null) {
												pos = pos0;
										}
										if (result0 === null) {
												pos0 = pos;
												result0 = parse_Literal();
												if (result0 !== null) {
														result0 = (function(offset, s) { return s; })(pos0, result0);
												}
												if (result0 === null) {
														pos = pos0;
												}
										}
								}
								return result0;
						}

						function parse_Quantifiable() {
								var result0, result1;
								var pos0, pos1;

								pos0 = pos;
								pos1 = pos;
								result0 = parse_Set();
								if (result0 !== null) {
										if (input.charCodeAt(pos) === 63) {
												result1 = "?";
												pos++;
										} else {
												result1 = null;
												if (reportFailures === 0) {
														matchFailed("\"?\"");
												}
										}
										if (result1 !== null) {
												result0 = [result0, result1];
										} else {
												result0 = null;
												pos = pos1;
										}
								} else {
										result0 = null;
										pos = pos1;
								}
								if (result0 !== null) {
										result0 = (function(offset, q) { return new APC.Contract.QMarkContract(q); })(pos0, result0[0]);
								}
								if (result0 === null) {
										pos = pos0;
								}
								if (result0 === null) {
										pos0 = pos;
										pos1 = pos;
										result0 = parse_Set();
										if (result0 !== null) {
												if (input.charCodeAt(pos) === 42) {
														result1 = "*";
														pos++;
												} else {
														result1 = null;
														if (reportFailures === 0) {
																matchFailed("\"*\"");
														}
												}
												if (result1 !== null) {
														result0 = [result0, result1];
												} else {
														result0 = null;
														pos = pos1;
												}
										} else {
												result0 = null;
												pos = pos1;
										}
										if (result0 !== null) {
												result0 = (function(offset, q) { return new APC.Contract.StarContract(q); })(pos0, result0[0]);
										}
										if (result0 === null) {
												pos = pos0;
										}
										if (result0 === null) {
												pos0 = pos;
												result0 = parse_Set();
												if (result0 !== null) {
														result0 = (function(offset, q) { return q; })(pos0, result0);
												}
												if (result0 === null) {
														pos = pos0;
												}
										}
								}
								return result0;
						}

						function parse_Contract() {
								var result0, result1, result2;
								var pos0, pos1;

								pos0 = pos;
								pos1 = pos;
								result0 = parse_Quantifiable();
								if (result0 !== null) {
										if (input.charCodeAt(pos) === 46) {
												result1 = ".";
												pos++;
										} else {
												result1 = null;
												if (reportFailures === 0) {
														matchFailed("\".\"");
												}
										}
										if (result1 !== null) {
												result2 = parse_Contract();
												if (result2 !== null) {
														result0 = [result0, result1, result2];
												} else {
														result0 = null;
														pos = pos1;
												}
										} else {
												result0 = null;
												pos = pos1;
										}
								} else {
										result0 = null;
										pos = pos1;
								}
								if (result0 !== null) {
										result0 = (function(offset, c0, c1) { return new APC.Contract.ConcatContract(c0, c1); })(pos0, result0[0], result0[2]);
								}
								if (result0 === null) {
										pos = pos0;
								}
								if (result0 === null) {
										pos0 = pos;
										result0 = parse_Quantifiable();
										if (result0 !== null) {
												result0 = (function(offset, c) { return c; })(pos0, result0);
										}
										if (result0 === null) {
												pos = pos0;
										}
								}
								return result0;
						}


						function cleanupExpected(expected) {
								expected.sort();

								var lastExpected = null;
								var cleanExpected = [];
								for (var i = 0; i < expected.length; i++) {
										if (expected[i] !== lastExpected) {
												cleanExpected.push(expected[i]);
												lastExpected = expected[i];
										}
								}
								return cleanExpected;
						}

						function computeErrorPosition() {
								/*
								 * The first idea was to use |String.split| to break the input up to the
								 * error position along newlines and derive the line and column from
								 * there. However IE's |split| implementation is so broken that it was
								 * enough to prevent it.
								 */

								var line = 1;
								var column = 1;
								var seenCR = false;

								for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
										var ch = input.charAt(i);
										if (ch === "\n") {
												if (!seenCR) { line++; }
												column = 1;
												seenCR = false;
										} else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
												line++;
												column = 1;
												seenCR = true;
										} else {
												column++;
												seenCR = false;
										}
								}

								return { line: line, column: column };
						}


						var result = parseFunctions[startRule]();

						/*
						 * The parser is now in one of the following three states:
						 *
						 * 1. The parser successfully parsed the whole input.
						 *
						 *    - |result !== null|
						 *    - |pos === input.length|
						 *    - |rightmostFailuresExpected| may or may not contain something
						 *
						 * 2. The parser successfully parsed only a part of the input.
						 *
						 *    - |result !== null|
						 *    - |pos < input.length|
						 *    - |rightmostFailuresExpected| may or may not contain something
						 *
						 * 3. The parser did not successfully parse any part of the input.
						 *
						 *   - |result === null|
						 *   - |pos === 0|
						 *   - |rightmostFailuresExpected| contains at least one failure
						 *
						 * All code following this comment (including called functions) must
						 * handle these states.
						 */
						if (result === null || pos !== input.length) {
								var offset = Math.max(pos, rightmostFailuresPos);
								var found = offset < input.length ? input.charAt(offset) : null;
								var errorPosition = computeErrorPosition();

								throw new this.SyntaxError(
												cleanupExpected(rightmostFailuresExpected),
												found,
												offset,
												errorPosition.line,
												errorPosition.column
												);
						}

						return result;
				},

				/* Returns the parser source code. */
				toSource: function() { return this._source; }
		};

		/* Thrown when a parser encounters a syntax error. */

		result.SyntaxError = function(expected, found, offset, line, column) {
				function buildMessage(expected, found) {
						var expectedHumanized, foundHumanized;

						switch (expected.length) {
								case 0:
										expectedHumanized = "end of input";
										break;
								case 1:
										expectedHumanized = expected[0];
										break;
								default:
										expectedHumanized = expected.slice(0, expected.length - 1).join(", ")
												+ " or "
												+ expected[expected.length - 1];
						}

						foundHumanized = found ? quote(found) : "end of input";

						return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
				}

				this.name = "SyntaxError";
				this.expected = expected;
				this.found = found;
				this.message = buildMessage(expected, found);
				this.offset = offset;
				this.line = line;
				this.column = column;
		};

		result.SyntaxError.prototype = Error.prototype;

		return result;
})(__APC);

//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 2.01
//////////////////////////////////////////////////

(function(APC) {


		function __PathTrieEdges() {
				var keys = [];
				var values = [];
				return Object.freeze({
						set: function(key, value) {
								if (key !== Object(key)) { 
										return false;
								}

								var i = keys.indexOf(key);
								if (i < 0) { i = keys.length; }
								keys[i] = key;
								values[i] = value;
								return true;
						},
					   get: function(key) {
							   var i = keys.indexOf(key);
							   return i < 0 ? undefined : values[i];
					   },
					   remove: function(key) {
							   var i = keys.indexOf(key);
							   if(i >= 0) {
									   keys.remove(i);
									   values.remove(i);
							   }
					   },
					   contains: function(element) {
							   var i = keys.indexOf(key);
							   return i < 0 ? false : true;
					   },
					   foreach: function(callback) {
							   keys.foreach(function(i,key){
									   callback(key, values[i]);
							   });
					   }
				});
		}





		function __PathTrie() {

				var subtrie = new __PathTrieEdges();

				var addEdge = function(property) {
						var emptyTrie = new __PathTrie();
						return subtrie.add(property, emptyTrie);
				}




				var addEndOfPath = function() {
						var emptyProperty = new __TraceEmpty();
						return addEdge(emptyProperty);
				};

				var removeEndOfPath = function() {
						var emptyProperty = new __TraceEmpty();
						subtrie.remove(emptyProperty);
				};

				var isEndOFPath = function() {
						var emptyProperty = new __TraceEmpty();
						return subtrie.contains(emptyProperty);
				};


				return {

						get endOfPath() {
								return isEndOFPath();
						},

							set endOfPath(value) {
									if(value) {
										return addEndOfPath();
									} else {
										return removeEndOfPath();
									}
							},


							add: function(property) {
									subtrie.foreach(function(edge, trie) {
											subtrie.add(property);
									});

									if(isEndOFPath()) {
											removeEndOfPath(); 
											if(!subtrie.contains(property)) {
													addEdge(property);
											}
											subtrie.get(property).endOfPath = true;
									}
							},

							merge: function(trie) {
								// TODO TBC
							},

							find: function(property) {
								// TODO TBC
							},


							toString: function() {
									var level = 0;
									var tmp = ''; 
									subtrie.foreach(function(property, trie) {
											level++;											
											string = ("\n(" + property.toString() + ") {" + trie.toString() + "}");
											tmp += padding_left(string, ' ', (level*3));
											level--;
									});
									return tmp;
							},



							dump: function() {
									result = new Array();
									
									subtrie.foreach(function(property, trie) {
										trie.dump().foreach(function(k, v) {
											result.push(property.toString() + "." + v);
										});
									});

									return result;
							},

				}

		}











/*

		//////////////////////////////////////////////////
		// PATH TRIE
		// TODO first approach - properties on edges
		// later, use path on edge, and splitting 
		// TODO flightweight patterns
		//////////////////////////////////////////////////

		function __PathTrie() {

				var children = new WeakMap();

				var endOfPath = true;



				var mergeProperty = function(property, trie) {
						if(children.contains(property)) {
								children.get(property).merge(trie);
						} else {
								children.set(property, trie);
						}
				}


				return {
						get endOfPath() {
								return endOfPath; 
						},
							set endOfPath(bool) {
									return (endOfPath=bool);
							},

													append: function(suffix) {
									__sysout("append: " + suffix);
									children.foreach(function(property, trie) {
											trie.append(suffix);
									});
									if(endOfPath) {
											if(children.contains(suffix)) {
													children.get(suffix).endOfFile = true;
													endOfPath=false;
											} else {
													children.set(suffix, new __PathTrie());
													//children.get(suffix).endOfFile = true;
													endOfPath=false;

											}
									}
							},

													merge: function(trie) {
									trie.foreach(function(property, trie) {
											mergeProperty(property, trie);
									});
							},

							foreach: function(callback) {
									children.foreach(callback);
							},

													toString: function() {
									var tmp = ''; 
									children.foreach(function(property, trie) {
											tmp = (" [" + property.toString() + "] => {" + trie.toString() + "}");
									});
									return tmp;
							},

													dump: function(trace, result) {
									if(endOfPath) {
											result.push(trace);
									}

									children.foreach(function(property, trie) {
											trie.dump((trace+'.'+property.toString()), result);
									});
									return result;
							},
				};
		}
*/



		// TODO
		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath.PathTrie		= __PathTrie;




})(__APC);


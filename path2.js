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
					   contains: function(key) {
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
						return subtrie.set(property, emptyTrie);
				}




				var addEndOfPath = function() {
						var emptyProperty = new APC.TracePath.TraceEmpty();
						return addEdge(emptyProperty);
				};

				var removeEndOfPath = function() {
						var emptyProperty = new APC.TracePath.TraceEmpty();
						subtrie.remove(emptyProperty);
				};

				var isEndOFPath = function() {
						var emptyProperty = new APC.TracePath.TraceEmpty();
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
									__sysout("   #add " + property);
									subtrie.foreach(function(edge, trie) {
											if(edge!=new APC.TracePath.TraceEmpty()) trie.add(property);
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
									var tmp = ''; 
									subtrie.foreach(function(property, trie) {
											string = ("(" + property.toString() + ") {" + trie.toString() + "}");
											tmp += string;
									});
									return tmp;
							},

							print: function(l) {
									var level = (l==null) ? 0 : l;
									var tmp = ''; 
									subtrie.foreach(function(property, trie) {
											string = ("(" + property.toString() + ") {" + trie.print(level+1) + "\n" + margin_left("}", ' ', (level*3)));
											tmp += "\n" + margin_left(string, ' ', (level*3));
									});
									return tmp;
							},


							dump: function() {
									var result = new StringMap();
									//		if(this.endOfPath) {
									//				result[]
													//	result = result.concat(["$"]);
											//	result = result.concat(["$"]);

									//		}


									subtrie.foreach(function(property, trie) {
											if(property==new APC.TracePath.TraceEmpty()) {
											//		__sysout("adsf");
													path = new APC.TracePath.TraceEmpty();
											//		__sysout("PATH" + path);
													result[path.toString()] = path;
													
												//	__sysout("$$" +  result.length);

													//result.push("asdf");
											}
										
											trie.dump().foreach(function(hash, subpath) {
													path = new APC.TracePath.TracePath(property, subpath);
													result[path.toString()] = path;
													//result.push(property.toString() + "." + trace);
											});
											



										//	__sysout("   PROPERTY: " + property);
										//		__sysout("   SUBTRIE: " + trie);
										//	
										//	__sysout(trie.dump().length);
										//	result = trie.dump();
									
									/*		__sysout("!!" + trie.dump());
											trie.dump().foreach(function(k, v) {
											__sysout("asdf");
											result.push(property.toString() + "." + v);
												
										}); */

									});

								//	if(this.endOfPath) {
								///		__sysout("ENDOFPATH")
								//		result.push('#');
								//	}
	

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


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

		//		function __EmptyTrie() {
		//				trie = new __PathTrie();
		//				trie.
		//		}



		function __PathTrie( /*trieArrayArg, edgeArg,*/ endOfPathArg) {

				// edges E := {} | E[Property -> PathTrie]
				var subtrie = new __PathTrieEdges();


				var addEdge = function(property, endOfPath) {
						//var emptyTrie = new __PathTrie(,,endOfPath);

						var emptyTrie = new __PathTrie();
						return subtrie.set(property, emptyTrie);
				};

				var containsEdge = function(property) {
						return subtrie.contains(property);
				};

				var addSubtrie = function(property, trie) {
						return subtrie.set(property, trie);
				};

				var getSubtrie = function(property) {
						return subtrie.get(property);
				};

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







/*
				// merge given trie's into a new one
				if(trieArrayArg instanceof Array) {
						__sysout("# merge trieArrays");

						// foreach trie in trieArrayArg
						trieArrayArg.foreach(function(k, trieArg) {

								// foreach edge E: Proeprty -> PathTrie in trieArg.edges
								trieArg.edges.foreach(function(property, subtrieOfTrieArg) {

										if(containsEdge(property)) {
												subtrie = new __PathTrie([getSubtrie(property) ,subtrieOfTrieArg]);
												addSubtrie(property, subtrie);
										} else {
												addSubtrie(property, subtrieOfTrieArg);
										}
								});
						});
				}


				if(edgeArg != null) {
						__sysout("# add edgeArg");


						subtrie.foreach(function(edge, trie) {
								if(edge!=new APC.TracePath.TraceEmpty()) {
									addEdge(edge, true);
								} else {
									t = new __PathTrie([]);

									addEdge([new __PathTrie(), edge, true);
								}
								
								
								
								
								trie.add(property);
						});

						if(isEndOFPath()) {
								removeEndOfPath(); 
								if(!subtrie.contains(property)) {
										addEdge(property);
								}
								subtrie.get(property).endOfPath = true;
						}




					
				}
*/

				if(endOfPathArg instanceof Boolean) {
						__sysout("# set endOfPathArg");
						if(value) {
								__sysout("# set endOfPath=true");
								return addEndOfPath();
						} else {
								__sysout("# set endOfPath=false");
								return removeEndOfPath();
						}
				}










				
			

				//				if(trie!=null) {
				//						trie.edges.foreach(function(property, subtrie){
				//							subtrie.set(property, subtrie);
				//						});
				//				}
				//
				//				if(eop!=null) {
				//					if(eop) {
				//						return addEndOfPath();
				//					} else {
				//						return removeEndOfPath();
				//					}
				//				}


				return {

						get endOfPath() {
								return isEndOFPath();
						},
							get edges() {
									return subtrie;
							},



							set endOfPath(value) {
									//	return trie = new __PathTrie(this, value);

									//	newTrie = new __PathTrie();
									//	newTrie.merge(this);

									if(value) {
											return addEndOfPath();
									} else {
											return removeEndOfPath();
									}
							},


					//		setEndOfPath: function(arg) {
				//				return new __PathTrie(this, arg);
				//			},



							add: function(property) {
								//	t = new __PathTrie();
								//	t.merge(this);



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

							append: function(property, trieArg) {
									subtrie.foreach(function(edge, trie) {
											if(edge!=new APC.TracePath.TraceEmpty()) trie.append(property, trieArg);
									});

									if(isEndOFPath()) {
											removeEndOfPath(); 
										
											if(containsEdge(property)) {
													getSubtrie(property).merge(subtrieOfTrie);
											} else {
													addSubtrie(property, subtrieOfTrie);
											}

										
											//if(!subtrie.contains(property)) {
											//		addSubtrie(property, trieArg);
											//} else {
										//		getSubtrie(property).merge(subtrieOfTrie);
										//	}
											//subtrie.get(property).merge(trieArg);
									}
							},

							merge: function(trie) {
									trie.edges.foreach(function(property, subtrieOfTrie) {


											if(containsEdge(property)) {
													getSubtrie(property).merge(subtrieOfTrie);
											} else {
													addSubtrie(property, subtrieOfTrie);
											}


									});

									// TODO TBC
							},

							remove: function(property) {

							},

							find: function(property) {
									//return (subtrie.contains(property)) ? subtrie.get(property) : undefined;
									// TODO TBC
									// // needed
							},






							toString: function() {
									var tmp = ''; 
									subtrie.foreach(function(property, trie) {
											if(property==new APC.TracePath.TraceEmpty()) string = "($)";
											else string = ("(" + property.toString() + ") {" + trie.toString() + "}");
											tmp += string;
									});
									return tmp;
							},

							print: function(l) {
									var level = (l==null) ? 0 : l;
									var tmp = ''; // (this.endOfPath) ? '$' : '';
									subtrie.foreach(function(property, trie) {
											if(property==new APC.TracePath.TraceEmpty()) string = "($)";
											else string = ("(" + property.toString() + ") {" + trie.print(level+1) + "\n" + margin_left("}", ' ', (level*3)));
											tmp += "\n" + margin_left(string, ' ', (level*3));
									});
									//return (this.endOfPath) ? (tmp+')') : tmp;
									return tmp;	
							},


							dump: function() {
									var result = new Array();

									subtrie.foreach(function(property, trie) {
											if(property==new APC.TracePath.TraceEmpty()) {
													path = new APC.TracePath.TraceEmpty();
													result.push(path);
											}

											trie.dump().foreach(function(i, subpath) {
													path = new APC.TracePath.TracePath(property, subpath);
													result.push(path);
											});
									});
									return result;
							},

							get paths() {
								return this.dump();
							},

				}

		}












		// TODO
		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath.PathTrie		= __PathTrie;



		//////////////////////////////////////////////////
		//  TRIE CACHE
		//  cache for path tries
		//////////////////////////////////////////////////

		/** Path Cache 
		*/
		function __TrieCache() {

				// cache array
				var cache = new StringMap();

				return {

						/* cache function
						 * @param path trace path
						 * @return trace path
						 */
						c: function(trie) {
								if(this.contains(trie.toString())) {
										return this.get(trie.toString());
								} else {
										this.put(trie.toString(), trie);
										return trie;
								}
						},

								/* put
								 * @param key cache key
								 * @param value cache value
								 * @return value
								 */
								put: function(key, value) {
										cache.set(key, value);
										return value;
								},

								/* get
								 * @param key cache key
								 * @return value
								 */
								get: function(key) {
										return cache.get(key);
								},

								/* contains
								 * @param key cache key
								 * @return true, if key in cache, false otherwise
								 */
								contains: function(key) {
										return cache.has(key);
								},

								/* clear cache
								*/
								clear: function() {
										cache = new StringMap();
								}
				}
		}

		// current trie cache
		var __cache = new __TrieCache();



		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath.TrieCache = __cache;

})(__APC);


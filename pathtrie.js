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

		/** Edges
		*/
		function __Edges() {
				var keys = [];
				var values = [];
				return Object.freeze({
						/* Length
						 * @return length of key array
						 */
						get length() {
								return keys.length;
						},
					   /* Set
						* @return key
						* @param value
						* @return true|false
						*/
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
					   /* Get
						* @return key
						* @return undefined|values[i]
						*/
					   get: function(key) {
							   var i = keys.indexOf(key);
							   return i < 0 ? undefined : values[i];
					   },
					   /* Remove
						* @param key
						* @return true|false
						*/
					   remove: function(key) {
							   var i = keys.indexOf(key);
							   if(i >= 0) {
									   return (keys.remove(i) && values.remove(i));
							   }
					   },
					   /* Contains
						* @param key
						* @return true|false
						*/
					   contains: function(key) {
							   var i = keys.indexOf(key);
							   return i < 0 ? false : true;
					   },
					   /* Foreach
						* @param callback
						*/
					   foreach: function(callback) {
							   keys.foreach(function(i,key){
									   callback(key, values[i]);
							   });
					   }
				});
		}



		// TODO
		/** Empty Path Trie
		 * @param trieArg PathTrie to clone
		 */
		function __EmptyPathTrie() {
				var trie = new __PathTrie();
				return trie.makeEndOfPath();
		}



		/** Path Trie
		 * @param trieArg PathTrie to clone
		 */
		function __PathTrie(trieArg) {

				// edges E := {} | E[Property -> PathTrie]
				var edges = new __Edges();

				//////////////////////////////////////////////////
				/* If trieArg is set, than clone trieArg */
				if(trieArg != null) {
						trieArg.edges.foreach(function(property, trie) {
								edges.set(property, trie);
						});
				}

				//////////////////////////////////////////////////
				return {

						/* GET endOfPath
						 * @return true|false
						 */
						get endOfPath() {
								return this.contains(new APC.TracePath.TraceEmpty());
						},
							/* GET edges
							 * @return Array with Property-Trie Elements
							 */
							get edges() {
									return edges;
							},

							/* GET path
							 * @return Array with Path-Elements
							 */
							get paths() {
									return this.dump();
							},

							//////////////////////////////////////////////////
							/* GET
							 * @param property property name
							 * @return PathTrie|undefined
							 */
							get: function(property) {
									return edges.get(property);
							},

							/* SET
							 * @param property edge name
							 * @param trie subtrie
							 * @return PathTrie
							 */
							set: function(property, trie) {
									newTrie = new __PathTrie(this);
									newTrie.edges.set(property, trie);

									// cache
									return __cache.c(newTrie); 
							},

							/* REMOVE
							 * @param property edge name
							 * @return PathTrie
							 */
							remove: function(property) {
									newTrie = new __PathTrie(this);
									newTrie.edges.remove(property);

									// cache
									return __cache.c(newTrie); 
							},

							/* CONTAINS
							 * @param property edge name
							 * @return true|false
							 */
							contains: function(property) {
									return edges.contains(property);
							},

							//////////////////////////////////////////////////
							/* END OF PATH
							 * @return PathTrie
							 */
							makeEndOfPath: function() {
									newTrie = new __PathTrie(this);
									newTrie.edges.set(new APC.TracePath.TraceEmpty(), new __PathTrie());

									// cache
									return __cache.c(newTrie); 
							},

							/* END OF PATH
							 * @return PathTrie
							 */
							removeEndOfPath: function() {
									newTrie = new __PathTrie(this);
									newTrie.edges.remove(new APC.TracePath.TraceEmpty());

									// cache
									return __cache.c(newTrie); 
							},

							/* APPEND EDGE
							 * substitutes all endOfPath-Edges by property->{}
							 * @param property edge
							 */
							append: function(property) {
									newTrie = new __PathTrie(this);

									// for all edges in this
									newTrie.edges.foreach(function(edge, trie) {
											if(edge!=new APC.TracePath.TraceEmpty()) newTrie.edges.set(edge, newTrie.get(edge).append(property));
									});

									// if, this == endOfPath
									if(newTrie.endOfPath) {
											newTrie = newTrie.removeEndOfPath();

											// if property not in edges 
											if(newTrie.contains(property)) {
													newTrie = newTrie.set(property, newTrie.get(property).makeEndOfPath());
											} else {
													newTrie = newTrie.set(property, new __EmptyPathTrie());
											}
									}

									// cache
									return __cache.c(newTrie);

									/*
									// for all edges in this
									edges.foreach(function(edge, trie) {
									if(edge!=new APC.TracePath.TraceEmpty()) trie.append(property);
									});

									// if, this == endOfPath
									if(isEndOFPath()) {
									removeEndOfPath(); 

									// if property not in edges 
									if(containsEdge(property)) {
									getSubtrie(property).endOfPath = true;
									} else {
									addEdge(property);
									getSubtrie(property).endOfPath = true;
									}
									}
									*/
							},

							/* APPEND TRIE
							 * substitutes all endOfPath-Edges by property->subtrie
							 * @param property edge
							 * @param subtrie Path Trie
							 */
							/*							appendTrie: function(property, subtrie) {

							// for all edges in this
							edges.foreach(function(property, trie) {
							if(property!=new APC.TracePath.TraceEmpty()) trie.append(property, subtrie);
							});

							// if, this == endOfPath
							if(isEndOFPath()) {
							removeEndOfPath(); 

							// if property not in edges 
							if(containsEdge(property)) {
							getSubtrie(property).merge(subtrieOfTrie);
							} else {
							addSubtrie(property, subtrieOfTrie);
							}
							}
							},
							*/
							/* MERGE
							 * merges this with trie
							 * @param subtrie Path Trie
							 */
							merge: function(trie) {

									newTrie = new __PathTrie(this);


									// for ll edges in trie
									trie.edges.foreach(function(edge, trie) {

											// if property not in edges
											if(newTrie.contains(edge)) {
													newTrie = newTrie.set(edge, newTrie.get(edge).merge(trie));
											} else {
													newTrie = newTrie.set(edge, trie);
											}
									});


									// cache
									return __cache.c(newTrie);


									//__sysout("== MERGE " + trie + " on " + this);



									/*
									// for ll edges in trie
									trie.edges.foreach(function(property, trie) {

									// if property not in edges
									if(containsEdge(property)) {
									__sysout("=== CONTAINS " + property);

									getSubtrie(property).merge(trie);
									} else {
									__sysout("=== NOT CONTAINS " + property);

									addSubtrie(property, trie);
									}
									});
									*/
							},

							//////////////////////////////////////////////////
							/* To String
							 * returns a string representation
							 * @return String
							 */
							toString: function() {
									var tmp = ''; 
									edges.foreach(function(property, trie) {
											if(property==new APC.TracePath.TraceEmpty()) string = "($)";
											else string = ("(" + property.toString() + ") {" + trie.toString() + "}");
											tmp += string;
									});
									return tmp;
							},

							/* Print
							 * returns a line based tree-representation
							 * @return String
							 */
							print: function(l) {
									var level = (l==null) ? 0 : l;
									var tmp = '';
									edges.foreach(function(property, trie) {
											if(property==new APC.TracePath.TraceEmpty()) string = "($)";
											else string = ("(" + property.toString() + ") {" + trie.print(level+1) + "\n" + margin_left("}", ' ', (level*3)));
											tmp += "\n" + margin_left(string, ' ', (level*3));
									});
									return tmp;	
							},

							/* Dump
							 * returns an array containing all path elements
							 * @return Array
							 */
							dump: function() {
									var result = new Array();
									edges.foreach(function(property, trie) {
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
				}
		}




		/** Path Trie Decorator
		 * @param trieArg PathTrie to wrap
		 */
		function OLD__PathTrieDecorator(trie) {

				// PathTrie T
				var pathTrie = (trie!=null) ?  new __PathTrie(trie) :  new __PathTrie();

				return {

						/* Get: Trie
						 * @return T - wrapped PathTrie
						 */
						get trie() {
								return pathTrie;
						},

							/* Get: endOfPath
							 * @return T.endOfPath
							 */
							get endOfPath() {
									return pathTrie.endOfPath;
							},

							/* Get: paths
							 * @return T.dump - all deducible paths
							 */
							get paths() {
									return pathTrie.dump();
							},

							//////////////////////////////////////////////////
							/* ENDOFPATH
							 * wraps: T.endOfPath=true
							 * @return Path Trie Decorator
							 */
							/*							makeEndOfPath: function() {
														newTrie = new __PathTrie(pathTrie);
														newTrie.endOfPath = true;

							// cache
							return canonicalize(newTrie); 
							},	
							*/
							/* APPEND
							 * wraps: T.append(property)
							 * @return Path Trie Decorator
							 */
							append: function(property) {
									newTrie = new __PathTrie(pathTrie);
									newTrie.append(property);

									__sysout("$$$$$$$$$$ " + newTrie + " $$$$$$$$$$ ");

									toreturn = canonicalize(newTrie);

									__sysout("$$$$$$$$$$ " + toreturn + " $$$$$$$$$$ ");


									// cache
									return canonicalize(newTrie); 
							},

							/* MERGE
							 * wraps: T.append(property)
							 * @return Path Trie Decorator
							 */
							merge: function(trie) {

									__sysout("MERGE with " + trie.trie);
									__sysout("MERGE with " + pathTrie);


									newTrie = new __PathTrie(pathTrie);

									__sysout("new TRIE" + pathTrie);

									newTrie.merge(trie.trie);

									__sysout("new TRIE" + newTrie);

									return canonicalize(newTrie); 
							},

							//////////////////////////////////////////////////
							/* To String
							 * wraps: T.toString()
							 * @return String
							 */
							toString: function() {
									return ("[[" + pathTrie.toString() + "]]");
							},

							/* Print
							 * wraps: T.print()
							 * @return String
							 */
							print: function() {
									return pathTrie.print();
							}
				};
		}



		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		// TODO
		APC.TracePath.PathTrie		= __PathTrie;
		//APC.TracePath.PathTrie			= __PathTrieDecorator;





		//////////////////////////////////////////////////
		//  TRIE CACHE
		//  cache for tries
		//////////////////////////////////////////////////

		/** Trie Cache 
		*/
		function __TrieCache() {

				// cache array
				var cache = new StringMap();

				//////////////////////////////////////////////////
				return {

						/* cache function
						 * @param path trace path
						 * @return trace path
						 */
						c: function(path) {
								// TODO
								return path;
								if(this.contains(path.toString())) {
										__sysout("Cache HIT " + path.toString());
										return this.get(path.toString());
								} else {
										__sysout("Cache MISS " + path);

										this.put(path.toString(), path);
										return path;
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
										__sysout("## " + key + " " + cache.get(key));
										__sysout(cache);
										cache.foreach(function(k,v) {
												__sysout("!~ " + k + " : " + v.toString());
										});

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


		// Canonicalize Tries
		// @param Trie
		// @return Trie Decorator
		/*		function canonicalize(trie) {

				__sysout("             @@@@@@@@@@@@ " + trie);


				decorator = new __PathTrieDecorator(trie);

				__sysout("             @@@@@@@@@@@@ " + decorator);

				toreturn = __cache.c(decorator);

				__sysout("             @@@@@@@@@@@@ " + toreturn);


				return toreturn;
				}
				*/

		// current trie cache
		var __cache = new __TrieCache();



		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath.TrieCache = __cache;

})(__APC);

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





		/** Path Trie
		 * @param trieArg PathTrie to clone
		 */
		function __PathTrie(trieArg) {

				// edges E := {} | E[Property -> PathTrie]
				var edges = new __Edges();



				//////////////////////////////////////////////////
				/* GET SubTrie
				 * @param property edge
				 * @return PathTrie|undefined
				 */
				var getSubtrie = function(property) {
						return edges.get(property);
				};

				/* ADD SubTrie
				 * @param property edge
				 * @param trie, path trie
				 * @return true|false
				 */
				var addSubtrie = function(property, trie) {
						return edges.set(property, trie);
				};

				/* CONTAINS Edge
				 * @param property edge
				 * @return true|false
				 */
				var containsEdge = function(property) {
						return edges.contains(property);
				};



				//////////////////////////////////////////////////
				/* ADD Edge
				 * @param property property
				 * @param endOfPath true, if edge should point to a endOfPath trie, false otherwise
				 * @return true|false
				 */
				var addEdge = function(property) {
						return addSubtrie(property, new __PathTrie());
				};

				/* ADD endOfPath
				 * @return true|false
				 */
				var addEndOfPath = function() {
						return addEdge(new APC.TracePath.TraceEmpty());
				};

				/* REMOVE endOfPath
				 * @return true|false
				 */
				var removeEndOfPath = function() {
						return edges.remove(new APC.TracePath.TraceEmpty());
				};

				/* IS endOfPath
				 * @return true|false
				 */
				var isEndOFPath = function() {
						return containsEdge(new APC.TracePath.TraceEmpty());
				};



				//////////////////////////////////////////////////
				/* If trieArg is set, than clone trieArg */
				if(trieArg != null) {
						trieArg.edges.foreach(function(property, trie) {
								addSubtrie(property, trie);
						});
				}



				//////////////////////////////////////////////////
				return {

						/* GET endOfPath
						 * @return true|false
						 */
						get endOfPath() {
								return isEndOFPath();
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

							/* SET endOfPath
							 * @param endOfPath true adds the empty path, false removes it
							 */
							set endOfPath(endOfPath) {
									if(endOfPath) {
											return addEndOfPath();
									} else {
											return removeEndOfPath();
									}
							},

							//////////////////////////////////////////////////
							/* APPEND EDGE
							 * substitutes all endOfPath-Edges by property->{}
							 * @param property edge
							 */
							append: function(property) {

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
							},

							/* APPEND TRIE
							 * substitutes all endOfPath-Edges by property->subtrie
							 * @param property edge
							 * @param subtrie Path Trie
							 */
							appendTrie: function(property, subtrie) {

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

							/* MERGE
							 * merges this with trie
							 * @param subtrie Path Trie
							 */
							merge: function(trie) {

									// for ll edges in trie
									trie.edges.foreach(function(property, trie) {

											// if property not in edges
											if(containsEdge(property)) {
													getSubtrie(property).merge(trie);
											} else {
													addSubtrie(property, trie);
											}
									});
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
		function __PathTrieDecorator(trie) {

				// PathTrie T
				pathTrie = (trie!=null) ? trie :  new __PathTrie();

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
							makeEndOfPath: function() {
									newTrie = new __PathTrie(pathTrie);
									newTrie.endOfPath = true;

									// cache
									return canonicalize(newTrie); 
							},	

							/* APPEND
							 * wraps: T.append(property)
							 * @return Path Trie Decorator
							 */
							append: function(property) {
									newTrie = new __PathTrie(pathTrie);
									newTrie.append(property);

									// cache
									return canonicalize(newTrie); 
							},

							/* MERGE
							 * wraps: T.append(property)
							 * @return Path Trie Decorator
							 */
							merge: function(trie) {
									newTrie = new __PathTrie(pathTrie);
									newTrie.merge(trie.trie);

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
		//APC.TracePath.PathTrie		= __PathTrie;
		APC.TracePath.PathTrie			= __PathTrieDecorator;





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
								if(this.contains(path.toString())) {
										return this.get(path.toString());
								} else {
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
		function canonicalize(trie) {
				decorator = new __PathTrieDecorator(trie);
				return __cache.c(decorator);
		}


		// current trie cache
		var __cache = new __TrieCache();



		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath.TrieCache = __cache;

})(__APC);

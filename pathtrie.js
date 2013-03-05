//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
//
// Copyright (c) University of Freiburg
//  http://proglang.informatik.uni-freiburg.de/
//
// Author: Matthias Keil
//  http://www.informatik.uni-freiburg.de/~keilr/
//////////////////////////////////////////////////
(function(APC) {

		/** Edges
		*/
		function __Edges() {
				var keys = [];
				var values = [];
				return Object.freeze({
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
		 * @param endOfPathArg true, if trie is endOfPath, false otherwise
		 */
		function __PathTrie(endOfPathArg) {

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
				var addEdge = function(property, endOfPath) {
						return addSubtrie(property, new __PathTrie(endOfPath));
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
				/* If endOfPathArg is set, make this to andOfPath
				*/
				if((typeof endOfPathArg) === "boolean") {
						if(endOfPathArg) {
								addEndOfPath();
						} else {
								removeEndOfPath();
						}
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
							/* ADD
							 * substitutes all endOfPath-Edges by property->{}
							 * @param property edge
							 */
							add: function(property) {

									// for all edges in this
									edges.foreach(function(edge, trie) {
											if(edge!=new APC.TracePath.TraceEmpty()) trie.add(property);
									});

									// if, this == endOfPath
									if(isEndOFPath()) {
											removeEndOfPath(); 

											// if property not in edges 
											if(containsEdge(property)) {
													getSubtrie(property).endOfPath = true;
											} else {
													addEdge(property, true);
											}
									}
							},

							/* APPEND
							 * substitutes all endOfPath-Edges by property->subtrie
							 * @param property edge
							 * @param subtrie Path Trie
							 */
							append: function(property, subtrie) {

									// for all edges in this
									edges.foreach(function(edge, trie) {
											if(edge!=new APC.TracePath.TraceEmpty()) trie.append(property, subtrie);
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
									__sysout("   @@@ " + this.print());
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



		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath.PathTrie		= __PathTrie;

})(__APC);

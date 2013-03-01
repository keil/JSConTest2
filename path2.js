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

									__sysout("MERGE:" + this + " AND " + trie);

									trie.edges.foreach(function(property, subtrieOfTrie) {

											
											if(containsEdge(property)) {
													__sysout("CONTAINS EDGE");
												getSubtrie(property).merge(subtrieOfTrie);
											} else {
													__sysout("NOTCONTAINS EDGE");
												addSubtrie(property, subtrieOfTrie);
											}


									});

									__sysout("RESULT " + this);

									// TODO TBC
							},

							find: function(property) {
									//return (subtrie.contains(property)) ? subtrie.get(property) : undefined;
									// TODO TBC
									// // needed
							},

							get edges() {
								return subtrie;
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
									var tmp = ''; // (this.endOfPath) ? '$' : '';
									subtrie.foreach(function(property, trie) {
											string = ("(" + property.toString() + ") {" + trie.print(level+1) + "\n" + margin_left("}", ' ', (level*3)));
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
									__sysout("DUMP " + result);
									return result;
							},

				}

		}












// TODO
//////////////////////////////////////////////////
// APC . Path
//////////////////////////////////////////////////
APC.TracePath.PathTrie		= __PathTrie;




})(__APC);


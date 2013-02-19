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

		//////////////////////////////////////////////////
		// PATH TRIE
		// TODO
		//////////////////////////////////////////////////

		/** PathTrie
		*/ 
		function __PathTrie() {

				/* Child-Ties
				 * TODO Path oder Property to Trie
				 */
				var children = new WeakMap();

				/** End of Path
				*/
				var endOfPath = false;

				return {
						get endOfPath() {
								return endOfPath; 
						},
							set endOfPath(bool) {
									return (endOfPath=bool);
							},

							append: function(suffix) {
									children.foreach(function(path, trie) {
											trie.append(suffix);
									});
									if(endOfPath) {
											children.set(suffix, new APC.TracePath.TraceEmpty());
											endOfPath=false;
									}

							},


							/** INSERT
							 * @param path key-path
							 * @param trie value-trie
							 */
							insert: function(path, trie) {
									children.set(path, trie);
							},

							/** REMOVE
							 * @param path key-path
							 */
							remove: function(path) {
									children.remove(path);
							},
							/** ToString
							 * @return string
							 */
							toString: function() {
									var tmp = ''; 
									children.foreach(function(path, trie) {
											tmp = (" [" + path.toString() + "] => {" + trie.toString() + "}");
									});
									return tmp;
							},
							/** Dump
							 * @return array
							 */
							dump: function(trace, result) {
									children.foreach(function(path, trie) {
											if(path == new APC.TracePath.TraceEmpty()) {
													result.push(trace);
											} else {
													__sysout("sasa");
													trie.dump((trace+'.'+path.toString()),result);
											}
									});
									return result;
							},
				};
		}



		// TODO
		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath.PathTrie		= __PathTrie;




})(__APC);


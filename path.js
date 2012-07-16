

function TracePath() {
		return {
				variableName: "",
				propertyPath: [],

				addVariable : function(name) {
						this.variableName = name;
				},

				addProperty : function(name) {
						this.propertyPath.push(name);
				}, 

				toString : function () {
						str = this.variableName;
						this.propertyPath.forEach( function(value) {
								str += "." + value;
						});
						return str;
				}
		}
}





tp1 = new TracePath();
tp1.addVariable("tp1");
tp1.addProperty("tp1P");



tp2 = new TracePath();
tp2.addVariable("tp2");
tp2.addProperty("tp2P");


__sysout(tp1.toString());


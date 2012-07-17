

function TracePath(name) {
		return {
				variableName: name,
				propertyPath: [],

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





//tp1 = new TracePath("safsadf");
//tp1.addProperty("tp1");
//tp1.addProperty("tp1P");


//tp2 = new TracePath("adfasdf");
//tp2.addProperty("tp2");
//tp2.addProperty("tp2P");

//__sysout(tp1.toString());
//__sysout(tp2.toString());



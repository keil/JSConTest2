windowX = {location:2, document:4};
documentX = windowX.document;
secret = "chacha";

function func(s) {
	//__sysout(s);
	//__sysout(arguments[0]);
	windowX = this.windowX;
		__sysout(secret);
	windowX.document;
	windowX.location = 54;
}

test = __permitArgs("(arguments.0.@+window.document)", func);


func(secret);
__dump();
test(secret);
__dump();
func();
__dump(secret);


/*
(function() {
x = __permit("@", x);
func();
})();
__dump();
*/

(function () {

	var factory = function () {
		var proto = {},
		    len = arguments.length;
		if (len > 1) {
			for (var i = 0; i < len; i++) {
				var arg = arguments[i];
				for (var key in arg) {
					proto[key] = arg[key];
				}
			}
		} else {
			proto = arguments[0] || proto;
		}
		return {
			create: function () {
				var obj = Object.create(proto);
				if (typeof proto.init == "function") {
					proto.init.apply(obj, arguments);
				}
				return obj;
			},
			isMakerOf: function (obj) {
				return proto.isPrototypeOf(obj);
			},
			proto: proto
		};
	};

	if (typeof module == "undefined") {
		window.factory = factory;
	} else {
		module.exports = factory;
	}

})();

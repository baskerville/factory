# API

Top level function:
- `factory(prototypes)`: returns a factory object for the given prototypes (if multiple prototypes are given, there are merged).

Factory object:
- `create(args)`: create an object and pass the given arguments to the `init` function of its prototype (if there is one), returns the object.
- `isMakerOf(object)`: returns whether the factory is the maker of the given object.
- `proto`: the factory's prototype.

# Example

```
var A = factory({
	init: function (u, v) {
		this.u = u;
		this.v = v;
	},
	roll: function () {
		console.log("roll");
	}
});

var B = factory({
	init: function (i) {
		this.i = i;
	},
	jump: function () {
		console.log("jump");
	}
});

var C = factory(A.proto, B.proto, {
	init: function (u, v, i) {
		A.proto.init.call(this, u, v);
		B.proto.init.call(this, i);
	}
});

var a = A.create(3, 7);
var c = C.create(1, 4, -2);

c.jump();
c.roll();

A.proto.blink = function () {
	console.log("blink");
}

a.blink();

console.log(A.isMakerOf(a), A.isMakerOf(c), C.isMakerOf(c));
```

/**
 * Hash map of GLSL data types to WebGL Uniform methods
 * @ignore
 */
const fnHash = {
	bool: "1i",
	int: "1i",
	float: "1f",
	vec2: "2fv",
	vec3: "3fv",
	vec4: "4fv",
	bvec2: "2iv",
	bvec3: "3iv",
	bvec4: "4iv",
	ivec2: "2iv",
	ivec3: "3iv",
	ivec4: "4iv",
	mat2: "Matrix2fv",
	mat3: "Matrix3fv",
	mat4: "Matrix4fv",
	sampler2D: "1i",
};

/**
 * @ignore
 */
export function extractUniforms(gl, shader) {
	const uniforms = {};
	const uniRx = /uniform\s+(\w+)\s+(\w+)/g;
	const uniformsData = {};
	const descriptor = {};
	const locations = {};
	let match;

	// Detect all uniform names and types
	[shader.vertex, shader.fragment].forEach((shader) => {
		while ((match = uniRx.exec(shader))) {
			uniformsData[match[2]] = match[1];
		}
	});

	// Get uniform references
	Object.keys(uniformsData).forEach((name) => {
		const type = uniformsData[name];
		locations[name] = gl.getUniformLocation(shader.program, name);

		descriptor[name] = {
			get: (function (name) {
				/*
				 * A getter for the uniform location
				 */
				return function () {
					return locations[name];
				};
			})(name),
			set: (function (name, type, fn) {
				if (/^mat/.test(type)) {
					/*
					 * A generic setter for uniform matrices
					 */
					return function (val) {
						gl[fn](locations[name], false, val);
					};
				} else {
					/*
					 * A generic setter for uniform vectors
					 */
					return function (val) {
						let fnv = fn;
						if (val.length && /v$/.test(fn)) {
							fnv += "v";
						}
						gl[fnv](locations[name], val);
					};
				}
			})(name, type, "uniform" + fnHash[type]),
		};
	});
	Object.defineProperties(uniforms, descriptor);

	return uniforms;
}

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
//import typescript from '@rollup/plugin-typescript';	//garbage
import typescript from 'rollup-plugin-typescript2';
//import sucrase from '@rollup/plugin-sucrase';
import { terser } from "rollup-plugin-terser";
//import copy from 'rollup-plugin-copy';
import htmlTemplate from 'rollup-plugin-generate-html-template';
//package.json
import pkg from './package.json';
//license
const year = new Date().getFullYear();
const banner = `/* @license ${pkg.license}, ${pkg.name} ${pkg.version} (c) ${year} ${pkg.author} */`;

//https://github.com/rollup/awesome
//https://hyeomans.com/migrate-node-package-typescript-rollup/

export default [
	// browser-friendly UMD build
	{
		input: './src/index.ts',
		output: [
			{
				name: 'dabbjs',
				file: pkg.browser,
				format: 'umd',
			},
			{
				name: 'dabbjs',
				file: "dist/dabbjs.umd.min.js",
				format: 'umd',
				sourcemap: true,
				banner: banner,
				plugins: [
					terser({
						format: {
							comments: function (node, comment) {
								console.log(comment.type);
								var text = comment.value;
								var type = comment.type;
								if (type == "comment2") {
									// multiline comment
									return /@preserve|@license|@cc_on/i.test(text);
								}
							},
						},
					}),
					htmlTemplate({
						template: 'src/tests/index.html',
						target: 'dist/tests/index.html',
					}),
				]
			}
		],
		plugins: [
			//copy({ targets: [{ src: 'src/tests/browser.html', dest: 'dist/tests' },] }),
			resolve({
				extensions: ['.js', '.ts']
			}),   // so Rollup can find `ms`
			typescript(), // so Rollup can convert TypeScript to JavaScript
			// sucrase({
			// 	exclude: ['node_modules/**'],
			// 	transforms: ['typescript']
			// }),
			commonjs(),  // so Rollup can convert `ms` to an ES module
		]
	},
	//{ file: "dist/dabbjs.min.js", format: 'cjs', plugins: [terser()] },

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using an array for the `output` option, where we can specify 
	// `file` and `format` for each target)
	{
		input: './src/index.ts',
		//external: ['ms'],
		plugins: [
			typescript({
				//useTsconfigDeclarationDir: true
			}) // so Rollup can convert TypeScript to JavaScript
		],
		output: [
			{ file: pkg.main, format: 'cjs' },	//index.js	commonjs Node
			{ file: pkg.module, format: 'es' }	//ES
		]
	},
	{
		input: './src/tests/server.ts',
		plugins: [
			typescript()
		],
		output: [
			{
				name: 'server',
				file: "dist/tests/server.js"
			}
		]
	},
	{
		input: './src/tests/client.ts',
		plugins: [
			typescript()
		],
		output: [
			{
				name: 'server',
				file: "dist/tests/client.js",
				plugins: [
					htmlTemplate({
						template: 'src/tests/client.html',
						target: 'dist/tests/client.html',
					})
				]
			}
		]
	}
];
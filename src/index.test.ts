// import { greet } from './index'
import jsdom from 'jsdom';
import { attr } from './lib/dom';
import { ts, typeOf } from './lib/dab';

const dom = new jsdom.JSDOM(`<!DOCTYPE html><p class="myClass">Hello world</p>`);
const p = dom.window.document.querySelector("p") as HTMLParagraphElement;

//pnpm run test

//undefined, null, number, string, boolean, array, object, function
console.log(`typeof new Date("1981,1,2") = ${ts(new Date("1981,1,2"))}`);
console.log(`typeof /[a]/g = ${ts(/[a]/g)}`);

console.log(`undefined:${typeOf(undefined)}, null:${typeOf(null)}, "a":${typeOf("a")}, 5:${typeOf(5)}, true:${typeOf(true)}, []:${typeOf([])},
{}:${typeOf({})}, function() {}:${typeOf(function () { })}, NaN:${typeOf(NaN)}, Date(1981,1,2):${typeOf(new Date("1981,1,2"))},
/[a]/g:${typeOf(/[a]/g)}`);

test('p is a DOM element', () => {
  //implement similar to dom.isDOM
  const isDOM = p instanceof dom.window.HTMLElement;
  expect(isDOM).toBe(true)
})

const myClass = "myClass";
test(`p class == ${myClass}`, () => {
  expect(attr(p, "class"))
    .toBe(myClass);
});

const dataValue = "5";

test(`p set attr "data-value"= "${dataValue}"`, () => {
  expect(attr(p, "data-value", dataValue))
    .toBe(p)
});

test(`p test attr "data-value" == "${dataValue}"`, () => {
  expect(attr(p, "data-value"))
    .toBe(dataValue);
});

const title = "p title";
const attrs = {
  title: title
};
test(`p set multiple attributes`, () => {
  expect(attr(p, attrs))
    .toBe(p);
})

test(`p test multiple attributes, title == "${title}"`, () => {
  expect(attr(p, "title"))
    .toBe(title);
})

// test('the data is peanut butter', () => {
//   expect(1).toBe(1)
// });

// test('greeting', () => {
//   expect(greet('Foo')).toBe('Hello Foo')
// });

/**
 * LINQ select many
 * @template TIn, TOut
 * @param {TIn} input array of input values
 * @param selectListFn extractor function (t: {@link TIn}) => {@link TOut}[]
 * @returns array {@link TOut}[]
 */
export const selectMany = <TIn, TOut>(input: TIn[], selectListFn: (t: TIn) => TOut[]): TOut[] =>
  input.reduce((out, inx) => {
    out.push(...selectListFn(inx));
    return out;
  }, new Array<TOut>());

/**
 * return unique items in array
 * @param x array
 */
export const unique = <T>(x: T[]): T[] => x.filter((elem, index) => x.indexOf(elem) === index);

/**
 *
 * @param x
 * @param y
 * @returns
 */
export const union = <T>(x: T[], y: T[]): T[] => unique(x.concat(y));

// export interface IGroupBy<K extends keyof any, T> {
// 	length: number;
// 	[P in K]: T;
// }

export type ActiveNoteGroup = {
  //initial length/count of keys
  length: 0;
  //first group selected
  //selected: 0;
}

/**
 * grouping group
 */
export type IGroupBy<K extends keyof any, T> = {
  [P in K]: T;
} & ActiveNoteGroup;

/**
 * groups an array by a function key
 * @param list Array of items of type `T`
 * @param getKey grouping key function
 * @returns a group object with keys and array of same key values
 */
export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) => {
  let
    obj = {} as IGroupBy<K, T[]>;
  obj.length = 0;
  return list.reduce((previous, currentItem) => {
    const
      key = getKey(currentItem);
    if (!previous[key]) {
      previous[key] = <any>[];
      previous.length++;
    }
    previous[key].push(currentItem);
    return previous;
  }, obj);
}

/*
export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) {
      previous[group] = [];
    }
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);
*/

//https://www.typescriptlang.org/docs/handbook/2/generics.html

/**
 * From T, pick a set of properties whose keys are of type P.
 */
export type PickOfType<T, P> = { [K in keyof T as P extends T[K] ? K : never]: T[K] & P };

/**
 *
 */
export type WritableKeys<T> = { [P in keyof T]-?: Equals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }> extends true ? P : never }[keyof T];

export type Equals<X, Y> = (<T>() => T extends X ? 1 : 0) extends (<T>() => T extends Y ? 1 : 0)
  ? (<T>() => T extends Y ? 1 : 0) extends (<T>() => T extends X ? 1 : 0) ? true : false : false;

export function setWritableProperty<T, V>(
  obj: T | PickOfType<T, V>,
  key: WritableKeys<typeof obj>, // <-- restrict to writable keys
  value: typeof obj[typeof key],
) {
  obj[key] = value;
}

/*
let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m");
*/

/**
 * gets an existing object property
 * @param obj object
 * @param key a key inside object
 * @returns
 */
export function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

/**
 * sets an existing object property value
 * @param obj object
 * @param {Key} key a key inside object
 * @param {Type[Key]} value value
 * @returns object for linking
 */
export function setProperty<Type, Key extends keyof Type>(obj: Type, key: Key, value: Type[Key]) {
  obj[key] = value;
  //
  return obj
}

// const f: HTMLDialog = <any>void 0;
// setProperty(f, 'header', "The Header");


// const setPropertyAttr = (dialog: HTMLDialog, prop: keyof HTMLDialog, value: any) => {
// 	if (dialog.hasAttribute("non-cancellable")) {
// 		setProperty(dialog, prop, false);
// 		dialog[prop] = false;
// 		dialog.removeAttribute("non-cancellable")
// 	}
// }

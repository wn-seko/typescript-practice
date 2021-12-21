// Index Signatures
interface StringArray {
  [index: number]: string;
}

type StringArray2 = Array<string>;

const getStringArray = (): StringArray => {
  return ['apple', 'banana', 'orange'];
};

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];

interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

interface NotOkay {
  [x: number]: Dog;
  [x: string]: Animal;
}

interface NotOkay2 {
  [x: string]: Dog;
  name: Animal;
}

const obj1 = {
  0: 1,
  1: 100,
  '1': 100,
};

const obj2 = {
  '0': 1,
  '1': 100,
  '1': 100,
};

const symbol1 = Symbol();
const symbol2 = Symbol();

const isSame = symbol1 === symbol2;
// isSame is false;

const obj3 = {
  symbol1: 1,
  symbol2: 2,
};

interface NumberDictionary {
  [index: string]: number;

  length: number; // ok
  name: string;
}

const dict1: NumberDictionary = { length: 1 };

const length1 = dict1.length;
const length2 = dict1['length'];

const name1 = dict1.name;
const name2 = dict1['name'];

interface ReadonlyStringArray {
  readonly [index: string]: string;
}

const getReadOnlyStringArray = (): ReadonlyStringArray => {
  return { apple: 'apple' };
};

let stringObject: ReadonlyStringArray = getReadOnlyStringArray();
stringObject['apple'] = 'Mallory';
stringObject['banana'] = 'Banana';

interface Colorful {
  key: string; // 同じでないとだめ
  color: string;
}

interface Circle {
  key: string; // 同じでないとだめ
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}
type ColorfulCircle2 = Colorful & Circle;

interface Circle2 extends Circle {
  radius: string;
}

const cc: ColorfulCircle = {
  key: '1',
  color: 'red',
  radius: 42,
};

const cc2: ColorfulCircle2 = {
  key: '1',
  color: 'red',
  radius: 42,
};

cc.color = 'yello';

interface Base1 {
  key: string;
  subobj: {
    props1: string;
    props2: string;
  };
}

interface Base2 {
  key: number;
  subobj: {
    props1: string;
    props2: number;
  };
}

// extends では定義時点でエラーになる
interface ExtendsObject extends Base1, Base2 {}

// interfection では定義時点でエラーにならないが競合する props は再帰的に検査されて string & number なら never になる
type IntersectionObject = Base1 & Base2;

const a: IntersectionObject = {
  key: '2',
  subobj: { props1: 'a', props2: 'b' },
};
const b: IntersectionObject = { key: 2, subobj: { props1: 'a', props2: 'b' } };

type question = undefined & number;

interface Base3 {
  key?: string;
  // key は string | undefined と同値;
}

interface Base4 {
  key?: number;
  // key は number | undefined と同値;
}

type Extends2 = Base3 & Base4;
// (string | undefined) & (number | undefined) なので undefined
const extends2: Extends2 = { key: 1 };

interface Base5 {
  key?: string;
  // key は string | undefined と同値;
}

interface Base6 {
  key: number;
}

type Extends3 = Base5 & Base6;
// (string | undefined) & number なので never
const extends3: Extends3 = { key: 1 };

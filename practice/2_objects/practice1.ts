interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return 'Hello ' + person.name;
}

type Shape = 'square' | 'circle';

interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

// エラーになる
function paintShape0(opts: PaintOptions) {
  let originalXPos = opts.xPos;
  let originalYPos = opts.yPos;

  // ↓ これはエラーになる
  // let originalXString = originalXPos.toString();
  // let originalYString = originalYPos.toString();
}

// 三項演算子を使うパターン
function paintShape1(opts: PaintOptions) {
  let safeXPos = opts.xPos === undefined ? 10 : opts.xPos;
  let safeYPos = opts.yPos === undefined ? 10 : opts.yPos;

  // ↓ これはエラーにならない
  let safeXString = safeXPos.toString();
  let safeYString = safeYPos.toString();
}

// nullish coalescing を使うパターン
function paintShape2(opts: PaintOptions) {
  // nullish coalescing は Nullish(undefined, null) に反応して右辺が評価される
  let safeXPos = opts.xPos ?? 10;
  let safeYPos = opts.yPos ?? 10;

  // ↓ これはエラーにならない
  let safeXString = safeXPos.toString();
  let safeYString = safeYPos.toString();
}

// nullish coalescing assignment を使うパターン
function paintShape3(opts: PaintOptions) {
  let safeXPos = opts.xPos;
  let safeYPos = opts.yPos;
  safeXPos ??= 10;
  safeYPos ??= 10;

  // ↓ これはエラーにならない
  let safeXString = safeXPos.toString();
  let safeYString = safeYPos.toString();
}

// デフォルトを指定するパターン（JS が提供している）
function paintShape4({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  let originalXPos = xPos;
  let originalYPos = yPos;

  // ↓ これはエラーにならない
  let originalXString = originalXPos.toString();
  let originalYString = originalYPos.toString();
}

// NG例: デフォルト演算子を使うパターン
function paintShapeNG1(opts: PaintOptions) {
  // デフォルト演算子は Falsy(false, '', 0, NaN, undefined, null) 全てに反応してしまうので 0 が指定できなくなる
  let safeXPos = opts.xPos || 10;
  let safeYPos = opts.yPos || 10;

  // ↓ これはエラーにならないけど '0' にはならない
  let safeXString = safeXPos.toString();
  let safeYString = safeYPos.toString();
}

// 分割代入でコロンを使用すると右側のリテラルに代入するという意味になるので TS の型注釈と構文が被る
const obj = { apple: 1 };
const { apple: bakedApple } = obj;
void bakedApple;

function getShape(): Shape {
  return 'square';
}

const shape = getShape();
paintShape0({ shape });
paintShape0({ shape, xPos: 100 });
paintShape0({ shape, yPos: 100 });
paintShape0({ shape, xPos: 100, yPos: 100 });

// time is NaN
const time = new Date('a').getTime();

// num is NaN
const num = Number('string');

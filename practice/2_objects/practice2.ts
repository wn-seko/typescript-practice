interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // 読み取りはできる
  void `prop has the value '${obj.prop}'.`;

  // 再代入できない
  // obj.prop = 'hello';
}

interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  void `Happy birthday ${home.resident.name}!`;

  // age, name は readonly がついていないので readonlyにはならない
  home.resident.age++;
  home.resident.name = 'hoge';
}

function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  //   home.resident = {
  //     name: 'Victor the Evictor',
  //     age: 42,
  //   };
}

interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: Person = {
  name: 'Person McPersonface',
  age: 42,
};

// works
let readonlyPerson: ReadonlyPerson = writablePerson;

void readonlyPerson.age; // prints '42'
writablePerson.age++;
void readonlyPerson.age; // prints '43'
// readonlyPerson.age++;  // これは怒られる

// 特に関数では注意
// ダックタイピングを優先しているので rewrite に readonly を入れられてしまう
// rewrite は参照渡しされた person を書き換えるので readonly が無効化されている
let person1: ReadonlyPerson = {
  name: 'Person McPersonface',
  age: 42,
};

function rewrite(person: Person) {
  person.name = 'New Name';
  person.age = 24;
}

// ↓ できちゃう！
rewrite(readonlyPerson);

// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type CreateImmutable<Type> = {
  +readonly [Property in keyof Type]: Type[Property];
};

type CreateItSelf<Type> = {
  // Sigunature Indexing を使用しています { [key: string]: string }
  // [Property in keyof Type] が Type のプロパティのキーすべてを指定する
  // Type[Property] が Type のプロパティ（にキーでアクセスして）の型を指定する
  [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

// [] を使うとプロパティの型にアクセスできる
type ID = LockedAccount['id'];

const lockedAccount: LockedAccount = { id: 'id001', name: 'Sample1' };
// ↓ エラーが発生する
// lockedAccount.name = 'Sample2';

const unlockedAccount: UnlockedAccount = { id: 'id001', name: 'Sample1' };
// ↓ エラーが発生しない
unlockedAccount.name = 'Sample2';

type ReLockedAccount = CreateImmutable<UnlockedAccount>;
const reLockedAccount: ReLockedAccount = { id: 'id001', name: 'Sample1' };
// ↓ エラーが発生する
// relockedAccount.name = 'Sample2';

// 実は組み込みに同じものがある
type ReLockedAccount2 = Readonly<UnlockedAccount>;
const reLockedAccount2: ReLockedAccount2 = { id: 'id001', name: 'Sample1' };
// ↓ エラーが発生する
// relockedAccount2.name = 'Sample2';

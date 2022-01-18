// union-types

// id は number または string, それ以外ではエラー
function printId(id: number | string) {
    console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
// printId({ myID: 22342 });

// id に対しては number でも string でも使えるメソッドのみ適用可能
function printId2(id: number | string) {
    // console.log(id.toUpperCase());
}

function printId3(id: number | string | string[]) {
    // TypeScriptがコードの構造に基づいて値のより具体的な型を推測
    // https://typescript-jp.gitbook.io/deep-dive/type-system/typeguard
    if (typeof id === "string") {
        // In this branch, id is of type 'string'
        console.log(id.toUpperCase());
    } else if (Array.isArray(id)) {
        // Here: 'id' is 'string[]'
        console.log("Hello, " + id.join(" and "));
    } else {
        // Here, id is of type 'number'
        console.log(id);
    }
}

// number[] も string も slice できるので 絞り込み（narrowing）なしでOK
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
    return x.slice(0, 3);
}

// Type の和集合 union をとると、プロパティは両者の積集合 intersection のみが使用可能になることに注意。
// string[] のプロパティ: slice, join, ...
// string のプロパティ: slice, toUpperCase ...
// string[] | string のプロパティ: slice, ...



// Generic Types
interface Box {
    contents: unknown;
}

let x: Box = {
    contents: "hello world",
};

// これだとエラー
// console.log(x.contents.toLowerCase());

// チェックすればOK
// we could check 'x.contents'
if (typeof x.contents === "string") {
    console.log(x.contents.toLowerCase());
}

// または型アサーションする。
// 型アサーションは、静的なキャストのようなもの: https://typescript-jp.gitbook.io/deep-dive/type-system/type-assertion#asshontokyasuto
// or we could use a type assertion
console.log((x.contents as string).toLowerCase());
console.log((x.contents as number).toString());  // これもできるらしい

let y = {} as Box;
if (typeof y.contents === "string") {
    console.log(y.contents.toLowerCase());
} else {
    console.log(typeof y.contents) // print 'undefined'
}

// let y2: Box = {}; // こうすればそもそもここで怒られる

interface GBox<T> {
    contents: T;
}
// GBox の型は「contents に T という型を持つ何か」という型
// GBox を使うときには T の部分に型引数 type argument を与える
let box: GBox<string>;

// GBox<string> は↓の StringBox と同じになる
interface StringBox {
    contents: string;
}

let boxA: GBox<string> = { contents: "hello" };
boxA.contents;

let boxB: StringBox = { contents: "world" };
boxB.contents;

// Generic function
function setContents<T>(box: GBox<T>, newContents: T) {
    box.contents = newContents;
}

setContents<string>(boxA, 'foobar')

// interface じゃなくて type でもできる
type GBox2<Type> = {
    contents: Type;
};

type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
type OneOrManyOrNullNumbers = OneOrManyOrNull<number>;
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;

let value = [1, 2, 3] as OneOrMany<number>;

if (typeof value === "number") {
    value; // number
} else {
    value; // number[]
}

function numberFunc(value: OrNull<OneOrMany<number>>) {
    if (typeof value === "number") {
        value; // number
    } else {
        value; // number[]
    }
}

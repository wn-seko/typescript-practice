# Object Types

- tsconfig の strictNullCheck を false にすると number | undefined などが表示されずに undefined の可能性がある property にアクセスできてしまった
- NaN チェックは TS ではチェックできない（Number の扱いになってしまう）ので JS でチェックしないといけない
- TypeScript の extends は Mixin なので多重継承ができる
- JS の Object Key には string, number, symbol が使用できる
  - index signature に number を使用すると string にキャストされる
  - この仕様によって number と string が同居する場合, 競合が発生する
- ColorfulCircle を作る時に共通のプロパティが別の型になっている場合はどうすれば良い？
  - 片方を Omit する必要がありそう

## 疑問点

- Intersection で key が片方にしかないのに成立するのはなぜ？
- UnionType を使用した時どうなるの？
  - [UnionTypes](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) でやってみる
- Mixin ってなに？

## 次回以降やりたいこと

- tsconfig の知識が薄いのでやりたい！
  - [What is a tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
  - [TSConfig Reference](https://www.typescriptlang.org/tsconfig)
- UnionTypes の知識が薄いのでやりたい！
  - [UnionTypes](https://www.typescriptlang.org/docs/handbook/utility-types.html)

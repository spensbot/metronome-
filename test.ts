class Test {
  a: string = "hello"
  b: number = 1

  print() {
    console.log(`${this.a} | ${this.b}`)
  }
}

const test1 = new Test()

test1.a = "goodbye"
test1.b = 5

test1.print()

const test1Serialized = JSON.stringify(test1)

const test1Deserialized: Test = JSON.parse(test1Serialized)

test1Deserialized.print()
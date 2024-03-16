// type AddFn = (a: number, b: number) => number;

interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(name: string): void;
}

class Person1 implements Greetable {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  greet(name: string): void {
    console.log("Hello ", this.name, " you are S/O ", name);
  }
}

// let user1: Person;

// user1 = {
//   name: "venkat",
//   age: 35,
//   greet(name: string) {
//     console.log("Hello ", name);
//   },
// };

let user1: Greetable;

user1 = new Person1("Venkat", 36);

user1.greet("Mohan");

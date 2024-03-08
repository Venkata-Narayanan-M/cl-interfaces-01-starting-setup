interface Greetable {
  name: string;

  greet(name: string): void;
}

class Person implements Greetable {
  name: string = "default";
  age: number = 35;
  greet(name: string): void {
    console.log("Hello ", name, " you are ", this.age);
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

let user1 = new Person();

user1.greet("venkat");

// const names: Array<string | number> = ["venkat", "mohan", 1];

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("this is done");
//     return;
//   }, 1000);
//   setTimeout(() => {
//     reject("this is done");
//     return;
//   }, 2000);
// });

// promise.then((data) => {
//   data.split("");
// });

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// console.log(merge({ name: "venkat" }, { age: 35 }));

const mergedObj = merge({ name: "venkat", hobbies: ["youtube"] }, { age: 30 });

console.log(mergedObj.hobbies[0]);

interface Lengthy {
  length: number;
}

//mergedObj.name; Error - TS doesn't know if name exists in the object
function countAndDescribe<T extends Lengthy>(element: T) {
  let desc = "got no value";
  if (element.length === 1) {
    desc = "Got 1 element";
  } else if (element.length > 1) {
    desc = "got " + element.length + " elements.";
  }
  return [element, desc];
}

console.log(countAndDescribe("Hi there"));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

extractAndConvert({ name: "venkat" }, "name");

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item));
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Venkat");
textStorage.addItem("Mohan");
textStorage.addItem("apple");
console.log(textStorage.getItems());
textStorage.removeItem("apple");
console.log(textStorage.getItems());

const numStorage = new DataStorage<number>();
numStorage.addItem(10);
numStorage.addItem(20);
numStorage.addItem(30);
console.log(numStorage.getItems());
numStorage.removeItem(30);
console.log(numStorage.getItems());

interface CourseGoal {
  title: string;
  desc: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, desc: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.desc = desc;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ["venkat", "mohan"];

type Persons = {
  name: string;
  city: string;
  character: string;
};

const obj1: Partial<Persons> = { name: "venkat", city: "chennai" };
obj1.character = "good";

console.log("obj1 => ", obj1);

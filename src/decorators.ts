function Logger(logString: string) {
  return function (target: Function) {
    console.log(logString);
    console.log(target);
  };
}

function WithTemplate(template: string, hookID: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    constructor: T
  ) {
    return class extends constructor {
      constructor(..._: any[]) {
        super();
        console.log("rendering template  ");
        const hookEl = document.getElementById(hookID);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@Logger("Logging - Person")
@WithTemplate("<h1>my first person class</h1> ", "app")
class Person {
  name: string = "venkat";

  constructor() {
    console.log("creating person object originally");
  }
}

const person = new Person();

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log({ target, propertyName, max: target.getMaxPrice() });
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log({ target, name, descriptor });
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log({ target, name, descriptor });
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator");
  console.log({ target, name, position });
}

class Product {
  @Log
  title: string = "new_prod";
  @Log
  private _price: number = 0;

  get price() {
    return this._price;
  }

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("invalid price");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }

  getMaxPrice() {
    return this._price * 2;
  }
}

const p1 = new Product("book1", 10);
const p2 = new Product("book2", 20);

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      console.log("this", this);
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "Clicked now!!";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

class Printer2 {
  message = "Clicked second time!!";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const print1 = new Printer();
const print2 = new Printer2();

const button = document.querySelector("button")!;

button.addEventListener("click", print1.showMessage);
button.addEventListener("click", print2.showMessage);

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; //['required', 'positive'] ex.
  };
}

const registeredValidator: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidator[target.constructor.name] = {
    ...registeredValidator[target.constructor.name],
    [propName]: [
      ...(registeredValidator[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidator[target.constructor.name] = {
    ...registeredValidator[target.constructor.name],
    [propName]: [
      ...(registeredValidator[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidator[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;

  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    throw new Error("Invalid Input");
  }
  console.log(createdCourse);
});

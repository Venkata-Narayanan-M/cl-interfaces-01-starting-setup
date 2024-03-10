type Admin = {
  name: string;
  privileges: string[];
  dob?: Date;
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; //intersection types are like interface extension

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

let a: Universal = 10;

//Type guard examples
function addFn(a: number, b: number): number;
function addFn(a: string, b: string): string;
function addFn(a: number, b: string): string;
function addFn(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = addFn(1, "5");
result.toUpperCase();

type UnknownEmployee = Employee | Admin;

let unknown1: UnknownEmployee = {
  name: "venkat",
  startDate: new Date(),
  privileges: ["admin"],
};

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) console.log("Start Date: " + emp.startDate);
}

printEmployeeInformation(unknown1);

//Type guard in classes

class Car {
  drive() {
    console.log("driving a car");
  }
}

class Truck {
  drive() {
    console.log("driving a truck");
  }

  loadCargo() {
    console.log("loading cargo");
  }
}

type Vehicle = Car | Truck;

let v1 = new Car();
let v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  //   if ("loadCargo" in vehicle) vehicle.loadCargo(); this also works
  if (vehicle instanceof Truck) {
    vehicle.loadCargo();
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

//Type casting in TS

//const paragraph = <HTMLInputElement>document.getElementById("div1")!;
//const paragraph = document.getElementById("div1") as HTMLInputElement - if we write like this, we say TS that the element cannot be null

const paragraph = document.getElementById("div1");

if (paragraph) {
  (paragraph as HTMLInputElement).value = "hi there";
}

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "not an email",
  username: "must start with a capital letter",
};

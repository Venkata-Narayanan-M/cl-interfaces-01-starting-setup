abstract class Department {
  //   private name: string;
  protected employees: string[] = [];
  static totalEmployees: number = 0;

  constructor(protected readonly name: string) {
    // this.name = n;
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
    Department.totalEmployees += 1;
  }

  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id);
    this.admins = admins;
  }

  describe() {
    console.log("This is from IT Implementation => ", this.name);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  get getLastReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No Report found !!!");
  }

  set setLastReport(text: string) {
    if (!text) throw new Error("Value is mandatory!!");
    this.addReport(text);
  }

  constructor(id: string, private reports: string[]) {
    super(id);
    this.lastReport = reports[0];
  }

  describe() {
    console.log("this is from accounting override => ", this.name);
  }

  addEmployee(name: string) {
    if (name === "venkat") {
      return;
    }
    Department.totalEmployees += 1;
    this.employees.push(name);
  }

  addReport(text: string) {
    this.lastReport = text;
    this.reports.push(text);
  }

  printReports() {
    console.log("all reports => ", this.reports);
    console.log("last report => ", this.lastReport);
  }
}

const accounting = new AccountingDepartment("Accounting", ["report 1"]);

accounting.addEmployee("venkat");
accounting.addEmployee("mohan");
console.log("total employees => ", Department.totalEmployees);
console.log("last report => ", accounting.getLastReport);
accounting.describe();
accounting.printEmployeeInfo();
accounting.addReport("this is second report");
accounting.printReports();
accounting.setLastReport = "saving a last report";
console.log("last report => ", accounting.getLastReport);

// const accountingCopy = { name: "IT", describe: accounting.describe };

// accountingCopy.describe();

const itDepartment = new ITDepartment("ITD", ["prakash"]);
itDepartment.addEmployee("venkat");
itDepartment.describe();

console.log(Math.abs(-10));

const employee1 = Department.createEmployee("Gayathri");
console.log(employee1);

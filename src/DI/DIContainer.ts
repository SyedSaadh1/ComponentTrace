export class DI {
  static destroy() {
    this.context.resolvedInstances = {};
  }
  private static context: DI;
  private resolvedInstances: { [key: string]: any };
  private resolvedPermanentInstances: { [key: string]: any };
  private permanentClasses!: ["DBConnection"];
  private constructor() {
    this.resolvedInstances = {};
    this.resolvedPermanentInstances = {};
  }
  static get<T>(className: any, ...params: any): T {
    if (this.context === undefined || this.context === null) {
      this.context = new DI();
    }
    if (this.context.permanentClasses.indexOf(className) > -1) {
      if (
        this.context.resolvedPermanentInstances[className.name] === undefined ||
        this.context.resolvedPermanentInstances[className] === null
      ) {
        this.context.resolvedPermanentInstances[className] = new className(
          ...params
        );
      }
      return this.context.resolvedPermanentInstances[className];
    } else {
      if (
        this.context.resolvedInstances[className] === undefined ||
        this.context.resolvedInstances[className] === null
      ) {
        this.context.resolvedInstances[className] = new className(...params);
      }
      return this.context.resolvedInstances[className];
    }
  }
}

import session from "express-session";
export class DI {
  static destroy() {
    this.context.resolvedInstances = {};
  }

  private static context: DI;

  private resolvedInstances: { [key: string]: any };
  private resolvedPerminantInstances: { [key: string]: any };
  private perminantClasses = ["DBConnection"];

  private constructor() {
    this.resolvedInstances = {};
    this.resolvedPerminantInstances = {};
  }

  static get<T>(className: any, ...params: any): T {
    if (this.context === undefined || this.context === null) {
      this.context = new DI();
    }
    if (this.context.perminantClasses.indexOf(className.name) > -1) {
      if (
        this.context.resolvedPerminantInstances[className.name] === undefined ||
        this.context.resolvedPerminantInstances[className.name] === null
      ) {
        this.context.resolvedPerminantInstances[className.name] = new className(
          ...params
        );
      }
      return this.context.resolvedPerminantInstances[className.name];
    } else {
      if (
        this.context.resolvedInstances[className.name] === undefined ||
        this.context.resolvedInstances[className.name] === null
      )
        if (className === session) {
          this.context.resolvedInstances[className.name] = className({
            secret: "my_secret_key",
            resave: false,
            saveUninitialized: true,
          });
        } else {
          this.context.resolvedInstances[className.name] = new className(
            ...params
          );
        }
      return this.context.resolvedInstances[className.name];
    }
  }
}

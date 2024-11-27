import { Request } from "express";
import jwt_decode from "jwt-decode";

export class SecurityContext {
  constructor() {}
  session(req: Request): UserSession | undefined {
    try {
      let realm = req.realm;
      let sessionData = req["kauth"];
      if (!!sessionData && sessionData["grant"]) {
        let username =
          sessionData["grant"]["access_token"]["content"]["preferred_username"];

        return new UserSession(username, realm);
      } else if (req.headers["authorization"]) {
        try {
          const token = req.headers["authorization"].split(" ")[1];
          const decoded: any = jwt_decode(token);
          const username = decoded.preferred_username;
          const realm = decoded.realm;
          return new UserSession(username, realm);
        } catch (error) {
          console.log("Error in security context" + error);
          return undefined;
        }
      }
    } catch (error) {
      console.log("Error in security context" + error);
      return undefined;
    }
    return new UserSession("miway", "Mayora");
  }
}

export class UserSession {
  private userName: string;
  private realm: string;

  constructor(userName: string, realm: string) {
    this.userName = userName;
    this.realm = realm;
  }

  getUsername(): string {
    return this.userName;
  }

  getRealm(): string {
    return this.realm;
  }
}

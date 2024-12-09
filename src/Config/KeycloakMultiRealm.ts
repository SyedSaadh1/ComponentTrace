import { DI } from "../DI/DIContainer";
import { Request, Response, NextFunction } from "express";
import MemoryStore, { Store } from "express-session";
import dotenv from "dotenv";
// import keycloak from "keycloak-connect";
// const composable = require("composable-middleware");
// import jwt_decode from "jwt-decode";

const keycloak = require("keycloak-connect");
const composable = require("composable-middleware");
const jwt_decode = require("jwt-decode");

dotenv.config();

const Admin = require("keycloak-connect/middleware/admin");
const Logout = require("keycloak-connect/middleware/logout");
const PostAuth = require("keycloak-connect/middleware/post-auth");
const GrantAttacher = require("keycloak-connect/middleware/grant-attacher");
const Protect = require("keycloak-connect/middleware/protect");
const KC_Map = new Map();
console.log("starting :", KC_Map);
const defaultOptions = {
  admin: "/",
  logout: "/logout",
};
const memoryStore = DI.get(MemoryStore);

export class KeycloakMultiRealm {
  private config: any;
  private keycloakConfig: any;
  constructor() {}
  configuration(config: any, keycloakConfig: any) {
    if (!config || !keycloakConfig) {
      throw new Error(
        "Either Adapter configuration is not provided  or Keycloak Configuration is not provided..!!"
      );
    }
    this.config = config;
    this.keycloakConfig = keycloakConfig;
  }
  protect(spec?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log("In protect");

        const realm = await this.getRealmName(req);
        console.log("Realme is :" + realm);
        if (!realm) {
          return await this.accessDenied(req, res);
        }

        const keycloakObject = await this.getKeycloakObjectForRealm(realm);
        console.log("keycloakObject in protect ", keycloakObject);

        await Protect(keycloakObject, spec)(req, res, next);
      } catch (e) {
        next(e);
      }
    };
  }
  configure() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        let realmId = await this.getRealmName(req);
        if (!realmId) {
          next();
        } else {
          this.config = { store: memoryStore };
          this.keycloakConfig = {
            realm: realmId,
            "bearer-only": true,
            "auth-server-url": process.env.KC_HOST,
            "ssl-required": "all",
            resource: process.env.KC_CLIENT_ID,
            "confidential-port": 0,
          };
          req.realm = realmId;
          next();
        }
      } catch (error) {
        console.log("Error in configure");
        next(error);
      }
    };
  }
  middleware(customOptions?: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const options = Object.assign({}, defaultOptions, customOptions);
        const realm = await this.getRealmName(req);
        if (!realm) {
          next();
        } else {
          req.kauth = { realm };
          const keycloakObject = await this.getKeycloakObjectForRealm(realm);
          const middleware = await composable(
            PostAuth(keycloakObject),
            Admin(keycloakObject, options.admin),
            GrantAttacher(keycloakObject),
            Logout(keycloakObject, options.logout)
          );
          await middleware(req, res, next);
        }
      } catch (error) {
        next(error);
      }
    };
  }
  getRealmName(req: Request) {
    return new Promise(async (resolve, reject) => {
      try {
        const token: any = req.headers["authorization"]?.split(" ")[1];
        const decode: any = jwt_decode(token);
        const realmId = decode["iss"].split("/").pop();
        return resolve(realmId);
      } catch (error) {
        console.log("No relam");
        return resolve(null);
      }
    });
  }
  getKeycloakObjectForRealm(realmId: any) {
    let keycloakObject = KC_Map.get(realmId);
    if (keycloakObject) {
      console.log("returned kco : " + keycloakObject);
      return keycloakObject;
    }
    const keycloakConfig = Object.assign({}, this.keycloakConfig, { realmId });
    keycloakObject = new keycloak(this.config, keycloakConfig);
    keycloakObject.accessDenied = this.accessDenied;
    KC_Map.set(realmId, keycloakObject);
    console.log("keycloak object : " + keycloakObject);
    return keycloakObject;
  }
  accessDenied(req: Request, res: Response) {
    res.status(403).send("Access Denied");
  }
}
// export default new KeycloakMultiRealm();

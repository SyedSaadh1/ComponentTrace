import { DI } from "../DI/DIContainer";
import { Request, Response, NextFunction } from "express";
import MemoryStore from "express-session";

const Keycloak = require("keycloak-connect");
const composable = require("composable-middleware");
const jwt_decode = require("jwt-decode");

const Admin = require("keycloak-connect/middleware/admin");
const Logout = require("keycloak-connect/middleware/logout");
const PostAuth = require("keycloak-connect/middleware/post-auth");
const GrantAttacher = require("keycloak-connect/middleware/grant-attacher");
const Protect = require("keycloak-connect/middleware/protect");
const KC_Map = new Map();
const defaultOptions = {
  admin: "/",
  logout: "/logout",
};
const memoryStore = DI.get(MemoryStore);

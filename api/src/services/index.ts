import { NextFunction, Request, Response } from "express";
import env from "../infra/env";
import { Route } from "../utils";
import ThreatService from "./threats/ThreatService";
import AuthService from "./auth/AuthService";

const request = require("request-promise-native");

export let item: any = null;
export let auth: any = null;

// server

try {
  auth = new AuthService();
  item = new ThreatService();
} catch (e) {
  console.error(e);
}

export const getRoutes = (): any => {
  const authRoutes: Route[] = auth.getRoutes();
  const itemsRoutes: Route[] = item.getRoutes();

  return [
    ...authRoutes,
    ...itemsRoutes,
  ];
};

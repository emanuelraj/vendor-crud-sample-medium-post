import { NextFunction, Request, Response } from "express";
import env from "../infra/env";
import { Route } from "../utils";
import ThreatService from "./threats/ThreatService";
const request = require("request-promise-native");

export let item: any = null;

// server

try {
  item = new ThreatService();
} catch (e) {
  console.error(e);
}

export const getRoutes = (): any => {
  const itemsRoutes: Route[] = item.getRoutes();

  return [
    ...itemsRoutes,
  ];
};

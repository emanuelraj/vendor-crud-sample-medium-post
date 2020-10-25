// Item service handles the logic of the list application
import { Request, Response } from "express";
import _ from "lodash";
import Threat from "../../models/Threat";
import { Route } from "../../utils";

import { uuid } from "uuidv4";

export default class ThreatService {
  
  public threats: Threat[] = [];
  
  constructor() {
    console.log(`initializing ${this.constructor.name}...`);
  }

  public getRoutes() {
    return [
      new Route("/api/threats", "post", [
        async (req: Request, res: Response) => {
          try {
            const threat = new Threat(uuid(), '', '', 0, 0);
            this.threats.push(threat);
            res.status(200).json({
              threat
            });
          } catch (e) {
            console.log("error", e);
            res.status(503).json({ message: e });
          }
        }
      ]),
      new Route("/api/threats", "get", [
        async (req: Request, res: Response) => {
          try {
            res.status(200).json({
              threats: this.threats
            });
          } catch (e) {
            console.log("error", e);
            res.status(503).json({ message: e });
          }
        }
      ]),
      new Route("/api/threats/:id", "get", [
        async (req: Request, res: Response) => {
          try {
            const id = req.params.id;
            const threat = this.threats.find((threat) => threat.id === id);
            if (threat) {
              res.status(200).json({
                threat
            });
          } else {
            res.status(404).json({ message: "list not found." });
          }
          } catch (e) {
            console.log("error", e);
            res.status(503).json({ message: e });
          }
        }
      ]),
      new Route("/api/threats/:id", "delete", [
        async (req: Request, res: Response) => {
          try {
            const id = req.params.id;
            const threat = this.threats.find((threat) => threat.id === id);
            if (threat) {
                _.remove(this.threats, { id })
                res.status(200).json({ message: "deleted" });
            }
            res.status(404).json({ message: "threat not found." });
          } catch (e) {
            console.log("error", e);
            res.status(503).json({ message: e });
          }
        }
      ]),
      new Route("/api/threats/:id", "put", [
        async (req: Request, res: Response) => {
        }
      ]),
    ];
  }
}

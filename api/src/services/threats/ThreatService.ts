// Item service handles the logic of the list application
import { Request, Response } from "express";
import _ from "lodash";
import Threat from "../../models/Threat";
import { Route } from "../../utils";

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
            const {title, classification, impact, likelihood} = req.body
            const threat = new Threat(title, classification, impact, likelihood);
            this.threats.push(threat);
            res.status(200).json({
              ...threat,
              risk: threat.risk
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
            const skip = ((req.headers as any).current - 1) * (req.headers as any).pagesize;
            const take = +(req.headers as any).pagesize;
            const data = _.slice(this.threats, skip, skip + take);
            res.status(200).json({
              threats: data.map((threat)=>{return{
                ...threat,
                risk: threat.risk
              }}),
              total: this.threats.length
            });
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
          try {
            const id = req.params.id;
            const {title, classification, impact, likelihood} = req.body
            const index = _.findIndex(this.threats, {id});
            const newThreat = this.threats[index];
            newThreat.title  = title;
            newThreat.classification  = classification;
            newThreat.impact  = impact;
            newThreat.likelihood  = likelihood;
            this.threats.splice(index, 1, newThreat);
            res.status(200).json({
              ...newThreat,
              risk: newThreat.risk
            });
          } catch (e) {
            console.log("error", e);
            res.status(503).json({ message: e });
          }
        }
      ]),
    ];
  }
}

import level from './level';

export default class Threat {
  public id: string;
  public title: string;
  public classification: string;
  public impact: number;
  public likelihood: number;

  constructor(id: string, title: string, classification: string, impact: number = 0, likelihood: number = 0) {
    this.id = id;
    this.title = title;
    this.classification = classification;
    this.impact = impact;
    this.likelihood = likelihood;
  }

  get risk() {
    return (level as any)[Math.floor((this.impact+this.likelihood)/2)]
  }
}

import { singleton } from "tsyringe";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@singleton()
export class NetworkService {
  constructor() { } 
}

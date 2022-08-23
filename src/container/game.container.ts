import { GameObjects } from "phaser"; 
import { autoInjectable } from "tsyringe";  
import { SceneService } from "../services/scene.service"; 

@autoInjectable()
export class GameContainer extends GameObjects.Container { 

  public constructor( 
    sceneService?: SceneService,   
  ) {
    super(sceneService!.currentScene, 0, 0); 
  
  }
}

import { GameObjects, Scene } from "phaser"; 
import { Scenes } from "src/game.config";
import { SceneService } from "src/services/scene.service";
import { autoInjectable, instanceCachingFactory } from "tsyringe";  
import { NetworkService } from "../services/network.service"; 
 
@autoInjectable()
export class GameScene extends Scene {  
  
  public constructor(
    public sceneService: SceneService, 
    public networkService: NetworkService, 
  ) {
    super(Scenes.GameScene);
  }

  preload(): void {
    this.sceneService.setCurrentScene(this); 
  }

  create(): void { 

    this.input.on(
      Phaser.Input.Events.POINTER_DOWN,
      () => {
        console.log("pointer down")
      },
      this
    );
 
  } 
 
}

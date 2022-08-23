import { GameObjects } from "phaser";
import { GameConfig } from "src/game.config";
import { autoInjectable } from "tsyringe"; 
import { SceneService } from "../services/scene.service";

@autoInjectable()
export class Player extends GameObjects.Sprite {

    health: number = GameConfig.playerHealth; 

    public constructor(
        sceneService?: SceneService,
    ) {
        super(sceneService!.currentScene, 0, 0, "gamePlayer");

    }


    public moveTo(x: number, y: number) {

    }
}

import { Sequelize } from "sequelize";

/**
 * Abstract util class structure to handle Model/Relation related operations
 */
export abstract class ModelCreator {
  public abstract init(sequelize: Sequelize): void;

  public setRelations():void {}

  public abstract sync(): void;
}

import { Sequelize } from "sequelize";

export abstract class ModelCreator {
  public abstract init(sequelize: Sequelize): void;

  public setRelations() {}

  public abstract sync(): void;
}

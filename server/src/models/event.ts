import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface EventAttributes {
  id: number;
  date: string;
  location: string;
  moon_phase: string;
  userId: number;
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: number;
  public date!: string;
  public location!: string;
  public moon_phase!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function EventFactory(sequelize: Sequelize): typeof Event {
  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      moon_phase: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {//need to come back and finsh this
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {
      tableName: 'events',
      sequelize
    }
  );

  return Event;
}
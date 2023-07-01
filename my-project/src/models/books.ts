import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsToMany,
} from "sequelize-typescript";
import { User } from "./user";

@Table({
  timestamps: false,
  tableName: "books",
})
export class Book extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  isbn!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId!: string;
  //todo
  //@BelongsToMany(()=>Book , rentedBooks)
}

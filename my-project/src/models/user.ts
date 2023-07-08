import { Model, Column, DataType, Table, HasMany } from "sequelize-typescript";
import { Book } from "./books";
@Table({
  timestamps: false,
  tableName: "users",
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      },
    },
  })
  email!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  books_id!: string;
  @HasMany(() => Book)
  books!: Book[];
}

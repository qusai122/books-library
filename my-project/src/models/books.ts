import { Table, Model, Column, DataType } from "sequelize-typescript";

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
}

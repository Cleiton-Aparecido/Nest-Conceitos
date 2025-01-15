import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  idusers: number;

  @Column({
    length: 83,
  })
  name: string;

  @Column({
    length: 127,
    unique: true,
  })
  email: string;

  @Column({
    length: 127,
  })
  password: string;

  @Column({
    type: "date",
    nullable: true,
  })
  dataNascimento: Date;

  @CreateDateColumn()
  createadAat: Date;

  @UpdateDateColumn()
  updateadAt: Date;

  @Column()
  role: number;
}

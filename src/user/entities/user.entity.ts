import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash } from "bcryptjs";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password: string;

    @BeforeInsert()
  	@BeforeUpdate()
    	async hashPassword() {
   		if (!this.password) {
   			return;
   		}
   		this.password = await hash(this.password, 10);
  	}
}

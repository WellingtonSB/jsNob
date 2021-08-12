import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm";
import { Product } from './Product';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    description: string;

    @OneToMany(type => Product, prod => prod.cat) // note: we will create author property in the Photo class below
    prod: Product[];
}

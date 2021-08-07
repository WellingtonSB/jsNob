import { Category } from './Category';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;
    
    @Column()
    description: string;

    @ManyToOne(type => Category, cat => cat.prod)
    cat: Category;
}

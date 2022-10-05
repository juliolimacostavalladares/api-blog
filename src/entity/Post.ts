import { Category } from './Category';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { type } from 'os';

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    post: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    mainImage: string;

    @Column('varchar', { array: true })
    images: string[];

    @ManyToOne(() => Category, (category: Category) => category.posts, { eager: true })
    category: Category

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

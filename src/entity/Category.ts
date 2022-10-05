import { Post } from './Post';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @Column()
    imageCategory: string;

    @OneToMany(() => Post, (posts: Post) => posts.category)
    posts: [Post]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

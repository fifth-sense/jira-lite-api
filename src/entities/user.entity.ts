import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity.js";
import type { Relation } from 'typeorm';


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid') id!: string;

    @Column() name!: string;

    @Column({unique: true}) email!: string;

    @Column({name: 'password_hash', select: false}) passwordHash!: string;

    @CreateDateColumn({name: 'created_at'}) createdAt!: Date;

    @OneToMany(() => Project, (p) => p.owner) ownedProjects!: Relation<Project[]>;
}

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm/browser";
import type { Relation } from 'typeorm';
import { User } from "./user.entity.js";
import { Issue } from "./issue.entity.js";

export enum ProjectStatus {ACTIVE = 'ACTIVE', ARCHIVED = 'ARCHIVED' }

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn('uuid') id!: string;

    @Column({type: 'varchar', length: 10, unique: true}) key!: string;

    @Column() name!: string;

    @Column({type: 'text', nullable: true}) description!: string | null;

    @Column({name: 'owner_id', type: 'uuid'}) owner_id!: string;
    @ManyToOne(()=> User, (u)=> u.ownedProjects, {nullable: false})
    @JoinColumn({name: 'owner_id'})
    owner!: Relation<User>

    @Column({type: 'enum', enum: ProjectStatus, default: ProjectStatus.ACTIVE})
    status!: ProjectStatus;

    @CreateDateColumn({name: 'deleted_at'}) deletedAt!: Date | null;

    @OneToMany(()=> Issue, (i) => i.project) issues!: Relation<Issue[]>
}
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Project } from "./project.entity.js";
import { JoinColumn } from "typeorm/browser";
import { User } from "./user.entity.js";
import type { Relation } from 'typeorm';

export enum MemebrRole { ADMIN = 'ADMIN', MEMBER = 'MEMBER' }

@Entity('project_members')
export class ProjectMember {
    @PrimaryColumn({ name: 'project_id', type: 'uuid'}) project_id!: string;
    @PrimaryColumn({ name: 'user_id', type: 'uuid'}) userId!: string;

    @ManyToOne(() => Project, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'project_id'})
    project!: Relation<Project>;

    @ManyToOne(() => User, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'user_id' })
    user!: Relation<User>;

    @Column({ type: 'enum', enum: MemebrRole, default: MemebrRole.MEMBER})
    role!: MemebrRole;
}
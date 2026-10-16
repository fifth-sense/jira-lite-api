import {
  Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne,
  OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Project } from './project.entity.js';
import { User } from './user.entity.js';
import { Comment } from './comment.entity.js'

export enum IssueStatus { TODO = 'TODO', IN_PROGRESS = 'IN_PROGRESS', DONE = 'DONE' }
export enum IssuePriority { LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH' }

@Entity('issues')
@Unique(['projectId', 'number'])   // PROJ-123: the number is unique within a project
@Index(['projectId', 'status'])    // board view: issues in a project, grouped by status
export class Issue {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column({ name: 'project_id', type: 'uuid' }) projectId!: string;
  @ManyToOne(() => Project, (p) => p.issues, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project!: Relation<Project>;

  @Column({ type: 'int' }) number!: number;

  @Column() title!: string;

  @Column({ type: 'text', nullable: true }) description!: string | null;

  @Column({ type: 'enum', enum: IssueStatus, default: IssueStatus.TODO })
  status!: IssueStatus;

  @Column({ type: 'enum', enum: IssuePriority, default: IssuePriority.MEDIUM })
  priority!: IssuePriority;

  @Column({ name: 'reporter_id', type: 'uuid' }) reporterId!: string;
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'reporter_id' })
  reporter!: Relation<User>;

  @Index() // "assigned to me" queries
  @Column({ name: 'assignee_id', type: 'uuid', nullable: true }) assigneeId!: string | null;
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' }) // if the user is deleted, unassign
  @JoinColumn({ name: 'assignee_id' })
  assignee!: Relation<User> | null;

  @CreateDateColumn({ name: 'created_at' }) createdAt!: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt!: Date;

  @OneToMany(() => Comment, (c) => c.issue) comments!: Relation<Comment[]>;
}
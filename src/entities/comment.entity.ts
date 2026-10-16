import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Issue } from './issue.entity.js';
import { User } from './user.entity.js';
import type { Relation } from 'typeorm';


@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Index() // "all comments for this issue"

  @Column({ name: 'issue_id', type: 'uuid' }) issueId!: string;

  @ManyToOne(() => Issue, (i) => i.comments, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'issue_id' })
  issue!: Relation<Issue>;

  @Column({ name: 'author_id', type: 'uuid' }) authorId!: string;
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'author_id' })
  author!: Relation<User>;

  @Column({ type: 'text' }) body!: string;

  @CreateDateColumn({ name: 'created_at' }) createdAt!: Date;
}
import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1792147847197 implements MigrationInterface {
    name = 'InitSchema1792147847197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."projects_status_enum" AS ENUM('ACTIVE', 'ARCHIVED')`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying(10) NOT NULL, "name" character varying NOT NULL, "description" text, "owner_id" uuid NOT NULL, "status" "public"."projects_status_enum" NOT NULL DEFAULT 'ACTIVE', "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_63e67599567b2126cfef14e1474" UNIQUE ("key"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."issues_status_enum" AS ENUM('TODO', 'IN_PROGRESS', 'DONE')`);
        await queryRunner.query(`CREATE TYPE "public"."issues_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH')`);
        await queryRunner.query(`CREATE TABLE "issues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project_id" uuid NOT NULL, "number" integer NOT NULL, "title" character varying NOT NULL, "description" text, "status" "public"."issues_status_enum" NOT NULL DEFAULT 'TODO', "priority" "public"."issues_priority_enum" NOT NULL DEFAULT 'MEDIUM', "reporter_id" uuid NOT NULL, "assignee_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6c3df1ac7d82a388d1ca2276a3f" UNIQUE ("project_id", "number"), CONSTRAINT "PK_9d8ecbbeff46229c700f0449257" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7da282c871a9b6497da2cecf86" ON "issues"  ("assignee_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c0b510858defdaa38d6f5ff72e" ON "issues"  ("project_id", "status") `);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "issue_id" uuid NOT NULL, "author_id" uuid NOT NULL, "body" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4ce924bcd63bee0fccc7fe1d8f" ON "comments"  ("issue_id") `);
        await queryRunner.query(`CREATE TYPE "public"."project_members_role_enum" AS ENUM('ADMIN', 'MEMBER')`);
        await queryRunner.query(`CREATE TABLE "project_members" ("project_id" uuid NOT NULL, "user_id" uuid NOT NULL, "role" "public"."project_members_role_enum" NOT NULL DEFAULT 'MEMBER', CONSTRAINT "PK_b3f491d3a3f986106d281d8eb4b" PRIMARY KEY ("project_id", "user_id"))`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_b1bd2fbf5d0ef67319c91acb5cf" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issues" ADD CONSTRAINT "FK_11f35e8296e10c229e7b68c68d4" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issues" ADD CONSTRAINT "FK_394a6ced54c634dfadea1618d2a" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issues" ADD CONSTRAINT "FK_7da282c871a9b6497da2cecf869" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4ce924bcd63bee0fccc7fe1d8f6" FOREIGN KEY ("issue_id") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e6d38899c31997c45d128a8973b" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_members" ADD CONSTRAINT "FK_b5729113570c20c7e214cf3f58d" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_members" ADD CONSTRAINT "FK_e89aae80e010c2faa72e6a49ce8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_e89aae80e010c2faa72e6a49ce8"`);
        await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_b5729113570c20c7e214cf3f58d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e6d38899c31997c45d128a8973b"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4ce924bcd63bee0fccc7fe1d8f6"`);
        await queryRunner.query(`ALTER TABLE "issues" DROP CONSTRAINT "FK_7da282c871a9b6497da2cecf869"`);
        await queryRunner.query(`ALTER TABLE "issues" DROP CONSTRAINT "FK_394a6ced54c634dfadea1618d2a"`);
        await queryRunner.query(`ALTER TABLE "issues" DROP CONSTRAINT "FK_11f35e8296e10c229e7b68c68d4"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_b1bd2fbf5d0ef67319c91acb5cf"`);
        await queryRunner.query(`DROP TABLE "project_members"`);
        await queryRunner.query(`DROP TYPE "public"."project_members_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ce924bcd63bee0fccc7fe1d8f"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c0b510858defdaa38d6f5ff72e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7da282c871a9b6497da2cecf86"`);
        await queryRunner.query(`DROP TABLE "issues"`);
        await queryRunner.query(`DROP TYPE "public"."issues_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."issues_status_enum"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TYPE "public"."projects_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

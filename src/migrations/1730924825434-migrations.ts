import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730924825434 implements MigrationInterface {
  name = 'Migrations1730924825434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "phone" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "alarm" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "time" TIME NOT NULL, "days" text, "name" character varying, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_ea806c911b4b0617f2e306094e7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "alarm"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1731599994504 implements MigrationInterface {
    name = 'Migrations1731599994504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "authCode" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastAuthAttemptTime" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastAuthAttemptTime"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "authCode"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class addImageCategoryToCategoryTable1653463245946 implements MigrationInterface {
    name = 'addImageCategoryToCategoryTable1653463245946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "post" character varying NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "mainImage" character varying NOT NULL, "images" character varying array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "category" character varying NOT NULL, "imageCategory" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_1077d47e0112cad3c16bbcea6cd" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_1077d47e0112cad3c16bbcea6cd"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}

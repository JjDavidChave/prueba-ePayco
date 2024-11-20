import { MigrationInterface, QueryRunner } from "typeorm";

export class Transaction1732051928892 implements MigrationInterface {
    name = 'Transaction1732051928892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."transaction_type_enum" NOT NULL, "amount" numeric(10,2) NOT NULL, "session_id" character varying, "token" character varying, "status" "public"."transaction_status_enum" NOT NULL DEFAULT 'PENDING', "wallet_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}

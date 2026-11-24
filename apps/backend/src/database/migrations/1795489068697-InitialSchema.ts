import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1795489068697 implements MigrationInterface {
    name = 'InitialSchema1795489068697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(80) NOT NULL, "display_name" character varying(120) NOT NULL, "password_hash" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "last_heartbeat_at" TIMESTAMP WITH TIME ZONE NOT NULL, "revoked_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."auth_events_event_type_enum" AS ENUM('LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGOUT', 'SESSION_EXPIRED', 'USER_CREATED')`);
        await queryRunner.query(`CREATE TABLE "auth_events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_type" "public"."auth_events_event_type_enum" NOT NULL, "attempted_login" character varying(80), "occurred_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actor_user_id" uuid, "target_user_id" uuid, "session_id" uuid, CONSTRAINT "PK_ab929cc6084ffb3fd795bd983c0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth_events" ADD CONSTRAINT "FK_bfa604bb761cbfdb104cf0b1fa3" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth_events" ADD CONSTRAINT "FK_7ffa4ab46f85033ed7b5629540b" FOREIGN KEY ("target_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth_events" ADD CONSTRAINT "FK_cac31ef1ae7871c905a3842df47" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_events" DROP CONSTRAINT "FK_cac31ef1ae7871c905a3842df47"`);
        await queryRunner.query(`ALTER TABLE "auth_events" DROP CONSTRAINT "FK_7ffa4ab46f85033ed7b5629540b"`);
        await queryRunner.query(`ALTER TABLE "auth_events" DROP CONSTRAINT "FK_bfa604bb761cbfdb104cf0b1fa3"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`);
        await queryRunner.query(`DROP TABLE "auth_events"`);
        await queryRunner.query(`DROP TYPE "public"."auth_events_event_type_enum"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}

/*
  Warnings:

  - You are about to drop the `Challenge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserChallenge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserChallenge" DROP CONSTRAINT "UserChallenge_challenge_id_fkey";

-- DropForeignKey
ALTER TABLE "UserChallenge" DROP CONSTRAINT "UserChallenge_user_id_fkey";

-- DropTable
DROP TABLE "Challenge";

-- DropTable
DROP TABLE "UserChallenge";

/*
  Warnings:

  - Added the required column `verificationTokenExpiray` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verificationTokenExpiray",
ADD COLUMN     "verificationTokenExpiray" TIMESTAMP(3) NOT NULL;

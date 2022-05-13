/*
  Warnings:

  - You are about to drop the column `userID` on the `Applicant` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Enterprise` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Enterprise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Enterprise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_userID_fkey";

-- DropForeignKey
ALTER TABLE "Enterprise" DROP CONSTRAINT "Enterprise_userID_fkey";

-- DropIndex
DROP INDEX "Applicant_userID_key";

-- DropIndex
DROP INDEX "Enterprise_userID_key";

-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "userID",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Enterprise" DROP COLUMN "userID",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_user_id_key" ON "Applicant"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_user_id_key" ON "Enterprise"("user_id");

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enterprise" ADD CONSTRAINT "Enterprise_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

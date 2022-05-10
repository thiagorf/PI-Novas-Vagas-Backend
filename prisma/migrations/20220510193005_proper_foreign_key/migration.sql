/*
  Warnings:

  - You are about to drop the column `enterprise` on the `Jobs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[enterprise_id]` on the table `Jobs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `enterprise_id` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "enterprise",
ADD COLUMN     "enterprise_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Jobs_enterprise_id_key" ON "Jobs"("enterprise_id");

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "Enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

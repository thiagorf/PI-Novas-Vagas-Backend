/*
  Warnings:

  - The primary key for the `ApplicantForJobs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[applicant_id,jobs_id]` on the table `ApplicantForJobs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ApplicantForJobs" DROP CONSTRAINT "ApplicantForJobs_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ApplicantForJobs_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicantForJobs_applicant_id_jobs_id_key" ON "ApplicantForJobs"("applicant_id", "jobs_id");

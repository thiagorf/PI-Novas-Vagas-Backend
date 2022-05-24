/*
  Warnings:

  - A unique constraint covering the columns `[applicant_id]` on the table `ApplicantForJobs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jobs_id]` on the table `ApplicantForJobs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ApplicantForJobs_applicant_id_jobs_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "ApplicantForJobs_applicant_id_key" ON "ApplicantForJobs"("applicant_id");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicantForJobs_jobs_id_key" ON "ApplicantForJobs"("jobs_id");

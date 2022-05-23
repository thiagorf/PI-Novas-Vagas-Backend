-- CreateTable
CREATE TABLE "ApplicantForJobs" (
    "id" SERIAL NOT NULL,
    "applicant_id" INTEGER NOT NULL,
    "jobs_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicantForJobs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApplicantForJobs" ADD CONSTRAINT "ApplicantForJobs_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicantForJobs" ADD CONSTRAINT "ApplicantForJobs_jobs_id_fkey" FOREIGN KEY ("jobs_id") REFERENCES "Jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

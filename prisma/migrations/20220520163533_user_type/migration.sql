-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('applicant', 'enterprise');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT E'applicant';

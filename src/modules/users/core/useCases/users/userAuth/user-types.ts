import { Applicant, Enterprise, User } from "@prisma/client";

type PrivateUserField = Omit<User, "id" | "password">;

export type AuthApplicant = Applicant & PrivateUserField;
export type AuthEnterprise = Enterprise & PrivateUserField;

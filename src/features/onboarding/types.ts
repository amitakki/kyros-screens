export type SchoolGender = "Boys" | "Girls" | "Co-ed";

export type SchoolExamBoard =
  | "GL Assessment"
  | "CEM"
  | "ISEB"
  | "Kent Test";

export type SchoolRegion = "kent" | "birmingham" | "other";

export type SchoolSortOption = "popular" | "az";

export type ChildProfileForm = {
  fullName: string;
  username: string;
  password: string;
  schoolYear: string;
  region: string;
  profilePhoto: File | null;
};

export interface School {
  id: string;
  name: string;
  location: string;
  gender: SchoolGender;
  examBoard: SchoolExamBoard;
  region: SchoolRegion;
  popular?: boolean;
}

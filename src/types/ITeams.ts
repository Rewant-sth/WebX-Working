export interface TeamMemberResponse {
  success: boolean;
  count: number;
  data: ITeamMember[];
}

export interface ITeamMember {
  _id: string;
  name: string;
  designation: string;
  image: string;
  memberType: "boardmember" | "fieldhero" | string; 
  countryCode: string;
  phoneNumber: string;
  description: string;
  gallery: string[];
  cvImage: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type CitizenProfile = {
  fullName: string
  pan: string
  aadhaar: string
  uan: string
  bankAccount: string
}

export const emptyProfile: CitizenProfile = {
  fullName: "",
  pan: "",
  aadhaar: "",
  uan: "",
  bankAccount: "",
}
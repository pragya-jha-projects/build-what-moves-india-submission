export type Question = {
  id: string
  question: string
  type: "boolean" | "select"
  options?: string[]
}

export type GuidanceItem = {
  id: string
  title: string
  description: string
  type: "success" | "warning" | "info"
}

export type ChecklistItem = {
  id: string
  label: string
}

export const epfoService: {
  id: string
  name: string
  description: string
  officialUrl: string
  questions: Question[]
  checklist: ChecklistItem[]
} = {

  id: "epfo-first-employment",

  name: "EPFO / Provident Fund",

  description:
    "Understand your Provident Fund, UAN and what you may need before getting started.",

  officialUrl: "https://www.epfindia.gov.in/",

  questions: [
    {
      id: "previous-pf",
      question:
        "Have you previously been a member of a Provident Fund?",
      type: "boolean",
    },
    {
      id: "uan",
      question: "Do you already have a UAN?",
      type: "boolean",
    },
    {
      id: "kyc",
      question:
        "Do you have your Aadhaar and PAN details available?",
      type: "boolean",
    },
  ],

  checklist: [
  {
    id: "pan",
    label: "PAN",
  },
  {
    id: "aadhaar",
    label: "Aadhaar",
  },
  {
    id: "bank",
    label: "Bank account details",
  },
  {
    id: "nomination",
    label: "Nomination information",
  },
],

}

export function getEPFOGuidance(
  answers: Record<string, string>,
): GuidanceItem[] {
  const guidance: GuidanceItem[] = []

  if (answers["uan"] === "yes") {
    guidance.push({
      id: "existing-uan",
      title: "Use your existing UAN",
      description:
        "You indicated that you already have a UAN. Keep it available when joining your new employer.",
      type: "success",
    })
  } else {
    guidance.push({
      id: "new-uan",
      title: "You may need a UAN",
      description:
        "You indicated that you do not already have a UAN. Check the applicable EPFO process before proceeding.",
      type: "info",
    })
  }

  if (answers["kyc"] === "yes") {
    guidance.push({
      id: "documents-ready",
      title: "Keep your documents ready",
      description:
        "You indicated that your Aadhaar and PAN details are available.",
      type: "success",
    })
  } else {
    guidance.push({
      id: "documents-needed",
      title: "Check your document availability",
      description:
        "You indicated that you do not currently have both Aadhaar and PAN details available. Check what is required before continuing.",
      type: "warning",
    })
  }

  if (answers["previous-pf"] === "yes") {
    guidance.push({
      id: "previous-pf",
      title: "Check your previous PF membership",
      description:
        "Since you indicated previous PF membership, make sure you use the correct existing employment and UAN information.",
      type: "info",
    })
  }

  return guidance
}
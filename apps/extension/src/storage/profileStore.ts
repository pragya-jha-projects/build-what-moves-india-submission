import type { CitizenProfile } from "@janseva/shared"

const PROFILE_KEY = "janseva_profile"

export async function getProfile(): Promise<CitizenProfile | null> {
  const result = await chrome.storage.session.get(PROFILE_KEY)

  return (result[PROFILE_KEY] as CitizenProfile) ?? null
}

export async function saveProfile(
  profile: CitizenProfile,
): Promise<void> {
  await chrome.storage.session.set({
    [PROFILE_KEY]: profile,
  })
}

export async function clearProfile(): Promise<void> {
  await chrome.storage.session.remove(PROFILE_KEY)
}
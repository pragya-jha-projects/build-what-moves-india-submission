import type { CitizenProfile } from "../data/profile"

const extensionId = import.meta.env.VITE_JANSEVA_EXTENSION_ID ??
  "dopehmeollifihgnpidnjefnnlfhahag"

type ExtensionResponse = {
  success?: boolean
}

/**
 * Sends a saved profile to the installed JanSeva Chrome extension.
 * A missing extension is deliberately non-fatal: the web app still keeps the
 * profile in its own local storage.
 */
export function syncProfileToExtension(
  profile: CitizenProfile,
): Promise<boolean> {
  const runtime = window.chrome?.runtime

  if (!runtime?.sendMessage) {
    return Promise.resolve(false)
  }

  return new Promise((resolve) => {
    try {
      runtime.sendMessage(
        extensionId,
        {
          type: "JANSEVA_PROFILE",
          profile,
        },
        (response) => {
          if (runtime.lastError) {
            resolve(false)
            return
          }

          resolve((response as ExtensionResponse | undefined)?.success === true)
        },
      )
    } catch {
      resolve(false)
    }
  })
}

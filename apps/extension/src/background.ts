async function configureSidePanel() {
  await chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true,
  })
}

chrome.runtime.onInstalled.addListener(() => {
  void configureSidePanel()
})

chrome.runtime.onStartup.addListener(() => {
  void configureSidePanel()
})

chrome.runtime.onMessageExternal.addListener(
  (message, _sender, sendResponse) => {
    if (
      message?.type !== "JANSEVA_PROFILE" ||
      !isCitizenProfile(message.profile)
    ) {
      sendResponse({ success: false })
      return
    }

    chrome.storage.session
      .set({
        janseva_profile: message.profile,
      })
      .then(() => {
        sendResponse({
          success: true,
        })
      })
      .catch((error) => {
        console.error(
          "Failed to save JanSeva profile:",
          error,
        )

        sendResponse({
          success: false,
        })
      })

    return true
  },
)

function isCitizenProfile(profile: unknown): profile is Record<string, string> {
  if (!profile || typeof profile !== "object") return false

  const candidate = profile as Record<string, unknown>
  const fields = ["fullName", "pan", "aadhaar", "uan", "bankAccount"]

  return fields.every((field) => typeof candidate[field] === "string")
}

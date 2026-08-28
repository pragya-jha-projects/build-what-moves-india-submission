interface ChromeRuntime {
  sendMessage: (
    extensionId: string,
    message: unknown,
    callback?: (response: unknown) => void,
  ) => void
  lastError?: {
    message?: string
  }
}

interface ChromeAPI {
  runtime: ChromeRuntime
}

interface Window {
  chrome?: ChromeAPI
}

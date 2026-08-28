import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'

// A public key gives unpacked builds a stable Chrome extension ID. The website
// uses this ID to send saved profiles to the extension.
const extensionKey =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp2ERpe/tirBsW+N7yTwHgZchfZQodHDTYp+ttFxsMVZrRwSIHpOtjPy8j1Z4tT3wfYv6lmex9Q5fh4baMPE3CrruxZCUq4V7DpuUKNKsXmUL0We6D9SP1pTh+FRixsnIo27tX6FOQYVM7wqQCGqPQ8xZKHoZLSYmzHVUk5Fy6pyh27w1MDYeDwxcgYWfRGXrvWfwA4O8OBkdMKmmzcffhyzGtDgO3tNjTGRvt06XLXvRASmvPJvN0TM7c9CvvXq+UI9LH1il9jN19/Z++maNdpsj/wWzsyMnwqKtmL7vE06SiuzAgDX9+TgcF8HF0uneM1gzUBPp8LXldzwIefXtbQIDAQAB'

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '')
  const webOrigin = (
    environment.JANSEVA_WEB_ORIGIN ?? 'http://localhost:5173'
  ).replace(/\/+$/, '')

  return {
  plugins: [
    react(),
    crx({
      manifest: {
  manifest_version: 3,
  key: extensionKey,

  name: 'JanSeva',
  version: '0.1.0',

  description:
    'A citizen-first companion for Indian government services.',

  permissions: [
    'storage',
    'sidePanel'
  ],

      externally_connectable: {
    matches: [
      `${webOrigin}/*`
    ]
  },

  action: {
    default_title: 'Open JanSeva'
  },

  background: {
    service_worker: 'src/background.ts',
    type: 'module'
  },

  side_panel: {
    default_path: 'index.html'
  }
}
    })
  ]
  }
})

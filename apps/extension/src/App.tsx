import { useEffect, useState } from 'react'
import './App.css'

import { getProfile } from './storage/profileStore'

import type { CitizenProfile } from '@janseva/shared'

function App() {
  const [profile, setProfile] = useState<CitizenProfile | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      const existingProfile = await getProfile()

      setProfile(existingProfile)
    }

    loadProfile()

    const handleProfileChange = (
      changes: { janseva_profile?: chrome.storage.StorageChange },
      areaName: string,
    ) => {
      if (areaName !== 'session' || !changes.janseva_profile) return

      setProfile(
        (changes.janseva_profile.newValue as CitizenProfile | undefined) ?? null,
      )
    }

    chrome.storage.onChanged.addListener(handleProfileChange)

    return () => {
      chrome.storage.onChanged.removeListener(handleProfileChange)
    }
  }, [])

  async function copyValue(field: string, value: string) {
    if (!value) return

    await navigator.clipboard.writeText(value)

    setCopiedField(field)

    setTimeout(() => {
      setCopiedField(null)
    }, 1500)
  }

  if (!profile) {
  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="brand-mark">🇮🇳</span>
          <span>JanSeva</span>
        </div>

        <span className="privacy-badge">
          Session only
        </span>
      </header>

      <section className="hero">
        <p className="eyebrow">
          YOUR INFORMATION
        </p>

        <h1>
          Ready when
          <br />
          you need it.
        </h1>

        <p className="subtitle">
          Save your information on the JanSeva
          website and it will appear here when
          you need it.
        </p>
      </section>

      <p className="privacy-note">
        🔒 Your information is stored only for
        this browser session.
      </p>
    </div>
  )
}

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="brand-mark">🇮🇳</span>
          <span>JanSeva</span>
        </div>

        <span className="privacy-badge">
          Session only
        </span>
      </header>

      <section className="hero">
        <p className="eyebrow">YOUR INFORMATION</p>

        <h1>
          Ready when
          <br />
          you need it.
        </h1>

        <p className="subtitle">
          Keep the information you need for
          government forms close at hand.
        </p>
      </section>

      <section className="section">
        <h2>Personal</h2>

        <InfoRow
          label="Full name"
          value={profile.fullName}
          field="fullName"
          copiedField={copiedField}
          onCopy={copyValue}
        />
      </section>

      <section className="section">
        <h2>Identity</h2>

        <InfoRow
          label="PAN"
          value={profile.pan}
          field="pan"
          copiedField={copiedField}
          onCopy={copyValue}
          sensitive
        />

        <InfoRow
          label="Aadhaar"
          value={profile.aadhaar}
          field="aadhaar"
          copiedField={copiedField}
          onCopy={copyValue}
          sensitive
        />
      </section>

      <section className="section">
        <h2>Employment</h2>

        <InfoRow
          label="UAN"
          value={profile.uan}
          field="uan"
          copiedField={copiedField}
          onCopy={copyValue}
          sensitive
        />
      </section>

      <section className="section">
        <h2>Banking</h2>

        <InfoRow
          label="Bank account"
          value={profile.bankAccount}
          field="bankAccount"
          copiedField={copiedField}
          onCopy={copyValue}
          sensitive
        />
      </section>

      <p className="privacy-note">
        🔒 Your information is stored only for this
        browser session.
      </p>
    </div>
  )
}

interface InfoRowProps {
  label: string
  value: string
  field: string
  copiedField: string | null
  onCopy: (field: string, value: string) => void
  sensitive?: boolean
}

function InfoRow({
  label,
  value,
  field,
  copiedField,
  onCopy,
  sensitive = false,
}: InfoRowProps) {
  const displayValue =
    sensitive && value
      ? `•••• •••• ${value.slice(-4)}`
      : value

  const isCopied = copiedField === field

  return (
    <div className="info-row">
      <div className="info-content">
        <span className="info-label">{label}</span>

        <span className="info-value">
          {value ? displayValue : 'Not added yet'}
        </span>
      </div>

      {value && (
        <button
          className={`copy-button ${isCopied ? 'copied' : ''}`}
          onClick={() => onCopy(field, value)}
        >
          {isCopied ? 'Copied ✓' : 'Copy'}
        </button>
      )}
    </div>
  )
}

export default App

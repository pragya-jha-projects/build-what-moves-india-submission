import { useState } from "react"
import type { CitizenProfile } from "../data/profile"
import { syncProfileToExtension } from "../lib/extension"

type ProfileProps = {
  profile: CitizenProfile
  onSave: (profile: CitizenProfile) => Promise<void>
  onBack: () => void
}

function Profile({ profile, onSave, onBack }: ProfileProps) {
  const [form, setForm] = useState(profile)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const updateField = (
    field: keyof CitizenProfile,
    value: string,
  ) => {
    setForm({
      ...form,
      [field]: value,
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSaving(true)
    setSaveMessage("")

    const synced = await syncProfileToExtension(form)
    await onSave(form)

    setSaveMessage(
      synced
        ? "Information saved and synced to the JanSeva extension."
        :
        "Information saved here. Open or install the JanSeva extension to sync it.",
    )

    setIsSaving(false)
  }

  return (
    <main className="page profile-page">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <p className="eyebrow">Your profile</p>
      <h1>My information</h1>

      <p>
        Save your commonly used information in one place.
      </p>

      <form className="profile-form" onSubmit={handleSubmit}>
        <p className="form-intro">This information is stored on this device and can be sent to your JanSeva extension.</p>
        <label className="form-field form-field-wide">
          Full name
          <input
            value={form.fullName}
            onChange={(event) =>
              updateField("fullName", event.target.value)
            }
          />
        </label>

        <label className="form-field">
          PAN
          <input
            value={form.pan}
            onChange={(event) =>
              updateField("pan", event.target.value)
            }
          />
        </label>

        <label className="form-field">
          Aadhaar
          <input
            value={form.aadhaar}
            onChange={(event) =>
              updateField("aadhaar", event.target.value)
            }
          />
        </label>

        <label className="form-field">
          UAN
          <input
            value={form.uan}
            onChange={(event) =>
              updateField("uan", event.target.value)
            }
          />
        </label>

        <label className="form-field">
          Bank account
          <input
            value={form.bankAccount}
            onChange={(event) =>
              updateField("bankAccount", event.target.value)
            }
          />
        </label>

        <button className="button button-primary form-submit" type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save information"}
        </button>

        {saveMessage && <p className="save-message" role="status">{saveMessage}</p>}
      </form>
    </main>
  )
}

export default Profile

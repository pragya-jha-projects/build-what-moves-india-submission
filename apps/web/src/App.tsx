import { useState, type ReactNode } from "react"
import { epfoService } from "./data/epfo"
import Home from "./pages/Home"
import Services from "./pages/Services"
import EPFO from "./pages/EPFO"
import Questionnaire from "./pages/Questionnaire"
import Checklist from "./pages/Checklist"
import Profile from "./pages/Profile"
import { emptyProfile, type CitizenProfile } from "./data/profile"

type Screen = "home" | "services" | "epfo" | "questionnaire" | "checklist" | "profile"

function App() {
  const [screen, setScreen] = useState<Screen>("home")
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [profile, setProfile] = useState<CitizenProfile>(() => {
  const saved = localStorage.getItem("janseva-profile")

  return saved
    ? JSON.parse(saved)
    : emptyProfile
})

  let content: ReactNode

  if (screen === "services") {
    content = (
      <Services
        onBack={() => setScreen("home")}
        onSelectService={(service) => {
          if (service === "epfo") setScreen("epfo")
        }}
      />
    )
  } else if (screen === "profile") {
    content = (
      <Profile
        profile={profile}
        onBack={() => setScreen("home")}
        onSave={async (updatedProfile) => {
          setProfile(updatedProfile)
          localStorage.setItem(
            "janseva-profile",
            JSON.stringify(updatedProfile),
          )
        }}
      />
    )
  } else if (screen === "epfo") {
    content = (
      <EPFO
        onBack={() => setScreen("services")}
        onStart={() => {
          setAnswers({})
          setScreen("questionnaire")
        }}
      />
    )
  } else if (screen === "checklist") {
    content = <Checklist answers={answers} items={epfoService.checklist} />
  } else if (screen === "questionnaire") {
    content = (
      <Questionnaire
        questions={epfoService.questions}
        onBack={() => setScreen("epfo")}
        onComplete={(completedAnswers) => {
          setAnswers(completedAnswers)
          setScreen("checklist")
        }}
      />
    )
  } else {
    content = (
      <Home
        onSelectEvent={(event) => {
          if (event === "first-job") setScreen("services")
        }}
        onProfile={() => setScreen("profile")}
      />
    )
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" onClick={() => setScreen("home")}>
          <span className="brand-mark" aria-hidden="true">J</span>
          <span>JanSeva</span>
        </button>
        <button className="profile-link" onClick={() => setScreen("profile")}>
          <span aria-hidden="true">◌</span> My information
        </button>
      </header>
      {content}
    </div>
  )
}

export default App

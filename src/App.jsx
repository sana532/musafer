import { PresentationShell } from './components/presentation/PresentationShell'
import { CoverSlide } from './slides/CoverSlide'
import { ProblemSlide } from './slides/ProblemSlide'
import { RequirementsSlide } from './slides/RequirementsSlide'
import { FeaturesSlide } from './slides/FeaturesSlide'
import { NfrSlide } from './slides/NfrSlide'
import { ProcessSlide } from './slides/ProcessSlide'
import { ArchitectureSlide } from './slides/ArchitectureSlide'
import { ChallengesSlide } from './slides/ChallengesSlide'
import { TestingSlide } from './slides/TestingSlide'
import { FutureSlide } from './slides/FutureSlide'
import { ClosingSlide } from './slides/ClosingSlide'

export default function App() {
  return (
    <PresentationShell>
      <CoverSlide />
      <ProblemSlide />
      <RequirementsSlide />
      <FeaturesSlide />
      <NfrSlide />
      <ProcessSlide />
      <ArchitectureSlide />
      <ChallengesSlide />
      <TestingSlide />
      <FutureSlide />
      <ClosingSlide />
    </PresentationShell>
  )
}

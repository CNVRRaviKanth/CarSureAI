import { HeroSection } from '../components/landing/HeroSection'
import { FeaturesSection } from '../components/landing/FeatureSection'
import { PipelineSection } from '../components/landing/PipelineSection'
import { StatsSection } from '../components/landing/StatsSection'

export function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <PipelineSection />
    </main>
  )
}

export default LandingPage
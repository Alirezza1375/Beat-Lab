import React from "react";

import BeatMachineSection from "../../HomePageSections/BeatMachineSection/BeatMachinSection";
import HeroSection from "../../HomePageSections/HeroSection/HeroSection";
import HowItWorksSection from "../../HomePageSections/howItWorksSection/HowItWorks";
import LevelsSection from "../../HomePageSections/LevelsSection/LevelsSection";
import ReadyToPlaySection from "../../HomePageSections/ReadyToPlaySection/ReadyToPlay";
import WhyBeatLabSection from "../../HomePageSections/whyBeat_LabSection/WhyBeatLabSection";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <LevelsSection />
      <BeatMachineSection />
      <HowItWorksSection />
      <WhyBeatLabSection />
      <ReadyToPlaySection />
    </div>
  );
}

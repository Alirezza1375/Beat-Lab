import React from "react";

import BeatMachineSection from "../HomePageSections/BeatMachinSection";
import HeroSection from "../HomePageSections/HeroSection";
import HowItWorksSection from "../HomePageSections/HowItWorks";
import LevelsSection from "../HomePageSections/LevelsSection";
import ReadyToPlaySection from "../HomePageSections/ReadyToPlay";
import WhyBeatLabSection from "../HomePageSections/WhyBeatLabSection";
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

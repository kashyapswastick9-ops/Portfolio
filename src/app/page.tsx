import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  AchievementsSection,
  EducationSection,
  ContactSection,
} from "@/components";
import PageLoadWrapper from "@/components/PageLoadWrapper";

export default function Home() {
  return (
    <PageLoadWrapper>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <AchievementsSection />
      <EducationSection />
      <ContactSection />
    </PageLoadWrapper>
  );
}

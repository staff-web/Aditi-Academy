import { createBrowserRouter } from "react-router";


import { ContactPage } from "./pages/ContactPage";
import { ProgramsPageEnhanced as ProgramsPage } from "./pages/ProgramsPage";
import { CertificationsPage } from "./pages/CertificationsPage";

import { StudentActivitiesPage } from "./pages/StudentActivitiesPage";
import { InnovationInsightPage } from "./pages/InnovationInsightPage";
import { IndividualTrainingPage } from "./pages/IndividualTrainingPage";
import { EnterpriseTrainingPage } from "./pages/EnterpriseTrainingPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { LandingPage } from "./pages/LandingPage";
import ESGPage from "./pages/ESGPage";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/programs",
    Component: ProgramsPage,
  },
  {
    path: "/programs/course/:courseSlug",
    Component: CourseDetailPage,
  },
  {
    path: "/certifications",
    Component: CertificationsPage,
  },
  {
    path: "/student-activities",
    Component: StudentActivitiesPage,
  },
  {
    path: "/innovation-insight",
    Component: InnovationInsightPage,
  },
  {
    path: "/esg",
    Component: ESGPage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/training/individual",
    Component: IndividualTrainingPage,
  },
  {
    path: "/training/enterprise",
    Component: EnterpriseTrainingPage,
  },
  {
    path: "/contact",
    Component: ContactPage,
  },
]);

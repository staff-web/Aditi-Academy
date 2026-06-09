import { createBrowserRouter } from "react-router";



import { ProgramsPageEnhanced as ProgramsPage } from "./pages/ProgramsPage";


import { StudentActivitiesPage } from "./pages/StudentActivitiesPage";
import { InnovationInsightPage } from "./pages/InnovationInsightPage";
import { IndividualTrainingPage } from "./pages/IndividualTrainingPage";
import { EnterpriseTrainingPage } from "./pages/EnterpriseTrainingPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { LandingPage } from "./pages/LandingPage";
import ESGPage from "./pages/ESGPage";
import { ContactPage } from "./pages/ContactPage";
import CertificationsPage from "./pages/CertificationsPage";
import CertificationDetailPage from "./pages/Certificationdetailpage";



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
    path: "/certifications/:certId",
    Component: CertificationDetailPage,
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

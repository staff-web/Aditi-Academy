import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { AboutPage } from "./pages/AboutPage";
import { EnterprisePage } from "./pages/EnterprisePage";
import { ContactPage } from "./pages/ContactPage";
import { ProgramsPage } from "./pages/ProgramsPage";
import { CertificationsPage } from "./pages/CertificationsPage";

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
    path: "/certifications",
    Component: CertificationsPage,
  },
  {
    path: "/enterprise",
    Component: EnterprisePage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/contact",
    Component: ContactPage,
  },
]);

import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Progress } from "./pages/Progress";
import { Quiz } from "./pages/Quiz";
import { Reference } from "./pages/Reference";
import { ReferenceVerb } from "./pages/ReferenceVerb";
import { Results } from "./pages/Results";

/**
 * Route -> page map. Pages that need data from the previous step (Quiz needs
 * a QuizConfig, Results needs the session's records) read it off
 * `useLocation().state` themselves and redirect home if it's missing, rather
 * than App wiring callbacks through — see pages/Quiz.tsx and pages/Results.tsx.
 */
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/quiz", element: <Quiz /> },
      { path: "/results", element: <Results /> },
      { path: "/progress", element: <Progress /> },
      { path: "/reference", element: <Reference /> },
      { path: "/reference/:verbTag", element: <ReferenceVerb /> },
    ],
  },
]);

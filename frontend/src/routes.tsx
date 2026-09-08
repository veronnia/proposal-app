import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "@/pages/DashboardPage";
import { NewProposalPage } from "@/pages/NewProposalPage";
import { ProposalEditorPage } from "@/pages/ProposalEditorPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  { path: "/", element: <DashboardPage /> },
  { path: "/proposals/new", element: <NewProposalPage /> },
  { path: "/proposals/:id/edit", element: <ProposalEditorPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

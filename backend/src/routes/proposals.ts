import { Router, Request, Response, NextFunction } from "express";
import {
  listProposals,
  createProposal,
  getProposal,
  updateProposal,
  patchProposal,
  deleteProposal,
  duplicateProposal,
} from "../controllers/proposalController";

type Handler = (req: Request, res: Response) => Promise<any>;

function asyncHandler(handler: Handler) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res).catch(next);
  };
}

export const proposalsRouter = Router();

proposalsRouter.get("/", asyncHandler(listProposals));
proposalsRouter.post("/", asyncHandler(createProposal));
proposalsRouter.get("/:id", asyncHandler(getProposal));
proposalsRouter.put("/:id", asyncHandler(updateProposal));
proposalsRouter.patch("/:id", asyncHandler(patchProposal));
proposalsRouter.delete("/:id", asyncHandler(deleteProposal));
proposalsRouter.post("/:id/duplicate", asyncHandler(duplicateProposal));

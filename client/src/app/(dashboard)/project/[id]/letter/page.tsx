"use client";
import LetterPage from "@/components/letter-management";
import { IncomingLetter, OutgoingLetter } from "@/state/project/projectSlice";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

export default function Home() {
  const { currentProject } = useSelector((state: RootState) => state.project);
  // Example download handler

  return (
    <LetterPage
      projectName={currentProject?.projectName as string}
      projectId={currentProject?.id as string}
      incomingLetters={
        currentProject?.incomingLetters as unknown as IncomingLetter[]
      }
      outgoingLetters={
        currentProject?.outgoingLetters as unknown as OutgoingLetter[]
      }
    />
  );
}

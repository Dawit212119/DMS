"use client";
import LetterPage, {
  type IncomingLetter,
  type OutgoingLetter,
} from "@/components/letter-management";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

export default function Home() {
  const { currentProject } = useSelector((state: RootState) => state.project);
  // Example download handler
  const handleDownload = (letterId: string, isIncoming: boolean) => {
    console.log(
      `Downloading ${isIncoming ? "incoming" : "outgoing"} letter: ${letterId}`
    );
    // Implement actual download functionality here
  };

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
      onDownload={handleDownload}
    />
  );
}

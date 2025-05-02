"use client";
import LetterPage, {
  type IncomingLetter,
  type OutgoingLetter,
} from "@/components/letter-management";
import { RootState } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
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
      projectName={currentProject.projectName}
      projectId={currentProject.id}
      incomingLetters={currentProject.incomingLetters}
      outgoingLetters={currentProject.outgoingLetters}
      onDownload={handleDownload}
    />
  );
}

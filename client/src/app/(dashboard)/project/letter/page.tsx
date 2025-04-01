"use client";
import LetterPage, {
  type IncomingLetter,
  type OutgoingLetter,
} from "@/components/letter-management";

// Sample data for demonstration
const incomingLetters: IncomingLetter[] = [
  {
    id: "IN-001",
    date: "2025-03-28",
    sender: "City Planning Department",
    subject: "Project Approval Notice",
    status: "Unread",
    priority: "High",
  },
  {
    id: "IN-002",
    date: "2025-03-25",
    sender: "Environmental Agency",
    subject: "Environmental Impact Assessment",
    status: "Read",
    priority: "Medium",
  },
  {
    id: "IN-003",
    date: "2025-03-20",
    sender: "Contractor XYZ",
    subject: "Material Delivery Schedule",
    status: "Read",
    priority: "Medium",
  },
  {
    id: "IN-004",
    date: "2025-03-15",
    sender: "Legal Department",
    subject: "Contract Amendment",
    status: "Read",
    priority: "High",
  },
  {
    id: "IN-005",
    date: "2025-03-10",
    sender: "Finance Department",
    subject: "Budget Approval",
    status: "Read",
    priority: "Low",
  },
];

const outgoingLetters: OutgoingLetter[] = [
  {
    id: "OUT-001",
    date: "2025-03-30",
    recipient: "City Planning Department",
    subject: "Request for Timeline Extension",
    status: "Sent",
    priority: "High",
  },
  {
    id: "OUT-002",
    date: "2025-03-27",
    recipient: "Contractor XYZ",
    subject: "Material Specifications Update",
    status: "Draft",
    priority: "Medium",
  },
  {
    id: "OUT-003",
    date: "2025-03-22",
    recipient: "Environmental Agency",
    subject: "Compliance Report Submission",
    status: "Sent",
    priority: "High",
  },
  {
    id: "OUT-004",
    date: "2025-03-18",
    recipient: "Legal Department",
    subject: "Contract Review Request",
    status: "Sent",
    priority: "Medium",
  },
  {
    id: "OUT-005",
    date: "2025-03-12",
    recipient: "Finance Department",
    subject: "Additional Budget Request",
    status: "Sent",
    priority: "Low",
  },
];

export default function Home() {
  // Example download handler
  const handleDownload = (letterId: string, isIncoming: boolean) => {
    console.log(
      `Downloading ${isIncoming ? "incoming" : "outgoing"} letter: ${letterId}`
    );
    // Implement actual download functionality here
  };

  return (
    <LetterPage
      projectName="Green Valley Development Project"
      projectId="GV-2025-01"
      incomingLetters={incomingLetters}
      outgoingLetters={outgoingLetters}
      onDownload={handleDownload}
    />
  );
}

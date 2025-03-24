import LettersManagement from "@/components/letter-management";
import MuiProvider from "@/components/mui-provider";

export default function Home() {
  return (
    <MuiProvider>
      <main className="min-h-screen bg-gray-50 p-4">
        <LettersManagement />
      </main>
    </MuiProvider>
  );
}

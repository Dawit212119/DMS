import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="mb-8">
        <Navbar />
      </div>
      <main className=" flex flex-col justify-center items-center">
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;

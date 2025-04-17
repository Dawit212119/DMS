import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="">
        <Navbar />
      </div>
      <main className="">
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;

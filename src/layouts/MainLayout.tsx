import Footer from "@/components/layout/Footer/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
export default MainLayout;

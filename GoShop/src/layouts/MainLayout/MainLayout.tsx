import Footer from "../../components/Footer";
import Header from "../../components/Header";

interface Props {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <Header />
      <main className="min-h-screen px-2 sm:px-4 md:px-6">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;

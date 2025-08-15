import Footer from "../../components/Footer";
import RegisterHeader from "../../components/RegisterHeader";

interface Props {
  children?: React.ReactNode;
}

const RegisterLayout = ({ children }: Props) => {
  return (
    <div>
      <RegisterHeader/>
      <h1>RegisterLayout</h1>
      {children}
      <Footer/>
    </div>
  );
};

export default RegisterLayout;

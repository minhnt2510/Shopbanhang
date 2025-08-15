interface Props {
  children?: React.ReactNode;
}

const RegisterLayout = ({ children }: Props) => {
  return (
    <div>
      <h1>RegisterLayout</h1>
      {children}
    </div>
  );
};

export default RegisterLayout;

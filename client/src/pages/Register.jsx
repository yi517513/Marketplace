import useFormInit from "../hooks/Init/useFormInit";
import AuthForm from "../components/Auth/AuthForm";

const Register = () => {
  const getFormInit = useFormInit();
  const { initialValues, validationSchema, config } =
    getFormInit(`RegisterForm`);

  return (
    <section className="w-full min-h-[90vh] flex justify-center items-center bg-gray-200">
      <div className="w-5/6 sm:4/5 md:3/4 max-w-[720px] h-[70vh] border shadow-xl rounded-xl bg-white">
        <AuthForm
          isRegister={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          {...config}
        />
      </div>
    </section>
  );
};

export default Register;

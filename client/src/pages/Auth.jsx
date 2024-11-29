import useFormInit from "../hooks/Init/useFormInit";
import AuthForm from "../components/Auth/AuthForm";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const SlideShow = ({ className, Component, props }) => (
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    navigation
    pagination={{ clickable: true }}
    slidesPerView="auto"
    loop
    className={className}
    effect="fade"
  >
    {props.map((prop, index) => (
      <SwiperSlide key={index}>
        <Component {...prop} />
      </SwiperSlide>
    ))}
  </Swiper>
);

const Auth = () => {
  const getFormikInit = useFormInit();
  const forms = ["LoginForm", "RegisterForm"];

  const props = forms.map((formName) => {
    const { initialValues, validationSchema, config } = getFormikInit(formName);
    return { ...config, initialValues, validationSchema };
  });

  return (
    <section className="w-full min-h-[70vh] flex justify-center items-center bg-gray-200">
      <div className="w-2/5 h-[60vh] border shadow-xl rounded-xl bg-white">
        <SlideShow Component={AuthForm} props={props} />
      </div>
    </section>
  );
};

export default Auth;

function HomeSection1({ children }: { children: any }) {
  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="grid lg:grid-cols-12 bg-white p-5 rounded-[20.15px]">
        <div className="lg:col-span-5">
          <p className="text-[20px] semibold">Hey Alice.</p>
          <p className="text-[#797979] text-[14px] light">
            Welcome back! We're here to support you on your learning journey.
            Dive into your classes and keep progressing towards your goals
          </p>
        </div>
        <div className="lg:col-span-7 mx-auto">
          <img
            className="w-[300px] h-[300px] lg:mt-[-40px] object-fit"
            src="/images/human.png"
            alt=""
          />
        </div>
      </div>
      {children}
    </div>
  );
}

export default HomeSection1;

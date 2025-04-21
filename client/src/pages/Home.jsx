import React, { useState } from "react";
import { useSelector } from "react-redux";
import Time from "../components/Time";
import PopUpHours from "../components/PopUpHours";
import { Helmet } from "react-helmet"; // For SEO

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { hoursData } = useSelector((state) => state.hours);
  const [show, setShow] = useState(false);

  /**
   *         "image": "https://smilebrightclinic.com/logo.png",
        "url": "https://smilebrightclinic.com",
        Add these to script when deployed
   */

  return (
    <div>
      <Helmet>
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "OJT",
        "name": "OJT HOURS",
      }
    `}
        </script>
        <title>Home | OJT HOURS</title>
        <meta
          name="description"
          content="This is a clock timer to track your rendered hours during OJT (On-the-Job-Trainer)"
        />
        <meta
          name="keywords"
          content="OJT, On-the-Job-Training, timer, rendered, time"
        />
        <link rel="canonical" href="http://localhost:5173/" />
      </Helmet>
      <section className="h-[70svh] grid place-items-center">
        <div className="hero-content flex flex-col items-center gap-8">
          <h1 className="text-[#1DCD9F] xl:text-6xl font-semibold capitalize text-4xl text-center">
            Welcome {user?.username}
          </h1>
          <p className="text-white text-lg xl:text-2xl text-center">
            This Web App will help you track your time/hours rendered during
            your working hours. Never lose track of your hours.
          </p>
          {hoursData ? (
            <div className="flex text-white items-center gap-3">
              <h1 className="xl:text-6xl lg:text-4xl sm:text-3xl font-bold">
                {hoursData?.time} hrs
              </h1>
              <span className="xl:text-6xl lg:text-4xl sm:text-4xl font-bold">
                /
              </span>
              <h1 className="xl:text-6xl lg:text-4xl sm:text-3xl font-bold text-green-500">
                {hoursData?.hoursTarget} hrs
              </h1>
            </div>
          ) : (
            <>
              <button
                onClick={() => setShow(true)}
                className="bg-[#1DCD9F] py-2 px-6 cursor-pointer text-2xl border-[1px] hover:bg-[#222222] hover:text-white hover:border-[1px] hover:border-[#1dcd9f]"
              >
                Get Started
              </button>
              {show && <PopUpHours setShow={setShow} />}
            </>
          )}
        </div>
      </section>

      <Time />
    </div>
  );
};

export default Home;

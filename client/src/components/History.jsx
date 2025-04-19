import React from "react";
import { useSelector } from "react-redux";

const History = () => {
  const { histories } = useSelector((state) => state.hours);
  console.log(histories);

  return (
    <div className="w-full h-full grid place-items-center">
      <section className="profile-container bg-blue-100">
        <header className="mt-5 mb-7">
          <h1 className="text-3xl font-semibold text-center">
            History Hours Rendered
          </h1>
        </header>
      </section>
    </div>
  );
};

export default History;

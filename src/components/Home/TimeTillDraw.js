import React, { useState, useEffect } from "react";

const TimeTillDraw = () => {
  const [timeTillDraw, setTimeTillDraw] = useState({});
  const [nextDrawTime, setNextDrawTime] = useState(
    new Date("March 11, 2022 0:00:00")
  );

  //Broken Jumping Dates sometimes
  // const getTimeTillDraw = () => {
  //   let currentDate = new Date(Date.now());
  //   let nextDraw = nextDrawTime;
  //   for (let day = nextDraw.getDate(); currentDate > nextDraw; day += 7) {
  //     nextDraw.setDate(day);
  //     console.log(currentDate);
  //     console.log(day);
  //     console.log(nextDraw);
  //   }
  //   setNextDrawTime(nextDraw);
  // };
  //
  // const getTimeLeft = () => {
  //   let currentDate = new Date(Date.now());
  //
  //   let difference = nextDrawTime - currentDate;
  //   let timeLeft = {};
  //
  //   if (difference > 0) {
  //     timeLeft = {
  //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //       minutes: Math.floor((difference / 1000 / 60) % 60),
  //       seconds: Math.floor((difference / 1000) % 60),
  //     };
  //   }
  //   setTimeTillDraw(timeLeft);
  // };
  //
  // useEffect(() => {
  //   getTimeTillDraw();
  // }, []);
  //
  // useEffect(() => {
  //   setTimeout(() => {
  //     getTimeLeft();
  //   }, 1000);
  // });

  return (
    <div className="row-span-2 col-span-2 text-center">
      <h3 className="text-5xl font-extrabold relative top-44">
        Draw every Friday at Midnight UTC Time
      </h3>
      {/* <h3 className="text-6xl font-extrabold relative top-44">
        Time left until next draw
      </h3>
      <h5 className="text-4xl font-bold relative top-48">
        Days | Hours | Minutes | Seconds{" "}
      </h5>
       <div>
        <p className="text-5xl relative top-52 right-60">{timeTillDraw.days}</p>
        <p className="text-5xl relative top-40 right-28">
          {timeTillDraw.hours}
        </p>
        <p className="text-5xl relative top-28 left-8">
          {timeTillDraw.minutes}
        </p>
        <p className="text-5xl relative top-16 left-52">
          {timeTillDraw.seconds}
        </p>
      </div> */}
    </div>
  );
};

export default TimeTillDraw;

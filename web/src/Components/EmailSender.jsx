import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = ({ message }) => {
  const date = new Date();

  let day = date.getDate();
let month = date.getMonth() + 1;

let currentDate = `(${month}/${day})`


  emailjs.init("G4pPqzQMLNXzBWpmj");

  const formattedMessage = message
    .map(
      (internship, index) =>
        `${index + 1}. ${internship.company} - ${internship.role}\nLink: ${
          internship.applicationLink
        }\n\n`
    )
    .join("");


  const sendEmail = () => {
    emailjs
      .send(
        "service_c8wrjq2",
        "template_o7kclun",
        {

          user_name: "Automated Message",
          amount: message.length,
          date: currentDate,
          user_email: "jasanpreetn9@gmail.com",
          message: formattedMessage,
        },
        "G4pPqzQMLNXzBWpmj"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  useEffect(() => {
    const targetHour = 12;
    const targetMinute = 30;
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    let delay;
    if (
      currentHour < targetHour ||
      (currentHour === targetHour && currentMinute < targetMinute)
    ) {
      // If it's before 2:30 PM, set the delay to reach 2:30 PM
      delay =
        ((targetHour - currentHour) * 60 + targetMinute - currentMinute) *
        60 *
        1000;
    } else {
      // If it's after 2:30 PM, set the delay to reach 2:30 PM the next day
      delay =
        (24 * 60 -
          (currentHour * 60 + currentMinute) +
          targetHour * 60 +
          targetMinute) *
        60 *
        1000;
    }

    const timeoutId = setTimeout(() => {
      sendEmail();
      // After the first email is sent, set an interval to send it daily at 2:30 PM
      setInterval(sendEmail, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    }, delay);

    // Cleanup timeout and interval on component unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
    </div>
  );
};

export default ContactUs;

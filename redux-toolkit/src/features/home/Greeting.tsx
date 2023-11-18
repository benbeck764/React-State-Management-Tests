import { FC } from "react";
import Typography from "@mui/material/Typography";

const Greeting: FC = () => {
  const getGreeting = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const greeting = getGreeting();

  return <Typography variant="h1">{greeting}</Typography>;
};

export default Greeting;

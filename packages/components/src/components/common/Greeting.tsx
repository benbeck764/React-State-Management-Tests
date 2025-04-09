import { FC } from 'react';
import Typography from '@mui/material/Typography';

const Greeting: FC = () => {
  const currentHour = new Date().getHours();

  const greetings: Record<number, string> = {
    5: 'Good morning', // 5:00 to 11:59
    12: 'Good afternoon', // 12:00 to 17:59
    18: 'Good evening' // 18:00 to 4:59 (wraps around)
  };

  const hourKey = Object.keys(greetings)
    .reverse()
    .find((key) => currentHour >= parseInt(key, 10));

  const greeting = hourKey ? greetings[parseInt(hourKey, 10)] : 'Good evening';

  return <Typography variant="h1">{greeting}</Typography>;
};

export default Greeting;

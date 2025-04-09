import { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Stack from '@mui/material/Stack';
import { SpotifyUser } from '@spotify-examples/spotify-models';

type UserWelcomeProps = {
  user: SpotifyUser | undefined;
};

const UserWelcome: FC<UserWelcomeProps> = (props) => {
  const { user } = props;

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" gap={1.5}>
      <Typography
        variant="h6"
        sx={{ color: (theme) => theme.palette.text.primary }}
      >{`Welcome, ${user?.display_name}!`}</Typography>
      <Avatar
        sx={{
          width: 40,
          height: 40,
          backgroundColor: (theme) => theme.palette.text.primary
        }}
        {...(user?.images[0].url && {
          src: user?.images[0].url
        })}
      >
        {!user?.images[0].url && (
          <PersonIcon sx={{ color: (theme) => theme.palette.primary.light, fontSize: 40 }} />
        )}
      </Avatar>
    </Stack>
  );
};

export default UserWelcome;

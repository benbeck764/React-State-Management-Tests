import { FC, useState } from 'react';
import AppMenu from '@benbeck764/react-components/Menu';
import DevicesIcon from '@mui/icons-material/Devices';
import ComputerIcon from '@mui/icons-material/Computer';
import RefreshIcon from '@mui/icons-material/Refresh';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { debounce } from '@mui/material/utils';
import { StyledDeviceRefreshButton, StyledDeviceRow } from './DeviceMenu.styles';
import { SpotifyEqualizer } from '@spotify-examples/components';
import { SpotifyDevice, SpotifyPlaybackState } from '@spotify-examples/spotify-models';

type DeviceMenuProps = {
  devices: SpotifyDevice[];
  fetchingDevices: boolean;
  thisDeviceId: string;
  playbackState: SpotifyPlaybackState;
  onDeviceChange: (deviceId: string) => void;
  onDevicesRefresh: () => void;
};

const DeviceMenu: FC<DeviceMenuProps> = (props: DeviceMenuProps) => {
  const {
    devices,
    fetchingDevices,
    thisDeviceId,
    playbackState,
    onDeviceChange,
    onDevicesRefresh
  } = props;

  const [open, setOpen] = useState<boolean>(false);

  const isPlaying = playbackState?.is_playing;

  const currentDevice = playbackState?.device;
  const activeDevice = currentDevice ?? devices?.find((d: SpotifyDevice) => d.is_active);
  const inactiveDevices =
    devices?.filter((d: SpotifyDevice) => d.id !== currentDevice?.id && d.id !== thisDeviceId) ??
    [];

  const handleOnDeviceChange = debounce(async (deviceId: string): Promise<void> => {
    setOpen(false);
    onDeviceChange(deviceId);
  }, 200);

  const handleDeviceRefresh = debounce(async (): Promise<void> => {
    onDevicesRefresh();
  }, 200);

  return (
    <AppMenu
      onMenuOpen={() => setOpen(true)}
      onMenuClose={() => setOpen(false)}
      forcedToggleState={open}
      mode="panel"
      menuWidth={320}
      buttonProps={{
        children: <DevicesIcon sx={{ color: (theme) => theme.palette.text.primary }} />
      }}
      toolTipTitle="Connect to a device"
      popperSx={{
        backgroundColor: (theme) => theme.palette.coolGrey[900],
        opacity: 0.85,
        border: 'none',
        p: 2
      }}
    >
      <Stack gap={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" gap={2} alignItems="center">
            {isPlaying ? (
              <SpotifyEqualizer size="large" />
            ) : (
              <ComputerIcon
                sx={{ color: (theme) => theme.palette.primary.dark, fontSize: '28px' }}
              />
            )}
            <Box>
              <Typography variant="paragraphLarge">Current device</Typography>
              <Typography
                variant="paragraphBold"
                sx={{ color: (theme) => theme.palette.primary.dark }}
              >
                {activeDevice?.id !== thisDeviceId
                  ? `${activeDevice?.name ?? ''}`
                  : 'This web browser'}
              </Typography>
            </Box>
          </Stack>
          <StyledDeviceRefreshButton
            onClick={handleDeviceRefresh}
            disabled={fetchingDevices}
            fetching={fetchingDevices}
          >
            <RefreshIcon sx={{ color: (theme) => theme.palette.text.primary }} />
          </StyledDeviceRefreshButton>
        </Stack>
        <Typography variant="paragraphBold">Select another device</Typography>
        <Stack>
          {activeDevice?.id !== thisDeviceId && (
            <StyledDeviceRow
              onClick={() => {
                if (thisDeviceId) handleOnDeviceChange(thisDeviceId);
              }}
            >
              <ComputerIcon />
              <Typography variant="paragraphBold">This web browser</Typography>
            </StyledDeviceRow>
          )}
          {inactiveDevices?.map((device: SpotifyDevice) => {
            return (
              <StyledDeviceRow
                key={device.id}
                onClick={() => {
                  if (device.id) handleOnDeviceChange(device.id);
                }}
              >
                <ComputerIcon />
                <Typography variant="paragraphBold">{device.name}</Typography>
              </StyledDeviceRow>
            );
          })}
        </Stack>
      </Stack>
    </AppMenu>
  );
};

export default DeviceMenu;

import { FC } from "react";
import AppMenu from "@benbeck764/react-components/Menu";
import DevicesIcon from "@mui/icons-material/Devices";
import ComputerIcon from "@mui/icons-material/Computer";
import RefreshIcon from "@mui/icons-material/Refresh";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Equalizer from "../../common/Equalizer";
import {
  useGetDevicesQuery,
  useTransferPlaybackMutation,
} from "../../../state/queries/player.api";
import { SpotifyDevice } from "../../../state/queries/models/spotify.models";
import { useAppSelector, AppRootState } from "../../../state/store";
import { debounce } from "@mui/material/utils";
import IconButton from "@mui/material/IconButton";

const DeviceMenu: FC = () => {
  const { data: devicesResponse, refetch: refetchDevices } =
    useGetDevicesQuery();
  const playerState = useAppSelector((s: AppRootState) => s.player);
  const [transferPlayback] = useTransferPlaybackMutation();

  const { playbackState, currentDeviceId } = playerState;

  const isPlaying = playbackState?.is_playing;

  const currentDevice = playbackState?.device;
  const devices = devicesResponse?.devices;
  const activeDevice =
    currentDevice ?? devices?.find((d: SpotifyDevice) => d.is_active);
  const inactiveDevices =
    devices?.filter(
      (d: SpotifyDevice) =>
        d.id !== currentDevice?.id && d.id !== currentDeviceId
    ) ?? [];

  const handleOnDeviceChange = debounce(
    async (deviceId: string): Promise<void> => {
      await transferPlayback({ deviceIds: [deviceId], play: true });
      await refetchDevices();
    },
    200
  );

  return (
    <AppMenu
      buttonProps={{
        children: (
          <DevicesIcon sx={{ color: (theme) => theme.palette.text.primary }} />
        ),
      }}
      mode="panel"
      menuWidth={320}
      toolTipTitle="Connect to a device"
      popperSx={{
        backgroundColor: (theme) => theme.palette.coolGrey[900],
        border: "none",
        p: 2,
      }}
    >
      <Stack gap={3}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" gap={2} alignItems="center">
            {isPlaying ? (
              <Equalizer size="large" />
            ) : (
              <ComputerIcon
                sx={{
                  color: (theme) => theme.palette.primary.dark,
                  fontSize: "28px",
                }}
              />
            )}
            <Box>
              <Typography variant="paragraphLarge">Current device</Typography>
              <Typography
                variant="paragraphBold"
                sx={{ color: (theme) => theme.palette.primary.dark }}
              >
                {activeDevice?.id !== currentDeviceId
                  ? `${activeDevice?.name}`
                  : "This web browser"}
              </Typography>
            </Box>
          </Stack>
          <IconButton>
            <RefreshIcon />
          </IconButton>
        </Stack>
        <Typography variant="paragraphBold">Select another device</Typography>
        <Stack>
          {activeDevice?.id !== currentDeviceId && (
            <Stack
              onClick={() => {
                if (currentDeviceId) handleOnDeviceChange(currentDeviceId);
              }}
              direction="row"
              alignItems="center"
              gap={2}
              sx={{
                padding: "16px 16px",
                cursor: "pointer",
                borderRadius: (theme) => theme.shape.borderRadius,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.coolGrey[800],
                },
                "&:focus": {
                  backgroundColor: (theme) => theme.palette.coolGrey[800],
                  outline: "none",
                },
              }}
            >
              <ComputerIcon />
              <Typography variant="paragraphBold">This web browser</Typography>
            </Stack>
          )}
          {inactiveDevices?.map((device: SpotifyDevice) => {
            return (
              <Stack
                key={device.id}
                onClick={() => {
                  if (device.id) handleOnDeviceChange(device.id);
                }}
                direction="row"
                alignItems="center"
                gap={2}
                sx={{
                  padding: "16px 16px",
                  cursor: "pointer",
                  borderRadius: (theme) => theme.shape.borderRadius,
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.coolGrey[800],
                  },
                  "&:focus": {
                    backgroundColor: (theme) => theme.palette.coolGrey[800],
                    outline: "none",
                  },
                }}
              >
                <ComputerIcon />
                <Typography variant="paragraphBold">{device.name}</Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </AppMenu>
  );
};

export default DeviceMenu;

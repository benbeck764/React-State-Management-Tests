import { FC } from 'react'
import { useGetUserInfo } from '../../../../state/react-query/user'
import { Stack, Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Logout from '@mui/icons-material/Logout'
import Subscription from '@mui/icons-material/CardMembership'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppRoutes, RouteName } from '../../../../routing/common/routes'
import { ProfileAvatar } from '../../../_shared/components/ProfileAvatar/ProfileAvatar'
import {
  AppButton,
  AppMenu,
  AppMenuItem,
  useBreakpoint,
} from '@benbeck764/react-components'

type AccountMenuProps = {
  onLogout: () => void
}

export const AccountMenu: FC<AccountMenuProps> = (props: AccountMenuProps) => {
  const { onLogout } = props
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { breakpoint } = useBreakpoint()
  const { data: userInfo } = useGetUserInfo()

  if (!userInfo) return <></>

  const profileAvatar = (
    <ProfileAvatar
      diameter={32}
      username={userInfo.username}
      avatarUrl={userInfo.avatarImageUrl}
    />
  )

  return (
    <>
      {breakpoint === 'xl' ? (
        <AppMenu
          buttonProps={{
            children: profileAvatar,
          }}
          mode="menu"
          menuWidth={155}
          toolTipTitle="Account Settings"
        >
          <AppMenuItem
            onSelect={() => navigate(AppRoutes[RouteName.UserProfile].path)}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccountCircle
                fontSize="small"
                sx={{ color: (theme) => theme.palette.grey[600] }}
              />
              <Typography variant="paragraphBold">Profile</Typography>
            </Stack>
          </AppMenuItem>
          <AppMenuItem
            onSelect={() =>
              navigate(AppRoutes[RouteName.UserSubscription].path)
            }
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Subscription
                fontSize="small"
                sx={{ color: (theme) => theme.palette.grey[600] }}
              />
              <Typography variant="paragraphBold">Subscription</Typography>
            </Stack>
          </AppMenuItem>
          <AppMenuItem onSelect={onLogout}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Logout
                fontSize="small"
                sx={{ color: (theme) => theme.palette.grey[600] }}
              />
              <Typography variant="paragraphBold">Logout</Typography>
            </Stack>
          </AppMenuItem>
        </AppMenu>
      ) : (
        <AppButton
          sx={{ justifyContent: 'flex-end' }}
          onClick={() => {
            if (pathname !== AppRoutes[RouteName.UserProfile].path) {
              navigate(AppRoutes[RouteName.UserProfile].path)
            }
          }}
        >
          {profileAvatar}
        </AppButton>
      )}
    </>
  )
}

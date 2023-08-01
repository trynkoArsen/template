import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import { NextLinkButton } from '@/components';

import styles from './styles';
import { useAuthPopup } from './useAuthPopup';

const AuthPopup = () => {
  const { user, isLoading, anchorEl, onCloseMenu, onOpenMenu, onSignOut } = useAuthPopup();

  if (isLoading) {
    return <Box sx={styles.container} />;
  }

  if (!user) {
    return (
      <Box sx={styles.container}>
        <NextLinkButton href="/sign-in">Sign in</NextLinkButton>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="auth-menu"
        aria-haspopup="true"
        onClick={onOpenMenu}
        color="inherit"
      >
        <Avatar src={user.imageUri} />
      </IconButton>
      <Menu
        sx={styles.menu}
        id="auth-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={onCloseMenu}
      >
        <MenuItem disabled>
          <Typography variant="inherit" noWrap>
            {user.email}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onCloseMenu} component={NextLinkButton} href="/profile">
          <Typography variant="inherit" noWrap>
            Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={onCloseMenu} component={NextLinkButton} href="/settings">
          <Typography variant="inherit" noWrap>
            Settings
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onSignOut}>
          <Typography variant="inherit" noWrap>
            Sign out
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AuthPopup;

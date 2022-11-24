import { MenuItem, Card, CardContent, Stack, Button, Grid, Box } from "@mui/material";
import { useRouter } from "next/router";

export const LoginButton = ({isMobile, ...props}) => {
  const router = useRouter();
  const onClick = () => router.push('/login')
  return (
    <Button
      {...props}
      aria-label="login"
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        paddingX: 4,
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '18px',
        height: '50px',
        boxShadow: 'none'
      }}
      >
      Login
    </Button>
  )
}
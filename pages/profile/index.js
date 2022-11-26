import { SectionTitle } from "../../components/AccountSettingsLayout/AccountSettingsLayout.styled";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoremIpsumText } from '../../components/AccountSettingsLayout/LoremIpsumText'
import { EditProfileCard } from '../../components/EditProfile/';
import { ChangePasswordCard } from '../../components/ChangePasswordCard';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useAxios from '../../services/api';
import { AccountSettingsLayout } from "../../components/AccountSettingsLayout";
import { useRouter } from "next/router";
import { deleteCookie } from 'cookies-next';

export async function getServerSideProps({ req, res }) {
  const { axios } = useAxios({ req, res });
  const { data: profile } = await axios.get('/profile');

  return {
    props: {
      menu: true,
      title: "Account Settings",
      profile
    },
  };
}

const prepareMenuList = (profile) => {
  return [
    {
      label: "Edit Profile",
      id: "profile-edit",
      content: <EditProfileCard profile={profile}/>
    },
    {
      label: "Terms & Conditions",
      id: "terms-and-conditions",
      content: <LoremIpsumText subtitle="Terms & Conditions" />
    },
    {
      label: "Privacy Policy",
      id: "policy",
      content: <LoremIpsumText subtitle="Privacy Policy" />
    },
    {
      label: "Feedback",
      id: "feedback",
      content: <LoremIpsumText subtitle="Feedback" />
    },
    {
      label: "Change Password",
      id: "change-password",
      content: <ChangePasswordCard profile={profile}/>
    },
    {
      label: "Log Out",
      id: 'logout'
    }
  ]
}

export default function Page({profile, title}) {
  const theme = useTheme();
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // -- check if user is from desktop --
  if (!isMobile) {
    // -- render desktop version edit profile page --
    return (
      <AccountSettingsLayout menu>
        <EditProfileCard profile={profile} title={title}/>
      </AccountSettingsLayout>
    )
  }

  // -- otherwise show mobile version with accordions --

  const menuList = prepareMenuList(profile);

  // -- log out User --
  const logout = () => {
    // -- delete cookie token --
    deleteCookie('token');
    // -- redirect user to login page --
    router.push('/login');
  }

  return (
    <Box>
      <SectionTitle title={title} />
      <div>
        {
          menuList.map((menuItem) => {
            if (menuItem.id === 'logout') {
              return(
                <Accordion disableGutters key={menuItem.id} sx={{ marginBottom: 'auto'}}>
                  <AccordionSummary
                    sx={{ backgroundColor: '#090F27', margin: 0 }}
                    id={menuItem.label}
                    onClick={logout}
                  >
                    <Typography color='primary' sx={{ fontWeight: 600, fontSize: '1.25rem'}}>{menuItem.label}</Typography>
                  </AccordionSummary>
                </Accordion>
              )
            }
          return (
            <Accordion disableGutters key={menuItem.id}>
              <AccordionSummary
                sx={{ backgroundColor: '#090F27', margin: 0 }}
                expandIcon={<ExpandMoreIcon sx={{ color: '#636D92' }} />}
                aria-controls={`${menuItem.id}-content`}
                id={menuItem.label}
              >
                <Typography sx={{color: '#A5B0D6', fontWeight: 600, fontSize: '1.25rem'}}>{menuItem.label}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{backgroundColor: "#131B3F", padding: 0 }}>
                {menuItem.content}
              </AccordionDetails>
            </Accordion>
          )})
        }
      </div>
    </Box>
  );
}

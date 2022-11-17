import { fetchProfile } from '../components/ProfileLayout/'
import { SectionTitle } from "../components/AccountSettingsLayout/AccountSettingsLayout.styled";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoremIpsumText } from '../components/AccountSettingsLayout/LoremIpsumText'
import { EditProfileCard } from '../components/EditProfile/';
import { ChangePasswordCard } from '../components/ChangePasswordCard';
import { Box, Link } from '@mui/material';

export async function getServerSideProps(context) {
  const profile = await fetchProfile()
  return {
    props: {
      title: "Account Settings",
      profile
    },
  };
}

export default function Page({profile, title}) {
  // console.log('profile', profile)
  const menuList = [
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
  ];

  return (
    <Box>
      <SectionTitle title={title} />
      <div>
        {
          menuList.map((menuItem) => (
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
          ))
        }
      </div>
      <Box padding={2}>
        <Link href='/logout' underline='none' fontSize='1.25rem' fontWeight={600}>Log Out</Link>
      </Box>
    </Box>
  );
}

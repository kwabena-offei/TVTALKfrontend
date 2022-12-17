import { Card, CardContent, Grid, Stack, MenuItem } from "@mui/material";
import {
  EditProfileHeader,
  TextInput,
  SelectInput,
  Actions,
} from "./EditProfile.styled";
import { gendersOptionsList, genders } from "../../pages/registration";
import { CalendarInput } from "../CalendarInput";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

export const EditProfileCard = ({ profile }) => {
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDateChange = () => {
    console.log("date change");
  };

  const cableCompanies = ["First company", "Second company", "Third company"];
  const streamingService = [
    "First Streaming Service",
    "Second Streaming Service",
    "Third Streaming Service",
  ];

  const options = (collection) => {
    return collection.map((company) => (
      <MenuItem key={`select-option-${company}`} value={company}>
        {company}
      </MenuItem>
    ));
  };

  return (
    <Card sx={{ paddingX: isMobile ? 0 : 4, paddingY: isMobile ? 0 : 4, backgroundColor: "#131B3F" }}>
      <EditProfileHeader profile={profile} isMobile={isMobile} />
      <CardContent xs={isMobile ? { paddingX: '20px' } : {} }>
        <Grid container columnSpacing={5} rowSpacing={isMobile ? 2.5 : 0 }>
          <Grid item xs={12} md={6}>
            <Stack spacing={isMobile ? 2.5 : 2}>
              <TextInput id="name" label="Name"/>
              <TextInput id="username" label="Username" value={profile.username} />
              <SelectInput id="gender" label="Gender" value={genders[0].id}>
                {gendersOptionsList}
              </SelectInput>
              <CalendarInput
                name="birthday"
                inputFormat="MM/DD/YYYY"
                value={"02/24/2022"}
                onChange={handleDateChange}
                inputProps={{ variant: 'filled', sx: {
                  '.MuiInputBase-root': {
                      bgcolor: theme.palette.background.default
                    }
                  }
                }}
              >
                Birthday
              </CalendarInput>
              <TextInput id="email" label="Email" type="email" />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={isMobile ? 2.5 : 2}>
              <TextInput id="phone" label="Phohe" type="tel" />
              <SelectInput
                id="cable-company"
                label="Cable Company"
                value={cableCompanies[0]}
              >
                {options(cableCompanies)}
              </SelectInput>
              <SelectInput
                id="streaming-service"
                label="Streaming Service"
                value={streamingService[0]}
              >
                {options(streamingService)}
              </SelectInput>
              <TextInput id="City" label="City" placeholder="City" />
              <TextInput
                id="Zip-code"
                label="Zip Code"
                placeholder="Zip Code"
              />
              { isMobile &&
              <div>
                <Actions sx={{ justifyContent: 'center', marginY: 1.25 }} /> 
              </div>
              }
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
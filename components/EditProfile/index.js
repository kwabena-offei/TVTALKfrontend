import { Card, CardContent, Grid, Stack, MenuItem } from "@mui/material";
import {
  EditProfileHeader,
  TextInput,
  SelectInput,
} from "./EditProfile.styled";
import { gendersOptionsList, genders } from "../../pages/registration";
import { CalendarInput } from "../CalendarInput";

export const EditProfileCard = ({ profile }) => {
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
    <Card sx={{ paddingX: 4, paddingY: 4, backgroundColor: "#131B3F" }}>
      <EditProfileHeader profile={profile} />
      <CardContent>
        <Grid container columnSpacing={5}>
          <Grid item md={6}>
            <Stack spacing={2}>
              <TextInput id="name" label="Name" />
              <TextInput id="username" label="Username" />
              <SelectInput id="gender" label="Gender" value={genders[0].id}>
                {gendersOptionsList}
              </SelectInput>
              <CalendarInput
                name="birthday"
                inputFormat="MM/DD/YYYY"
                value={"02/24/2022"}
                onChange={handleDateChange}
                inputProps={{ variant: "outlined" }}
              >
                Birthday
              </CalendarInput>
              <TextInput id="email" label="Email" type="email" />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={2}>
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
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

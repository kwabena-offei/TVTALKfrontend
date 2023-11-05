import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Stack, MenuItem, Snackbar } from "@mui/material";
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
import useAxios from "../../services/api";

export const EditProfileCard = ({ profile }) => {
  const [draftProfile, setDraftProfile] = useState(profile);
  const [lineups, setLineups] = useState([]);
  const [lineupOptions, setLineupOptions] = useState([]);
  const [selectedStreamingService, setSelectedStreamingService] = useState(draftProfile.streaming_service);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { axios } = useAxios();

  const onSave = async () => {
    const results = await axios.put(`/users/${profile.username}`, { ...draftProfile, streaming_service: selectedStreamingService?.toLowerCase() });
  }

  const streamingOptions = ['Hulu', 'Netflix', 'Prime', 'Not Specified'];

  useEffect(() => {
    streamingOptions.forEach((option) => {
      if (option.toLowerCase() === profile.streaming_service) {
        setSelectedStreamingService(option);
      }
    })
  }, [profile.streaming_service])


  useEffect(() => {
    const lineupsUrl = `https://api.tvtalk.app/data/v1.1/lineups?country=USA&postalCode=${profile.zipcode}`;
    const getLineups = async () => {
      const results = await axios.get(lineupsUrl);
      setLineups(results.data);
      let newLineupOptions = results.data.filter((lineup) => lineup['type'] !== 'VMVPD' && lineup['device'] === 'DEFAULT').map((lineup) => {
        return {
          value: lineup.lineupId,
          text: lineup.name
        }
      });

      newLineupOptions.unshift({ value: '', text: 'Not Specified' });
      setLineupOptions(newLineupOptions);
    };
    if (profile.zipcode) {
      getLineups();
    }
  }, [profile.zipcode])


  const options = (collection) => {
    return collection.map((company) => (
      <MenuItem key={`select-option-${(company?.value || company)}`} value={(company?.value || company)}>
        {(company?.text || company)}
      </MenuItem>
    ));
  };

  return (
    <Card sx={{ paddingX: isMobile ? 0 : 4, paddingY: isMobile ? 0 : 4, backgroundColor: "#131B3F" }}>
      <EditProfileHeader profile={profile} isMobile={isMobile} onSave={onSave} />
      <CardContent xs={isMobile ? { paddingX: '20px' } : {}}>
        <Grid container columnSpacing={5} rowSpacing={isMobile ? 2.5 : 0}>
          <Grid item xs={12} md={6}>
            <Stack spacing={isMobile ? 2.5 : 2}>
              <TextInput id="name" label="Name" value={draftProfile.name} onChange={(e) => setDraftProfile({ ...draftProfile, name: e.target.value })} />
              <TextInput id="username" label="Username" value={draftProfile.username} onChange={(e) => setDraftProfile({ ...draftProfile, username: e.target.value })} />
              <SelectInput id="gender" label="Gender" value={draftProfile.gender}
                onChange={(e) => {
                  setDraftProfile({ ...draftProfile, gender: e.target.value.toLowerCase() })
                }}
              >
                {gendersOptionsList}
              </SelectInput>
              <CalendarInput
                name="birthday"
                inputFormat="MM/DD/YYYY"
                value={draftProfile.birth_date}
                onChange={(value) => setDraftProfile({ ...draftProfile, birth_date: value })}
                inputProps={{
                  variant: 'filled', sx: {
                    '.MuiInputBase-root': {
                      bgcolor: theme.palette.background.default
                    }
                  }
                }}
              >
                Birthday
              </CalendarInput>
              <TextInput id="email" label="Email" type="email" value={draftProfile.email} onChange={(e) => setDraftProfile({ ...draftProfile, email: e.target.value })} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={isMobile ? 2.5 : 2}>
              <TextInput id="phone" label="Phone" type="tel" value={draftProfile.phone_number} onChange={(e) => setDraftProfile({ ...draftProfile, phone_number: e.target.value })} />
              <SelectInput
                id="cable-company"
                label="Cable Company"
                value={draftProfile.cable_provider}
                onChange={(e) => setDraftProfile({ ...draftProfile, cable_provider: e.target.value })}
              >
                {options(lineupOptions)}
              </SelectInput>
              <SelectInput
                id="streaming-service"
                label="Streaming Service"
                value={selectedStreamingService}
                onChange={(e) => setSelectedStreamingService(e.target.value)}
              >
                {options(streamingOptions)}
              </SelectInput>
              <TextInput id="City" label="City" placeholder="City" xd value={draftProfile.city} onChange={(e) => setDraftProfile({ ...draftProfile, city: e.target.value })} />
              <TextInput
                id="Zip-code"
                label="Zip Code"
                placeholder="Zip Code"
                value={draftProfile.zipcode}
                onChange={(e) => setDraftProfile({ ...draftProfile, zipcode: e.target.value })} />
              {isMobile &&
                <div>
                  <Actions sx={{ justifyContent: 'center', marginY: 1.25 }} onSave={onSave} />
                </div>
              }
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  );
};
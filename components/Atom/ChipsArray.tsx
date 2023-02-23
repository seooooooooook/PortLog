import * as React from 'react';
import Chip from '@mui/material/Chip';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Box, ListItem } from '@mui/material';

interface skillsDB {
  key: number;
  skill: string;
  profileId: number;
}

const ChipsArray = (props: { skills: skillsDB[] }) => {
  const { skills } = props;
  const [skillsState, setSkillsState] =
    React.useState<readonly skillsDB[]>(skills);

  const handleDelete = (chipToDelete: skillsDB) => () => {
    setSkillsState((skill) => skill.filter((e) => e.key !== chipToDelete.key));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {skillsState.map((data) => {
        let icon;

        if (data.skill === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem sx={{ width: 'unset' }} key={data.key}>
            <Chip
              icon={icon}
              label={data.skill}
              onDelete={data.skill === 'React' ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Box>
  );
};

export default ChipsArray;

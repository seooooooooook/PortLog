import React, { Fragment, useState } from 'react';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Dot from '../../images/dot.svg';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ListIco from '../../images/list.svg';
import { useRouter } from 'next/router';

const ListItem = (props) => {
  const { data } = props;
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Dot />
        </ListItemIcon>
        <ListItemText sx={{ flex: 1 }}>{data.name}</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {data.posts.map((el) => {
          const isSelected = router.query.pid === el.id.toString();
          return (
            <List key={el.id} component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={isSelected}
                onClick={() =>
                  router.push(`/${router.query.username}/blog/${el.id}`)
                }
              >
                <ListItemIcon>
                  <ListIco />
                </ListItemIcon>
                <ListItemText>{el.title}</ListItemText>
              </ListItemButton>
            </List>
          );
        })}
      </Collapse>
    </Fragment>
  );
};

export default ListItem;

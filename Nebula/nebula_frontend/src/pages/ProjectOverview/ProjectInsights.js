import React, { useState } from 'react';

// local components

import { initialData } from '../../data/initialData';

// material ui components
import CustomCard from '../../utils/CustomCard';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const windowHeight = window.innerHeight - 70;

const useStyle = makeStyles((theme) => ({
  projectRightPanel: {
    height: windowHeight,
    padding: theme.spacing(4, 12, 4, 6),
    overflowY: 'auto',
  },
}));

function DraggableItem(props) {
  const { index, card } = props;
  const { id, title, width, size } = card;
  const [cardWidth, setCardWidth] = useState(width);

  return (
    <Grid item xs={cardWidth}>
      <CustomCard
        cardId={id}
        index={index}
        cardTitle={title}
        setCardWidth={setCardWidth}
        cardSize={size}
      />
    </Grid>
  );
}

export default function ProjectInsights() {
  const classes = useStyle();

  const [data] = useState(initialData);
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(true);
  const toggleBusinessMode = () => setIsDevelopmentMode(!isDevelopmentMode);

  return (
    <Paper elevation={0} className={classes.projectRightPanel}>
      <Button variant="outlined" onClick={toggleBusinessMode}>
        {isDevelopmentMode ? 'Development' : 'Management'}
      </Button>
      {isDevelopmentMode ? (
        //Showing project developement related data:
        <Grid container spacing={2}>
          {data.workspaces['workspace-1'].cardIds.map((cardId, index) => (
            <DraggableItem
              key={cardId}
              index={index}
              card={data.cards[cardId]}
              workspaceId="workspace-1"
            />
          ))}
        </Grid>
      ) : (
        // Showing space management related data
        <Grid container spacing={2}>
          {data.workspaces['workspace-2'].cardIds.map((cardId, index) => (
            <DraggableItem
              key={cardId}
              index={index}
              card={data.cards[cardId]}
              workspaceId="workspace-2"
            />
          ))}
        </Grid>
      )}
    </Paper>
  );
}

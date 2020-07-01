import React, { useState, useCallback, useRef } from "react";
import { useDrop } from "react-dnd";

// local components

import { initialData } from "../../data/initialData";

// material ui components
import CustomCard from "../Utils/CustomCard";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const ItemTypes = {
  CARD: "card",
};

const windowHeight = window.innerHeight - 70;

const useStyle = makeStyles((theme) => ({
  projectRightPanel: {
    height: windowHeight,
    padding: theme.spacing(4, 12, 4, 6),
    overflowY: "auto",
  },
}));

function DraggableItem(props) {
  const { index, card, moveCard, workspaceId } = props;
  const { id, title, width, size } = card;
  const [cardWidth, setCardWidth] = useState(width);
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex, workspaceId);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  drop(ref);

  return (
    <Grid item xs={cardWidth} ref={ref}>
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

  const [data, setData] = useState(initialData);
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(true);
  const toggleBusinessMode = () => setIsDevelopmentMode(!isDevelopmentMode);

  const moveCard = useCallback(
    (dragIndex, hoverIndex, workspaceId) => {
      const workspace = data.workspaces[workspaceId];
      const newCardIds = Array.from(workspace.cardIds);
      const dragCard = newCardIds[dragIndex];
      newCardIds.splice(dragIndex, 1);
      newCardIds.splice(hoverIndex, 0, dragCard);

      const newWorkspace = {
        ...workspace,
        cardIds: newCardIds,
      };

      const newData = {
        ...data,
        workspaces: {
          ...data.workspaces,
          [newWorkspace.id]: newWorkspace,
        },
      };
      setData(newData);
    },
    [data]
  );

  return (
    <Paper elevation={0} className={classes.projectRightPanel}>
      <Button variant="outlined" onClick={toggleBusinessMode}>
        {isDevelopmentMode ? "Development" : "Management"}
      </Button>
      {isDevelopmentMode ? (
        //Showing project developement related data:
        <Grid container spacing={2}>
          {data.workspaces["workspace-1"].cardIds.map((cardId, index) => (
            <DraggableItem
              key={cardId}
              index={index}
              card={data.cards[cardId]}
              moveCard={moveCard}
              workspaceId="workspace-1"
            />
          ))}
        </Grid>
      ) : (
        // Showing space management related data
        <Grid container spacing={2}>
          {data.workspaces["workspace-2"].cardIds.map((cardId, index) => (
            <DraggableItem
              key={cardId}
              index={index}
              card={data.cards[cardId]}
              moveCard={moveCard}
              workspaceId="workspace-2"
            />
          ))}
        </Grid>
      )}
    </Paper>
  );
}

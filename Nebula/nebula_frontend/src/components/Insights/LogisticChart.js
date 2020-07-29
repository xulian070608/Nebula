import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { logisticData } from '../../data/logisticData';

// material ui components
import LogisticModal from '../Modals/LogisticModal';

function LogisticChart(props) {
  let [modalState, setModalState] = useState(false);
  const toggleModalState = () => {
    setModalState(!modalState);
  };
  let [selectedPOStatus, setSelectedPOStatus] = useState();

  return (
    <>
      <Doughnut
        height={200}
        data={logisticData}
        options={{ responsive: false }}
        onElementsClick={(elems) => {
          if (elems[0]) {
            toggleModalState();
            // if required to build the URL, you can
            // get datasetIndex and value index from an `elem`:
            // console.log(elems[0]._datasetIndex + ', ' + elems[0]._index);
            setSelectedPOStatus(logisticData.labels[elems[0]._index]);
            // and then redirect to the target page:
            // window.location = "https:example.com";
          }
        }}
      />
      {modalState ? (
        <LogisticModal
          showModal={modalState}
          toggleModalState={toggleModalState}
          selectedPOStatus={selectedPOStatus}
        />
      ) : null}
    </>
  );
}

export default LogisticChart;

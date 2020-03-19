import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Container } from 'reactstrap';
import LogisticModal from "../Modal/LogisticModal";

function LogisticChart(props) {

  let [modalState, setModalState] = useState(false)
  const toggleModalState = () => {setModalState(!modalState)}

  let [selectedPOStatus, setSelectedPOStatus] = useState()

  return (
    <Container>
      <Doughnut 
        data={props.logisticData} 
        options={{ responsive: true }} 
        onElementsClick={elems => {
          toggleModalState()
          // if required to build the URL, you can 
          // get datasetIndex and value index from an `elem`:
          // console.log(elems[0]._datasetIndex + ', ' + elems[0]._index);
          setSelectedPOStatus(props.logisticData.labels[elems[0]._index])
          // and then redirect to the target page:
          // window.location = "https://example.com";
      }}
      />
      {modalState ? 
      <LogisticModal 
      showModal={modalState} selectedPOStatus={selectedPOStatus}/> 
      : null}
    </Container>
    
  )
}

export default LogisticChart;
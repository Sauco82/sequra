import { useEffect, useState } from "react";

import { useGetCreditAgreementQuery, usePostEventsMutation } from "../api/api";
import styles from "../styles/InstallmentSelector.module.css";
import Popup from "./Popup";

const {
  container,
  header,
  select,
} = styles;

export default function InstallmentSelector({amount}){
  const {data: instalmentTypes, isFetching, isError} = useGetCreditAgreementQuery(amount),
        [ postEvents, {error}] = usePostEventsMutation(),
        [ selectedCount, setSelectedCount ] = useState(""),
        [ showPopup, setShowPopup ] = useState(false);

  if (error) console.error("We could not post the tracking information", error);

  useEffect(()=>{
    if (!instalmentTypes || !instalmentTypes.length) return;
    setSelectedCount(instalmentTypes[0].instalment_count);
  },[instalmentTypes]);

  const onChange = e => {
    const selectedCount = e.target.value;

    const payload = {
      "context":            "checkoutWidget", 
      "type":               "simulatorInstalmentChanged", 
      selectedCount,
    };
    setSelectedCount(selectedCount);
    postEvents(payload);    
  };

  const closePopup = () => setShowPopup(false),
        openPopup =  e => {
          e.preventDefault();
          setShowPopup(true);
        };

  return (
    <>
      {selectedCount && instalmentTypes && showPopup && <Popup {...{selectedCount, instalmentTypes, closePopup}} />}
      <div className={container}>        
        <div className={header}>
          <p>Págalo en:</p>
          {instalmentTypes &&
            <a href="#mas-info" onClick={openPopup}>Mas info</a>
          }
        </div>

        <select className={select} disabled={isFetching} onChange={onChange} value={selectedCount}>
          {isFetching || isError ?
            <option>Calculando...</option>
            :
            instalmentTypes.map( ({instalment_count: count, instalment_amount }, i) => (
              <option key={`${count}-${amount}`} value={count}>
                {`${count} cuotas de ${instalment_amount.string}/mes`}
              </option>
            )) 
          }
        </select>
      </div>
    </>
  );
}
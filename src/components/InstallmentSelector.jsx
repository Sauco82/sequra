import { useGetCreditAgreementQuery, usePostEventsMutation } from "../api/api";
import styles from "../styles/InstallmentSelector.module.css";

const {
  container,
  header,  
  select,
} = styles;

export default function InstallmentSelector({amount}){
  const {data: instalmentTypes, isFetching} = useGetCreditAgreementQuery(amount),
        [ postEvents, result ] = usePostEventsMutation();

  const onChange = e => {
    const payload = {
      "context":            "checkoutWidget", 
      "type":               "simulatorInstalmentChanged", 
      "selectedInstalment": e.target.value,
    };
    postEvents(payload);    
  };

  return (
    <>
      <div className={container}>
        
        <div className={header}>
          <p>Págalo en:</p>
          <a href="#mas-info">Mas info</a>
        </div>

        <select className={select} disabled={isFetching} onChange={onChange}>
          {isFetching ?
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
import styles from "../styles/Popup.module.css";

const {
  wrapper,
  popup
} = styles;

export default function Popup({selectedCount, instalmentTypes, closePopup}){
  const instalment = instalmentTypes.find( type => type.instalment_count == selectedCount);
  
  return (
    <div className={wrapper} onClick={closePopup}>
      <div className={popup}>
        <ul>
          <li>
            Eliges "Fracciona tu pago" al realizar el pedido y pagas sólo la primera cuota.
            <span />
          </li>
          <li>
            Recibes tu pedido.
            <span />
          </li>
          <li>
            El resto de pagos se cargarán automáticamente en tu tarjeta.
            <span />
          </li>
        </ul>

        <p>
          <strong>¡Así de simple!</strong>
        </p>
        <p>
          Además, en el importe mostrado ya se incluye la única cuota mensual de
          {" "}
          {instalment.instalment_amount.string}/mes por lo que no tendrás ninguna sorpresa.
        </p>
      </div>
    </div>
  );
}
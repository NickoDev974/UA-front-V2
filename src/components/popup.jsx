import { useState } from "react";

const PopUp = (props) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      props.onClickClose();
    }, 3000);
  };
  return (
    <div className="popUp">
      <p
        className="closePopUp"
        onClick={(e) => {
          props.onClickClose();
        }}
      >
        ❌
      </p>
      <div className="sectionPopUp">
        <h4 className="textePopUp">Félicitations pour vos achats</h4>
        <p className="msg">{props.msg}</p>

        <button
          className="closePopUpButton"
          onClick={(e) => {
            props.onClickClose();
          }}
        >
          Retour aux achats
        </button>
      </div>
    </div>
  );
};

export default PopUp;

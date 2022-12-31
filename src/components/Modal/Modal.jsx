import { useState,useRef, useEffect} from 'react';
import styles from './Modal.module.css'
const Modal=({show,addGifts,edit,img_url,name,quantity,giftTo,handleEditTrue,handleEditFalse,editGift,indexToEdit})=>{
    const [giftName, setGiftName] = useState('');
    const [giftQuantity, setGiftQuantity] = useState(1);
    const [giftUrl, setGiftUrl] = useState('');
    const [giftToName, setGiftToName] = useState('');
    
    const modal = useRef(null);
    const handleChange = (event) => {
        setGiftName(event.target.value);
      };
      const handleChangeQuantity = (event) => {
        setGiftQuantity(event.target.valueAsNumber);
      };
      const handleChangeUrl = (event) => {
        setGiftUrl(event.target.value);
      };
      const handleGiftToName = (event) => {
        setGiftToName(event.target.value);
      };
      
      const resetFields = () => {
        setGiftName("");
        setGiftQuantity(1);
        setGiftUrl("");
        setGiftToName("");
      };
      
      useEffect(()=>{
        if(edit){
          setGiftName(name)
          setGiftQuantity(quantity)
          setGiftToName(giftTo)
          setGiftUrl(img_url)
        }
        
      },[])
    return(
        
            <dialog open className={styles.modal__dialog} ref={modal}>
                
             <div className={styles.inputs}>
            <h3 className={styles.modal__title}>AGREGAR UN NUEVO REGALO</h3>
            <input
                type="text"
                name="regalo"
                placeholder="Introduzca el regalo"
                value={giftName}
                onChange={handleChange}
                className={styles.input__name}
            />
            <input
                type="number"
                name="cantidad"
                value={giftQuantity}
                onChange={handleChangeQuantity}
                className={styles.input__quantity}
                placeholder="Cantidad"
            />
            <input
                type="text"
                name="image__url"
                value={giftUrl}
                onChange={handleChangeUrl}
                className={styles.input__img_url}
                placeholder="Inserta un url de imagen valido"
            />
            <input
                type="text"
                name="gift__to"
                value={giftToName}
                onChange={handleGiftToName}
                className={styles.input__gift__to}
                placeholder="Ingresa al destinatario del regalo"
            />
            {edit ? (
                <input
                type="submit"
                value="EDIT"
                  onClick={() =>{

                    editGift(indexToEdit, giftName, giftQuantity, giftUrl, giftTo)
                    handleEditFalse()
                  }
                  }
                className={styles.submit}
                disabled={!giftQuantity | (giftQuantity < 0)}
                />
            ) : (
                <input
                type="submit"
                value="ADD"
                onClick={() => addGifts(giftName, giftQuantity, giftUrl, giftToName)}
                className={styles.submit}
        
                disabled={!giftQuantity | (giftQuantity < 0)}
                />
            )}
            </div>
            <button
            onClick={() => {
                show();
                // setEdit(false);
                handleEditFalse()
                resetFields();
            }}
            className={styles.close__dialog}
            >
            Volver
            </button> 
            
        </dialog>
       
    );
}
export default Modal;
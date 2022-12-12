import { useEffect, useRef, useState } from "react";
import styles from "./GiftList.module.css";
export function GiftList() {
  const [gifts, setGifts] = useState([{ name: "",quantity:1,img_url:'https://images.emojiterra.com/google/noto-emoji/v2.038/share/1f381.jpg' }]);
  const [giftName, setGiftName] = useState();
  const [giftQuantity, setGiftQuantity] = useState();
  const [giftUrl,setGiftUrl]=useState()
  const [modalVisibility,setModalVisibility]=useState(false);
  const modal=useRef(null);
  const addGifts = (name,quantity,img_url) => {
    const defaultUrl='https://images.emojiterra.com/google/noto-emoji/v2.038/share/1f381.jpg';
    if (
      giftName.length > 0
    ) {
        if(gifts.filter((gift) => gift.name === name).length === 0){
          if(verifyUrl(img_url)){

            localStorage.setItem(
              "gifts",
              JSON.stringify([...gifts, { name,quantity,img_url }])
              );
              setGifts((prevArray) => [...prevArray, { name,quantity,img_url }]);
            }
            else{
              localStorage.setItem(
                "gifts",
                JSON.stringify([...gifts, { name,quantity,img_url:defaultUrl }])
                );
                setGifts((prevArray) => [...prevArray, { name,quantity,img_url:defaultUrl }]);
          }
            setGiftName("");
            setGiftQuantity(1)
            setGiftUrl("")
        }
        else{
            const newGifts = gifts.map(({name,quantity})=>{
                if(name===giftName){
                    quantity+=giftQuantity
                }
                return {
                    name,
                    quantity
                }
            });
            
            localStorage.removeItem("gifts");
            localStorage.setItem("gifts", JSON.stringify([...newGifts]));
            setGifts((prevArray) => [...newGifts]);
        }
        show()
    }
  };
  const handleChange = (event) => {
    setGiftName(event.target.value);
  };
  const handleChangeQuantity = (event) => {
    setGiftQuantity(event.target.valueAsNumber);
  };
  const handleChangeUrl=(event)=>{
    setGiftUrl(event.target.value)
  }
  const verifyUrl=(url)=>{ 
    
   if(url.endsWith('png')||url.endsWith('jpg')||url.endsWith('PNG')||url.endsWith('JPG')){
    return true
   }
   else return false;
  }
  const deleteGift = (index) => {
    const newGifts = [...gifts];
    newGifts.splice(index, 1);
    localStorage.removeItem("gifts");
    localStorage.setItem("gifts", JSON.stringify([...newGifts]));
    setGifts((prevArray) => [...prevArray.filter((_, pos) => pos !== index)]);
  };
  const deleteAll = () => {
    setGifts((prevArray) => []);
    localStorage.removeItem("gifts");
  };
  const show=()=>{
    if(modalVisibility)
      modal.current?.close();
    else
      modal.current?.showModal();
    setModalVisibility((prev)=>!prev)
  }
  useEffect(() => {
    setGifts([])
    const gifts = localStorage.getItem("gifts");
    if (gifts) {
      setGifts(JSON.parse(gifts));
    }
    console.log("montado");
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Regalos:</h2>
        <button onClick={()=>show()}>SHOW DIALOG</button>
        <div className={styles.gifts}>
          {gifts.length === 0 ? (
            <p className={styles.noGifts}>AUN NO HAY REGALOS!</p>
          ) : (
            gifts.map((gift, index) => {
              return (
                <div key={`giftBox ${index}`} className={styles.giftBox}>
                  <img src={gift.img_url} alt="imagen" className={styles.img__gift} />
                  <p key={index} className={styles.gift}>
                    {gift.name}  <b>({gift.quantity})</b>
                  </p>
                  <button
                    key={`button ${index}`}
                    onClick={() => deleteGift(index)}
                    className={styles.delete__button}
                  >
                    X
                  </button>
                </div>
              );
            })
          )}
          {gifts.length === 0 ? (
            ""
          ) : (
            <button className={styles.delete__all} onClick={() => deleteAll()}>
              BORRAR TODO
            </button>
          )}
        </div>
      </div>
      <dialog className={styles.modal__dialog} ref={modal}>
      <div className={styles.inputs}>
          <input
            type="text"
            name="regalo"
            placeholder="Introduzca el regalo"
            value={giftName}
            onChange={handleChange}
            className={styles.input__name}
          />
          <input type="number" name="cantidad" value={giftQuantity} onChange={handleChangeQuantity}  className={styles.input__quantity} placeholder='Cantidad' />
          <input type="text" name="image__url" value={giftUrl} onChange={handleChangeUrl} className={styles.input__img_url} placeholder="Inserta un url de imagen valido"  />
          <input
            type="submit"
            value="ADD"
            onClick={() => addGifts(giftName,giftQuantity,giftUrl)}
            className={styles.submit}
            disabled={!giftQuantity|giftQuantity<0}
          />
        </div>
        <button onClick={()=>show()}>CLOSE DIALOG</button>
      </dialog>
      
      
    </div>
  );
}

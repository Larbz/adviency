import { useEffect, useRef, useState } from "react";
import styles from "./GiftList.module.css";
export function GiftList() {
  
  const [gifts, setGifts] = useState([
    {
      name: "",
      quantity: 1,
      img_url:
        "https://images.emojiterra.com/google/noto-emoji/v2.038/share/1f381.jpg",
      giftTo: "",
    },
  ]);
  const [giftName, setGiftName] = useState();
  const [giftQuantity, setGiftQuantity] = useState();
  const [giftUrl, setGiftUrl] = useState();
  const [giftTo, setGiftTo] = useState();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [edit,setEdit]=useState(false)
  const [indexToEdit,setIndexToEdit]=useState()
  const modal = useRef(null);
  const addGifts = (name, quantity, img_url, giftTo) => {
    const defaultUrl =
      "https://images.emojiterra.com/google/noto-emoji/v2.038/share/1f381.jpg";
    if ((giftName.length > 0) & (giftTo.length > 0)) {
      if (gifts.filter((gift) => gift.name === name).length === 0) {
        if (verifyUrl(img_url)) {
          localStorage.setItem(
            "gifts",
            JSON.stringify([...gifts, { name, quantity, img_url, giftTo }])
          );
          setGifts((prevArray) => [
            ...prevArray,
            { name, quantity, img_url, giftTo },
          ]);
        } else {
          localStorage.setItem(
            "gifts",
            JSON.stringify([...gifts, { name, quantity, img_url: defaultUrl,giftTo }])
          );
          setGifts((prevArray) => [
            ...prevArray,
            { name, quantity, img_url: defaultUrl,giftTo },
          ]);
        }
        setGiftName("");
        setGiftQuantity(1);
        setGiftUrl("");
        setGiftTo("");
      } else {
        const newGifts = gifts.map(({ name, quantity, img_url, giftTo }) => {
          if (name === giftName) {
            quantity += giftQuantity;
          }
          return {
            name,
            quantity,
            img_url,
            giftTo,
          };
        });

        localStorage.removeItem("gifts");
        localStorage.setItem("gifts", JSON.stringify([...newGifts]));
        setGifts((prevArray) => [...newGifts]);
      }
      show();
    }
  };
  const handleChange = (event) => {
    setGiftName(event.target.value);
  };
  const handleChangeQuantity = (event) => {
    setGiftQuantity(event.target.valueAsNumber);
  };
  const handleChangeUrl = (event) => {
    setGiftUrl(event.target.value);
  };
  const handleGiftTo = (event) => {
    setGiftTo(event.target.value);
  };
  const resetFields=()=>{
    setGiftName("");
    setGiftQuantity(1);
    setGiftUrl("");
    setGiftTo("");
  }
  const verifyUrl = (url) => {
    if (
      url.endsWith("png") ||
      url.endsWith("jpg") ||
      url.endsWith("PNG") ||
      url.endsWith("JPG")
    ) {
      return true;
    } else return false;
  };
  const deleteGift = (index) => {
    const newGifts = [...gifts];
    newGifts.splice(index, 1);
    localStorage.removeItem("gifts");
    localStorage.setItem("gifts", JSON.stringify([...newGifts]));
    setGifts((prevArray) => [...prevArray.filter((_, pos) => pos !== index)]);
  };
  const startEdit=(index)=>{
    const newGifts=[...gifts]
    setIndexToEdit(index)
    setGiftName(newGifts[index].name);
    setGiftQuantity(newGifts[index].quantity);
    setGiftUrl(newGifts[index].img_url);
    setGiftTo(newGifts[index].giftTo);
  }
  const editGift=(index,name, quantity, img_url, giftTo)=>{
    const newGifts=[...gifts]
    newGifts[index]={name,quantity,img_url,giftTo}
    localStorage.removeItem("gifts")
    localStorage.setItem("gifts", JSON.stringify([...newGifts]));
    setGifts((prevArray) => [...newGifts]);
    resetFields()
    show()
  }
  const deleteAll = () => {
    setGifts((prevArray) => []);
    localStorage.removeItem("gifts");
  };
  const show = () => {
    if (modalVisibility) modal.current?.close();
    else modal.current?.showModal();
    setModalVisibility((prev) => !prev);
  };
  useEffect(() => {
    setGifts([]);
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
        <button onClick={() => show()} className={styles.addGifts}>
          AGREGAR REGALOS!
        </button>
        <div className={styles.gifts}>
          {gifts.length === 0 ? (
            <p className={styles.noGifts}>AUN NO HAY REGALOS!</p>
          ) : (
            gifts.map((gift, index) => {
              return (
                <div key={`giftBox ${index}`} className={styles.giftBox}>
                  <img
                    src={gift.img_url}
                    alt="imagen"
                    className={styles.img__gift}
                  />
                  <div className={styles.gift__info}>
                    <p key={index} className={styles.gift}>
                      {gift.name}
                    </p>
                    <p className={styles.gift__destinatary}>{gift.giftTo}</p>
                  </div>
                  <b>({gift.quantity})</b>
                  <div className={styles.gift__buttons}>

                    <button className={styles.edit__button} onClick={()=>{
                                                                          show()
                                                                          setEdit(true)
                                                                          startEdit(index)}}>
                      <div  alt="" className={styles.edit__button__img} />
                    </button>
                    <button
                      key={`button ${index}`}
                      onClick={() => deleteGift(index)}
                      className={styles.delete__button}
                    >
                      <div className={styles.delete__button__img}/>
                      
                    </button>
                  </div>
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
            value={giftTo}
            onChange={handleGiftTo}
            className={styles.input__gift__to}
            placeholder="Ingresa al destinatario del regalo"
          />
          {edit?
          <input
            type="submit"
            value="EDIT"
            onClick={() => editGift(indexToEdit,giftName, giftQuantity, giftUrl, giftTo)}
            className={styles.submit}
            disabled={!giftQuantity | (giftQuantity < 0)}
          />:
          
          <input
            type="submit"
            value="ADD"
            onClick={() => addGifts(giftName, giftQuantity, giftUrl, giftTo)}
            className={styles.submit}
            disabled={!giftQuantity | (giftQuantity < 0)}
          />
          }
        </div>
        <button onClick={() => {show()
                                setEdit(false)
                                resetFields()}} className={styles.close__dialog}>
          Volver
        </button>
      </dialog>
    </div>
  );
}

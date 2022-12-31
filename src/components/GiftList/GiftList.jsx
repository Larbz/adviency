import { useEffect, useRef, useState } from "react";
import GiftBox from "../GiftBox/GiftBox";
import Modal from "../Modal/Modal";
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
  const [edit, setEdit] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [indexToFocus,setIndexToFocus]=useState(0);
  const [keyPressed,setKeyPressed]=useState(false);
  // const modal = useRef(null);
  const addbox=useRef(null);
  const deleteAllBox=useRef(null);
  const giftsContainer=useRef(null);
  const accessButtons=useRef([]);

  const addGifts = (name, quantity, img_url, giftTo) => {
    const defaultUrl =
      "https://images.emojiterra.com/google/noto-emoji/v2.038/share/1f381.jpg";
    if ((name.length > 0) & (giftTo.length > 0)) {
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
            JSON.stringify([
              ...gifts,
              { name, quantity, img_url: defaultUrl, giftTo },
            ])
          );
          setGifts((prevArray) => [
            ...prevArray,
            { name, quantity, img_url: defaultUrl, giftTo },
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
  const resetFields = () => {
    setGiftName("");
    setGiftQuantity(1);
    setGiftUrl("");
    setGiftTo("");
  };
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
  const handleEditTrue=()=>{
    setEdit(prev=>true)
  }
  const handleEditFalse=()=>{
    setEdit(prev=>false)
  }
  const startEdit = (index) => {
    show()
    const newGifts = [...gifts];
    setIndexToEdit(index);
    console.log(indexToEdit)
    console.log(newGifts[index].name)
    console.log(newGifts[index].quantity)
    console.log(newGifts[index].img_url)
    console.log(newGifts[index].giftTo)
    setGiftName(newGifts[index].name);
    setGiftQuantity(newGifts[index].quantity);
    setGiftUrl(newGifts[index].img_url);
    setGiftTo(newGifts[index].giftTo);
  };
  const editGift = (index, name, quantity, img_url, giftTo) => {
    
    const newGifts = [...gifts];
    newGifts[index] = { name, quantity, img_url, giftTo };
    localStorage.removeItem("gifts");
    localStorage.setItem("gifts", JSON.stringify([...newGifts]));
    setGifts((prevArray) => [...newGifts]);
    resetFields();
    show();
  };
  const deleteAll = () => {
    setGifts((prevArray) => []);
    localStorage.removeItem("gifts");
  };
  const show = () => {
    setModalVisibility((prev) => !prev);
  };
  // document.addEventListener("keydown",(e)=>{
   
  //   if(!keyPressed){
  //     // console.log(accessButtons.current)
  //     setKeyPressed(true)
  //     if(e.code==='KeyA')
  //     {
  //       console.log('just one time')
  //       addbox.current.focus()
        
  //     }
  //     else if(e.code==='KeyB')
  //       deleteAllBox.current.focus()
  //     else if(e.code==='ArrowRight'){

  //       setIndexToFocus(prev=>prev+1)
  //       accessButtons.current[indexToFocus].focus()
  //     }
  //     else if(e.code==='ArrowLeft')
  //       {
          
  //       setIndexToFocus(prev=>prev-1)
  //       accessButtons.current[indexToFocus].focus()
  //       }
  //   }
  // })
  // document.addEventListener("keyup",(e)=>{
  //   console.log('asd')
    
  //   setKeyPressed(false);
  // })
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
        <button ref={addbox} tabIndex="-1" onClick={() => show()} className={styles.addGifts}>
          AGREGAR REGALOS!
        </button>
        <div className={styles.gifts} ref={giftsContainer}>
          {gifts.length === 0 ? (
            <p className={styles.noGifts}>AUN NO HAY REGALOS!</p>
          ) : (
            gifts.map((gift, index) => {
              return (
                <GiftBox key={index} index={index} {...gift} handleEditTrue={handleEditTrue} handleEditFalse={handleEditFalse} deleteGift={deleteGift} startEdit={startEdit}  editGift={editGift}/>
              );
            })
          )}
        </div>
        {gifts.length === 0 ? (
            ""
          ) : (
            <button ref={deleteAllBox} tabIndex="-1" className={styles.delete__all} onClick={() => deleteAll()}>
              BORRAR TODO
            </button>
          )}
      </div>
      {modalVisibility===true?<Modal show={show} addGifts={addGifts} indexToEdit={indexToEdit} edit={edit} {...gifts[indexToEdit]} handleEditFalse={handleEditFalse} handleEditTrue={handleEditTrue} editGift={editGift}/>:''}
      
    </div>
  );
}

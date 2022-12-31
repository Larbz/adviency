import { useEffect, useRef, useState } from "react";
import styles from "./GiftBox.module.css";
const GiftBox=({index,img_url,name,quantity,giftTo,deleteGift,startEdit,editGift,handleEditTrue,handleEditFalse})=>{

    return (
        <div key={`giftBox ${index}`} className={styles.giftBox}>
        <img
          src={img_url}
          alt="imagen"
          className={styles.img__gift}
        />
        <div className={styles.gift__info}>
          <p key={index} className={styles.gift} title={name}>
            {name}
          </p>
          <p className={styles.gift__destinatary}>{giftTo}</p>
        </div>
        <b>({quantity})</b>
        <div className={styles.gift__buttons}>
          <button tabIndex='0'
            className={styles.edit__button}
            onClick={() => {
              // show();
              // setEdit(true);
              startEdit(index)
              handleEditTrue()
              // editGift(index,name,quantity,img_url,giftTo)
            }}
            // ref={el => accessButtons.current[index+index*1] = el} 
          >
            <div alt="" className={styles.edit__button__img} />
          </button>
          <button tabIndex='0'
            key={`button ${index}`}
            onClick={() => deleteGift(index)}
            className={styles.delete__button}
            // ref={el => accessButtons.current[index+index*1+1] = el} 
          >
            <div className={styles.delete__button__img} />
          </button>
        </div>
      </div>
    );
}
export default GiftBox
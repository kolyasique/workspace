/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../../context/Profile.context';
import { showToast } from '../../../lib/toasti';
import './ProfileForms.css';
import cl from './Avatar.module.css';

export default function ChangeAvatar() {
  const {
    userInfo, setUserInfo, img, setImg, userAvatar, setUserAvatar,
  } = useContext(ProfileContext);

  // const { user } = useSelector((store) => store.userStore);

  // console.log(userInfo.phone, 'user user uis info');
  // console.log(formInitialState);
  // console.log(form);

  // ; setForm(formInitialState);
  const uploudImg = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    // try {
    e.preventDefault();
    const data12 = new FormData();
    data12.append('avatar', img);
    console.log(img, 'это имг');
    // data.append('form', JSON.stringify(form));
    if (img !== null) {
      const url = 'http://localhost:6622/api/avatar';
      fetch(url, {
        method: 'POST',
        credentials: 'include',
        // headers: {
        //   'content-type': 'multipart/form-data',
        // },
        body: data12,
      })
        .then((res) => res.json())
        .then((newdata) => {
          console.log(newdata);
          setUserInfo({
            avatar: newdata.findThisUser.avatar,
          });
          // setImg(null);
          showToast({ message: 'Файл загружен', type: 'success' });
        });
    } else { showToast({ message: 'Добавьте файл!', type: 'warning' }); }
  };

  return (

    <div className="containerChanges">
      {userInfo.avatar === null ? (
        <div className="profileAvatar"><img className="imgProfile" src="https://www.meme-arsenal.com/memes/5eae5104f379baa355e031fa1ded886c.jpg" alt="авaтарка" /></div>
        //
        // https://www.meme-arsenal.com/memes/31ce45559a80470ce5aadd5ef3983555.jpg
      ) : (
        <div className="profileAvatar"><img className="imgProfile" src={`http://localhost:6622/${userInfo.avatar}`} alt="аватарка" /></div>
      )}
      <form className="changeAva" onSubmit={handleSubmit}>
        <div className={cl.docForm}>
          <h3 className="formLabel13">Изменить аватар</h3>
          <input className={cl.downloadFile} type="file" name="file" onChange={uploudImg} />
          <button type="submit" className={cl.submitDownload}>Загрузить</button>
        </div>
      </form>
    </div>
  );
}

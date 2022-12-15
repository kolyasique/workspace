import React, { useEffect, useState, useContext } from 'react';
import cl from './WorkersComponent.module.css';
import { MainContext } from '../../../../context/Main.context';

export default function WorkersComponent() {
  const [companyWorkers, setCompanyWorkers] = useState([]);
  const { state } = useContext(MainContext);
  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/getworkers', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setCompanyWorkers(data));
  }, []);
  return (

    <div className={cl.workerListDiv}>
      {companyWorkers.map((worker) => (
        <div className={worker.id === state.authUser.id ? cl.workerDivMe : cl.workerDiv}>
          <div>
            {worker.avatar === null ? (
              <div className={cl.circleAvatar}><img className={cl.img} src="https://sribu-sg.s3.amazonaws.com/assets/media/avatar/sukmaumbaran/AVA.png" alt="аватарка" /></div>
            ) : (
              // <div className={cl.circleAvatar}><p>{worker.avatar}</p></div>
              <div className={cl.circleAvatar}><img className={cl.img} src={`http://localhost:6622/${worker.avatar}`} alt="аватарка" /></div>
            )}
          </div>
          <div className={cl.workerSeconName}>{worker.second_name}</div>
          <div className={cl.workerSeconName}>{worker.name}</div>
          <div className={cl.workerSeconName}>{worker.patronymic}</div>
          <div className={cl.workerContacts}>
            <div className={cl.workerPhone}>{worker.phone}</div>
            <div className={cl.MailTo}><a className={cl.MailTo} href={`mailto:${worker.email}`}>{worker.email}</a></div>
          </div>
          {/* {
          worker.id === state.authUser.id ? (
            null
          ) : (<button type="button">Написать</button>)
          } */}

        </div>
      ))}

    </div>

  );
}

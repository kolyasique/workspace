/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import './Clients.css';
import CreateClientTask from './UI/CreateClientTask';
import ClientDocuments from './UI/ClientDocuments';
import ModalClient from './ModalClient';

export default function Clients() {
  const [component, setComponent] = useState(null);
  const [clients, setClients] = useState([]);
  const [clientTasks, setClientTasks] = useState([]);
  const [visibleModalForOrder, setVisibleModalForOrder] = useState(false);
  const abortController = new AbortController();

  const [findClient, setFindClient] = useState({ query: '' });

  const findClients = clients.filter((el) => (el.name.toLowerCase() + String(el.inn) + el.email + el.adress.toLowerCase()).includes(findClient.query.toLowerCase()));
  // const handeleInput = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };
  const handleClick = async (e) => {
    try {
      console.log(e, 'Создать заявку');
      setVisibleModalForOrder(true);
    } catch (error) {
      console.log(error);
      // showToast({ message: 'Не получилось', type: 'error' });
    }
  };

  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/getclients', {
      credentials: 'include',
      // ручка за которую у нас цепляется abortcontroller
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/gettasks', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setClientTasks(data.allTasks);
        // setAllWorkers(data.workers);
      });
  }, []);
  // const getUserDays = (userCreationDay) => {
  //   const date = new Date();
  //   const timeDiff = Math.abs(date.getTime() - userCreationDay.getTime());
  //   const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //   return console.log(diffDays);
  // };

  function getUserDays(userCreationDay) {
    const date1 = new Date(userCreationDay);
    const date2 = new Date();

    const timeDiff = date2.getTime() - date1.getTime();

    const diffDaysRound = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDaysRound;
  }
  return (
    <div className="clientListDiv">
      <div className="clientPanel">
        <input type="text" id="searchfilter" value={findClient.query} onChange={(e) => { setFindClient({ query: e.target.value }); }} placeholder="Поиск клиента (по инн или названию)" />
      </div>
      {findClients.map((client) => (
        <div key={client.id} className="clientItem">
          <div className="clientInfo">
            <div className="clientInfoHead">
              <div className="clientInn">{client.inn}</div>
              <div className="clientName">{client.name}</div>
              <div className="clientPartnershipAge">
                {`С нами уже: ${getUserDays(client.createdAt)} дня`}
              </div>
            </div>
            <div>{`адрес: ${client.adress}`}</div>

            <div>{client.email}</div>
            {/* <div>
              {clientTasks.filter((task)=>)map((el))
              }</div> */}
            {/* <button type="button" value={client.createdAt} onClick={(e) => { getUserDays(e.target.value); }}>SKOLKO</button> */}
          </div>
          {/* <input type="file" onChange={uploudImg} />
          <button type="submit" id={client.id} onClick={handleSubmit}>Загрузить документ</button> */}
          <button type="button" id={client.id} onClick={(e) => { handleClick(e); setComponent(<CreateClientTask />); }}>Создать задачу</button>
          <button type="button" id={client.id}>Взаимодействие</button>
          <button type="button" id={client.id} onClick={(e) => { handleClick(e); setComponent(<ClientDocuments client={client} />); }}>Документы</button>
          <button type="button" id={client.id}>Удалить</button>
        </div>
      ))}
      <ModalClient visible={visibleModalForOrder} setVisible={setVisibleModalForOrder}>
        {component}
      </ModalClient>
    </div>
  );
}

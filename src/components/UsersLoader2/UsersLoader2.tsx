import React, { useEffect, useState, ChangeEvent } from 'react';
import { getUsers } from './../api/api'
import { Spinner } from '../Spinner/Spinner'
import UserPhoto from '../UserPhoto/UserPhoto';
import styles from '../UsersLoader2/UserLoader2.module.css'
import './style.css'
import { MouseCoordinates } from '../MouseCoordinates/MouseCoordinates';
import { WindowSize } from '../WindowSize/WindowSize';

export type TUser = {
   name: {
      first: string;
      last: string;
   };
   login: {
      uuid: string;
   }
   phone: string;
   picture: {
      large: string;
   }
}

export interface ILoader {
   users: TUser[];
   isFetching: boolean;
   isError: boolean;
   page: number;
   nationality: string;
   selectedUser: TUser | null;
}

export const UsersLoader2: React.FC = () => {
   const [state, setState] = useState<ILoader>({
      users: [],
      isFetching: false,
      isError: false,
      page: 1,
      nationality: 'ua',
      selectedUser: null
   });

   useEffect(() => {
      load();
   }, [state.page, state.nationality]);


   // componentDidMount() {
   //    console.log('componentDidMount')
   //    this.load();
   // }

   // componentDidUpdate(prevProps: {}, prevState: ILoader): void {
   //    console.log('componentDidUpdate')
   //    if (prevState.page === this.state.page) { return; }
   //    this.load();
   // }

   const load = () => {
      const { page, nationality } = state;
      setState(prevState => ({ ...prevState, isFetching: true }));
      getUsers({ nat: nationality, page: page })
         .then(data => {
            console.log(data);
            setState(prevState => ({ ...prevState, users: data.results }));
         })
         .catch((error: Error) => {
            setState(prevState => ({ ...prevState, isError: true }));
         })
         .finally(() => {
            setState(prevState => ({ ...prevState, isFetching: false }));
         });
   };

   const prevPage = () => {
      if (state.page > 1) {
         setState(prevState => ({ ...prevState, page: prevState.page - 1 }));
      }
   }

   const nextPage = () => {
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
   }

   const showUser = (user: TUser) => (
      <li key={user.login.uuid} onClick={() => setState(prevState => ({ ...prevState, selectedUser: user }))}>
         {`${user.name.first} ${user.name.last}`}
      </li>
   )

   const changeNat = (e: ChangeEvent<HTMLSelectElement>) => {
      setState({ ...state, nationality: e.target.value });
      load();
   };

   const { users, isFetching, selectedUser } = state;

   return (
      <>
         <div>
            <MouseCoordinates />
            <WindowSize />
         </div>
         <div className={styles.container}>
            {isFetching && <Spinner />}
            <section className={styles.userList}>
               <h2>User List</h2>
               <button onClick={prevPage}>{"<"}</button>
               <button onClick={nextPage}>{">"}</button>
               <span>page; {state.page}</span>
               <select value={state.nationality} onChange={changeNat}>
                  <option value="ua">UA</option>
                  <option value="gb">GB</option>
                  <option value="nz">NZ</option>
                  <option value="dk">DK</option>
                  <option value="fr">FR</option>
                  <option value="ir">IR</option>
               </select>
               <ul className='users-list'>
                  {users.map(user => (
                     <li className='users-text'>{showUser(user)}</li>
                  ))}
               </ul>
               <div className='user-photo'>{selectedUser && <UserPhoto user={selectedUser} />}</div>
            </section >
         </div >
      </>
   );
}

   ;

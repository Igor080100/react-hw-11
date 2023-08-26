import React, { Component, ChangeEvent } from 'react';
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

export class UsersLoader2 extends Component<{}, ILoader> {
   constructor(props: {}) {
      super(props);
      this.state = {
         users: [],
         isFetching: false,
         isError: false,
         page: 1,
         nationality: 'ua',
         selectedUser: null
      }
   }
   load = () => {
      const { page, nationality } = this.state;
      this.setState({
         isFetching: true
      })
      getUsers({ nat: nationality, page: page })
         .then(data => {
            console.log(data)
            this.setState({
               users: data.results,
            })
         })
         .catch((error: Error) => {
            this.setState({ isError: true })
         })
         .finally(() => {
            this.setState({ isFetching: false })
         })
   }

   componentDidMount() {
      console.log('componentDidMount')
      this.load();
   }

   componentDidUpdate(prevProps: {}, prevState: ILoader): void {
      console.log('componentDidUpdate')
      if (prevState.page === this.state.page) { return; }
      this.load();
   }

   prevPage = () => {
      if (this.state.page > 1) {
         this.setState({
            page: this.state.page - 1
         });
      }
   }
   nextPage = () => {
      this.setState({
         page: this.state.page + 1
      })
   }

   showUser = (user: TUser) => (
      <li key={user.login.uuid} onClick={() => this.setState({ selectedUser: user })}>
         {`${user.name.first} ${user.name.last}`}
      </li>
   )


   changeNat = (e: ChangeEvent<HTMLSelectElement>) => {
      this.setState({ nationality: e.target.value }, () => {
         this.load();
      });
   }
   render() {
      console.log('render')
      // if (this.state.isFetching) {
      //    return <Spinner />
      // }
      if (this.state.isError) {
         return <p>Error...</p>
      }

      const { users, isFetching, selectedUser } = this.state;
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
                  <button onClick={this.prevPage}>{"<"}</button>
                  <button onClick={this.nextPage}>{">"}</button>
                  <span>page; {this.state.page}</span>
                  <select value={this.state.nationality} onChange={this.changeNat}>
                     <option value="ua">UA</option>
                     <option value="gb">GB</option>
                     <option value="nz">NZ</option>
                     <option value="dk">DK</option>
                     <option value="fr">FR</option>
                     <option value="ir">IR</option>
                  </select>
                  <ul className='users-list'>
                     {users.map(user => (
                        <li className='users-text'>{this.showUser(user)}</li>
                     ))}
                  </ul>
                  <div className='user-photo'>{selectedUser && <UserPhoto user={selectedUser} />}</div>
               </section >
            </div >
         </>
      );
   }
}


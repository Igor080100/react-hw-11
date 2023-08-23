import React, { Component, ChangeEvent } from 'react';
import { getUsers } from './../api/api'


type TUser = {
   name: {
      first: string;
      last: string;
   };
   login: {
      uuid: string;
   }
   phone: number;
}

export interface ILoader {
   users: Array<TUser>;
   isFetching: boolean;
   isError: boolean;
   page: number;
   nationality: any;
}

export class UsersLoader2 extends Component<{}, ILoader> {
   constructor(props: {}) {
      super(props);
      this.state = {
         users: [],
         isFetching: true,
         isError: false,
         page: 1,
         nationality: 'ua'
      }
      console.log('constructor')
   }

   load = () => {
      const { page, nationality } = this.state;
      getUsers({ nat: nationality, page: page })
         .then(data => {
            console.log(data)
            this.setState({
               users: data.results,
            })
         })
         .catch((error: Error) => {
            this.setState({ isError: true, })
         })
         .finally(() => {
            this.setState({ isFetching: false })
         })
   }

   componentDidMount(): void {
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

   showUser = (user: TUser) => <li key={user.login.uuid}>{`${user.name.first} ${user.name.last}`}: {user.phone}</li>

   changeNat = (e: ChangeEvent<HTMLSelectElement>) => {
      this.setState({ nationality: e.target.value }, () => {//
         this.load();
      });
   }
   render() {
      console.log('render')
      if (this.state.isFetching) {
         return <p>Loading...</p>
      }
      if (this.state.isError) {
         return <p>Error...</p>
      }
      return (
         <section>
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
            <ul>{this.state.users.map(this.showUser)}</ul>
         </section >
      );
   }
}


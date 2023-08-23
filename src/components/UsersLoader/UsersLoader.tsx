import React, { Component } from 'react';



type TUser = {
   name: {
      first: string;
      last: string;
   };
   login: {
      uuid: string;
   }
}

interface ILoader {
   users: Array<TUser>;
   isFetching: boolean;
   isError: boolean;
   page: number;
}

export class UsersLoader extends Component<{}, ILoader> {
   constructor(props: {}) {
      super(props);
      this.state = {
         users: [],
         isFetching: true,
         isError: false,
         page: 1
      }
      console.log('constructor')
   }

   componentDidMount(): void {
      const { page } = this.state;
      this.setState({ isFetching: true })
      console.log('componentDidMount')
      // fetch('https://randomuser.me/api')
      fetch(`https://randomuser.me/api?results=10&seed=abc&nat=ua&page=${page}`)
         .then(response => response.json())
         .then(data => {
            console.log(data)
            this.setState({
               users: data.results,
            })
         })
         .catch(error => {
            this.setState({ isError: true, })
         })
         .finally(() => {
            this.setState({ isFetching: false })
         })
   }
   componentDidUpdate(prevProps: any, prevState: any) {
      if (prevState.page === this.state.page) { return }
      const { page } = this.state;
      console.log('prevState: ' + prevState.page + 'currentState ' + page)
      fetch(`https://randomuser.me/api?results=10&seed=abc&nat=ua&page=${page}`)
         .then(response => response.json())
         .then(data => {
            console.log(data)
            this.setState({
               users: data.results,
            })
         })
         .catch(error => {
            this.setState({ isError: true, })
         })
         .finally(() => {
            this.setState({ isFetching: false })
         })
      console.log('componentDidUpdate')
   }
   prevPage = () => {
      this.setState({
         page: this.state.page - 1
      })
   }
   nextPage = () => {
      this.setState({
         page: this.state.page + 1
      })
   }
   showUser = (user: TUser) => <li key={user.login.uuid}>{`${user.name.first} ${user.name.last}`}</li>
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
            {/* <ul>{this.state.users.map(user => <li>{JSON.stringify(user)}</li>)}</ul> */}
            <ul>{this.state.users.map(this.showUser)}</ul>
         </section >
      );
   }
}


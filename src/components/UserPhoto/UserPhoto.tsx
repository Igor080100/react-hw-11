import React, { Component } from 'react';
import { TUser } from '../../components/UsersLoader2/UsersLoader2';
interface IUserDetailProps {
   user: TUser;
}

class UserDetail extends Component<IUserDetailProps> {
   render() {
      const { user } = this.props;

      return (
         <div>
            <h3>{`${user.name.first} ${user.name.last}`}</h3>
            <img src={user.picture.large} />
            <p>Phone: {user.phone}</p>
         </div>
      );
   }
}

export default UserDetail;
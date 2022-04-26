import React, {useEffect} from "react";
import {useDispatch, useSelector}
  from "react-redux";
import * as service
  from '../../services/user-service';
import UserListItem from "./user-list-item";

const UserList = () => {
  const users = useSelector(
      state => state.users);
  const dispatch = useDispatch();
  const findAllUsers = async () => {
    const users = await service.findAllUsers();
    dispatch({
      type: 'FIND_ALL_USERS',
      users: users
    });
  }
  useEffect(findAllUsers, [dispatch]);
  
  return (
      <div className="mt-5">
      <ul className="list-group">
        {
          // TODO filter following / followers when log in feature works
            users.map && users.map(user =>
                <UserListItem key={user._id}
                              user={user}/>)
        }


      </ul></div>
  );
}

export default UserList;
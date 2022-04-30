import React from "react";
import UserListItem from "./user-list-item";

const UserList = ({ users = [] }) => {
  return (
    <div className="mt-5">
      <ul className="list-group">
        {users.map &&
          users.map((user) => <UserListItem key={user._id} user={user} />)}
      </ul>
    </div>
  );
};

export default UserList;

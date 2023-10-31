import User from "./User";

function UserList({ data }) {
  console.log(data[0]);
  return (
    <div>
      <ul>
        
          {data.map((i) => (
           <li> <User name={i}></User></li>
          ))}
        
      </ul>
    </div>
  );
}

export default UserList;

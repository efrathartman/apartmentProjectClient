import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "./userSlice";

const AllUsers=()=>{
    console.log(useSelector(state=>state.users));
    const users=useSelector(state=>state.users.users);
    const status=useSelector(state=>state.users.status);
    const dispatch=useDispatch();

    useEffect(()=>{
        console.log('in useeffect');
        if(status!= 'fulfilled')
        console.log("here");
           dispatch(fetchUsers());
           console.log("end");
    },[])
    return(
        <ul>
            {status=='idle' && <p>לא נשלפו עדיין קטגוריות</p>}
            {status=='pending'&& <p>המחיקה מתבצעת</p>}
            {users&& users.map((user,index)=>{
                return(
                    <div key={user.id}>
                        <li>
                            {user.name}
                        </li>
                          {/* <button onClick={()=>dispatch(removeCategory())}>remove</button> */}
                    </div>
                )
            })}
        </ul>
    )

 
}
export default AllUsers
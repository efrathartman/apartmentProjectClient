import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories, removeCategory } from "./categorySlice";

const AllCategories=()=>{
    const categories=useSelector(state=>state.categories.categories);
    const status=useSelector(state=>state.categories.status);
    const dispatch=useDispatch();

    useEffect(()=>{
        console.log('in useeffect');
        if(status!= 'fulfilled')
        console.log("here");
           dispatch(fetchCategories())
           console.log("end");
    },[])
    return(
        <ul>
            {status=='idle' && <p>לא נשלפו עדיין קטגוריות</p>}
            {status=='pending'&& <p>המחיקה מתבצעת</p>}
            {categories&& categories.map((category,index)=>{
                return(
                    <div key={category.id}>
                        <li>
                            {category.description}
                        </li>
                          {/* <button onClick={()=>dispatch(removeCategory())}>remove</button> */}
                    </div>
                )
            })}
        </ul>
    )
 
}
export default AllCategories
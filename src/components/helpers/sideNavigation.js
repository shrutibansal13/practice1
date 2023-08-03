import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SideNavigation() {
    // const mainCategories= ['Electronics', 'Beauty Products', 'Groceries','Home Decor', 'Clothing', 'Accessories','Automobiles']
    const [user,setUser] = useState('')
    const [categories,setCategories] = useState([])
    const [mainCategories,setmainCategories] = useState([])
    const [mainCat,setMainCat] = useState('')
    const [cat_id,setCatId] = useState('')

useEffect(()=>{
    const token= localStorage.getItem('token')
getuser(token)
getallcategories()

},[])


function getuser(token) {
      try {
          
            axios.get('http://localhost:8000/userbyId',{headers: {'Authorization': token}}).then((res) => {
             if(res.status===200) {
                console.log(res.data[0].uname);
              setUser(res.data[0].uname);
            }else{
              console.log(res.data);
            }
            })
          
      }
        catch (error) {
          console.log(error);
        } 
}

function getcategories(maincategory){
  try{
      console.log(maincategory,'xcvbnm');
      axios.get('http://localhost:8000/getcategories?'+ new URLSearchParams({
        type:maincategory
      })).then((res)=>{
        if(res.status===200){
          console.log(res.data.data);
          setCategories(res.data.data)
        }else{
          console.log(res.data);
        }
      })
  } catch(err){
    console.log(err);
  }
}
let fetchcat=[];
function getallcategories(){
  try{

      axios.get('http://localhost:8000/getallcategories').then((res)=>{
        if(res.status===200){
          console.log(res.data.data,"sdfcgvbhnj");
          const alldata= res.data.data
          alldata.forEach(element => {
            fetchcat.push(element.type)
          });
          const data=  fetchcat.filter((category_type,index)=> fetchcat.indexOf(category_type)=== index)
          console.log(data,"datttttttt");
          setmainCategories(data)
        }else{
          console.log(res.data);
        }
      })
  } catch(err){
    console.log(err);
  }
}
const handleSubMenuClick = (event) => {
  const selectedcat= event.target.textContent;
  setMainCat(selectedcat)
  getcategories(selectedcat);
};

function handlecategory(event){
  const category_id = event.target.dataset.value;
  console.log(category_id,"category_id");
  setCatId(category_id)

}

  return (
    // <div className='container '>  
    <Sidebar>
    <div className=''>
            Hello, {user}!
    </div>
    <Menu>
      
    { mainCategories.map((maincategory,index)=>(
      
        <SubMenu label={maincategory} onClick={handleSubMenuClick}>
        {
        categories.map((category)=>(
          <MenuItem component={<Link to='/category/'/>}  data-value={category._id} onClick={handlecategory}>{category.category}</MenuItem>
        ))
      }
        </SubMenu>
    ))}
    </Menu>
    </Sidebar>

  )
}

export default SideNavigation;
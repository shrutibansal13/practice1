import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// toast.configure()

function Home() {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search ,setSearch]  = useState('')
  const [lengthh, setLength] = useState(0);
  var totalpage =0;
  var flag= false;
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  if(lengthh>itemsPerPage){
    totalpage= Math.ceil(lengthh/itemsPerPage);
  }else{
    totalpage=1
  }

  // var itemOffset= (page-1)*itemsPerPage

  useEffect(() => {  
    // searchuser(search)  
    pageddata(search,page,itemsPerPage);
    console.log(page,"page????????????????????");
  }, [page,search])

  function getuser() {
    try {
      axios.get('http://localhost:8000/get').then((res) => {
        // setUsers(res.data);
        setLength(res.data.length);
        console.log(res.data.length,">>>>>>>>>>>>>>>>>>>length");
      })
    }
    catch (error) {
      console.log(error);
    }
  }
 
  function pageddata(search,page,limit) {
    getuser()
      try {
      axios.get('http://localhost:8000/paging?' + new URLSearchParams({
      search:search,
       page:page,
       limit:limit
      })).then((res) => {

        setUsers(res.data);
      

      })
    }
    catch (error) {
      console.log(error);
    }
  }


  function update(id) {
    try {
      console.log(id);
      if (id) {
        navigate(`/update/${id}`)
      }

    }
    catch {

    }
  }

  function deleteuser(id) {
    try {
      axios.delete('http://localhost:8000/delete?' + new URLSearchParams({
        id: id
      })).then((res) => {
        
        // setUsers(res.data);
        console.log(res);
        getuser()
      })
    }
    catch (error) {

    }
  }


  return (
    <div>
      <div className='row py-5 px-5'>

        <h1>Users</h1>
       
        <div className='col-md-6'>
        <input name="search" type="text" placeholder='Search Users' value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
          <br></br><br></br>
          <div className='item-container'>
            <table className="table  table-striped table-bordered">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Actions</th>

                </tr>
              </thead>
              {users && users.filter((item)=>{
                    return search.toLowerCase() === "" ? item : item.uname.toLowerCase().includes(search);  
                 }).map((user) => (
                  
                <tbody>
                  <tr>
                    <td>{user.uname}</td>
                    <td>{user.email}</td>
                    <td>{user.contact}</td>
                    <td>
                      <table className="table  table-striped active">
                        <tbody>
                          <tr>
                            <td> <button type="button" className="btn btn-primary" onClick={() => update(user._id)}>Update </button></td>
                            <td> <button type="button" className="btn btn-danger" onClick={() => deleteuser(user._id)}>Delete</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                </tbody>


              ))}

            </table>
           
        {
        <div className='row px-4 py-1 '>
         
          <ul className="pagination justify-content-center">
            <li className="page-item " style={{display: page === 1 ? 'none' : 'block'}}>
              <button className="page-link" onClick={() =>setPage(page-1)  }>&laquo;</button>
            </li>
            {/* {console.log(totalpage,"totlllll")} */}
            {
              [...Array(totalpage)].map((data, index) => (
                <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''} `}>
                  <button className="page-link" onClick={() => setPage(index + 1)}>{index + 1}</button>
                </li>
              ))
            }
            <li className= "page-item" style={{display: page === totalpage ? 'none' : 'block'}}>
              <button className="page-link" onClick={() => setPage(page+1)}>&raquo;</button>
            </li>
          </ul>
        </div>
}

          </div>
          <br></br>
        </div>
      </div>
    </div>
  )
}

export default Home;
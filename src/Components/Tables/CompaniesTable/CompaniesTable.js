import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import './CompaniesTable.css';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
import AxiosRequest from "../../../axios/AxiosRequest";


// regex for email validation
const validateEmail = (email) => {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}


const CompanyTable = () => {

  const [user, setUser] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  let columns = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Password', field: 'password' }
  ]

  // let data = [
  //   { name: 'manish', username: 'traptrick', email: 'themk85@gmail.com', phone: '9999999999', website: 'https://github.com/traptrick' }
  // ]  

  useEffect(() => {
    AxiosRequest.get(`/coupons/getAllCompanies`)
      .then(res => {
        const users = res.data;
        setUser(users);
        // console.log(users);
      })
  }, [])



  //function for updating the existing row details
  const handleRowUpdate = (newData, oldData, resolve) => {
    //validating the data inputs
    let errorList = []
    if (newData.id !== oldData.id) {
      errorList.push("You can't update the company's id.")
    }
    if (newData.name !== oldData.name) {
      errorList.push("You can't update the company's name.")
    }
    if (newData.email === "" || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email")
    }
    if (newData.password.length < 3) {
      errorList.push("The password must be at least 3 notes long.")
    }
    

    if (errorList.length < 1) {
      AxiosRequest.put(`/coupons/updateCompany`, newData)
        .then(response => {
          const updateUser = [...user];
          const index = oldData.tableData.companyId;
          updateUser[index] = newData;
          setUser([...updateUser]);
          resolve()
          setIserror(false)
          setErrorMessages([])
        })
        .catch(error => {
          setErrorMessages(["There is no company with that id and name. Update failed."])
          setIserror(true)
          resolve()

        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
  }


  //function for deleting a row
  const handleRowDelete = (oldData, resolve) => {
    AxiosRequest.delete(`/coupons/deleteCompany/${oldData.id}`)
      .then(response => {
        const dataDelete = [...user];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setUser([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Server error. Delete failed."])
        setIserror(true)
        resolve()
      })
  }


  //function for adding a new row to the table
  const handleRowAdd = (newData, resolve) => {
    //validating the data inputs
    let errorList = []
    if (newData.id >= "") {
      errorList.push("Please leave the id field empty. Id's are given by the system.")
    }
    if (newData.name === "") {
      errorList.push("Please fill the name field.")
    }
    if (newData.name.length < 3) {
      errorList.push("The name must be at least 3 notes long")
    }
    if (newData.email === "" || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email.")
    }
    if (newData.password.length < 3) {
      errorList.push("The password must be at least 3 notes long.")
    }

    if (errorList.length < 1) {
      // AxiosRequest.get("/coupons/getCouponsByCompany")
      AxiosRequest.post(`/coupons/addCompany`, newData)
        .then(response => {
          let newUserdata = [...user];
          newUserdata.push(newData);
          setUser(newUserdata);
          resolve()
          setErrorMessages([])
          setIserror(false)
        })
        .catch(error => {
          setErrorMessages(["You can't give a new company a name or an email that are already taken. Try again."])
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }


  return (
    <div className="CompanyTable">
      <h1>Companies management:</h1> <br /><br />

      <MaterialTable
        title="Company details:"
        columns={columns}
        data={user}
        options={{
          headerStyle: { borderBottomColor: 'red', borderBottomWidth: '3px', fontFamily: 'verdana' },
          actionsColumnIndex: -1
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);

            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve)
            }),
        }}
      />

      <div>
        {iserror &&
          <Alert severity="error">
            <AlertTitle>ERROR</AlertTitle>
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>
            })}
          </Alert>
        }
      </div>

    </div>
  );
}

export default CompanyTable;

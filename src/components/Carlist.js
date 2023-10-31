import React, {useState, useEffect, useMemo, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Button from '@mui/material/Button';
import Addcar from "./Addcar.js";
import Editcar from "./Editcar.js"
export default function Carlist(){

    const [cars, setCars] = useState([]);

    useEffect(() => fetchData(), []);


    const fetchData = () => {
        fetch('https://carrestapi.herokuapp.com/cars')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => setCars(data._embedded.cars))
          .catch(error => console.error('Error fetching data:', error));
      };
    const deleteCar = (link) =>{
      if (window.confirm(
        "Oletko varma, että haluat poistaa tämän auton?"))
      fetch(link, {method : "DELETE"})
      .then(res => fetchData())
      .catch(err => console.error(err))
    }

    const saveCar = (car) => {
      fetch('https://carrestapi.herokuapp.com/cars', {
        method :'POST',
        headers : { 'Content-Type' :'application/json'},
        body : JSON.stringify(car),
        })
      .then (res => fetchData())
      .catch (err => console.error(err))
    }

    const updateCar  = (car, link) =>{
      fetch(link,{
        method :'PUT',
        headers : { 'Content-Type' :'application/json'},
        body : JSON.stringify(car),
        })
        .then (res => fetchData())
        .catch (err => console.error(err))
    }
    const gridRef = useRef();
    const columns = [
        {field : "brand" , headerName : "Brand", sortable : true, filter : true},
        {field : "model" , headerName : "Model", sortable : true, filter : true},
        {field : "color" , headerName : "Color", sortable : true, filter : true},
        {field : "fuel" , headerName : "Fuel", sortable : true, filter : true},
        {field : "year" , headerName : "Year", sortable : true, filter : true},
        {field : "price" , headerName : "Price", sortable : true, filter : true},
        { field: "_links.self.href", headerName :"", cellRenderer: (params) => {
          return (
            <Editcar updateCar = {updateCar} car = {params.data}/>
          );
        }},
        { field: "_links.self.href", headerName :"", cellRenderer: (params) => {
          return (
            <Button size ="small" color = "secondary" onClick={() => deleteCar(params.value)} className="delete-button">
              Delete
            </Button>
          );
        }}
       
    ]
    const containerStyle = useMemo(() => ({ width: '100%', height: '1000px' }), []);
    const gridStyle = useMemo(() => ({ height: '1000px', width: '100%' }), []);


    return(
      <div style={containerStyle}>
      < Addcar saveCar = {saveCar}/>
      <div style={{ height: '1000px', boxSizing: 'border-box' }}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact 
          ref = {gridRef}
          onGridReady = {params => gridRef.current = params.api}
          rowSelection = "single"
          rowData={cars} 
          columnDefs={columns} />
        </div>
      </div>
    </div>
    )
}
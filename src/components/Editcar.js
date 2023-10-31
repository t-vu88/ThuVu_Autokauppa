import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditCar(props){
    const [open, setOpen] = React.useState(false);

    const [car, setCar] = React.useState({
        brand : "", 
        model:"",
        color : "", 
        fuel: "", 
        year : "", 
        price:""
    })
    const handleClickOpen = () => {
        setCar({
            brand : props.car.brand,
            model : props.car.model,
            color : props.car.color,
            fuel : props.car.fuel,
            year : props.car.year,
            price : props.car.price
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) =>{
        setCar ({...car, [event.target.name]: event.target.value})
    }

    const updateCar = () =>{
        props.updateCar(car, props.car._links.car.href);
        handleClose()
    }
    return (
        <div>
            <Button onClick={handleClickOpen}>
                Edit Car
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id = "form-dialog-title">Edit car </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value = {car.brand}
                        label= "Brand"
                        fullWidth
                        onChange = {e => handleInputChange(e)}
                        variant="standard"
                    />
                     <TextField
                        margin="dense"
                        name="model"
                        value = {car.model}
                        label= "Model"
                        fullWidth
                        onChange = {e => handleInputChange(e)}
                        variant="standard"
                    />
                     <TextField
                        margin="dense"
                        name="color"
                        value = {car.color}
                        label= "Color"
                        fullWidth
                        onChange = {e => handleInputChange(e)}
                        variant="standard"
                    /> <TextField
                    margin="dense"
                    name="fuel"
                    value = {car.fuel}
                    label= "Fuel"
                    fullWidth
                    onChange = {e => handleInputChange(e)}
                    variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="year"
                        value = {car.year}
                        label= "Year"
                        fullWidth
                        onChange = {e => handleInputChange(e)}
                        variant="standard"
                    />
                     <TextField
                        margin="dense"
                        name="price"
                        value = {car.price}
                        label= "Price"
                        fullWidth
                        onChange = {e => handleInputChange(e)}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color = "primary">Cancel</Button>
                    <Button onClick={updateCar} color = "primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Order from './Order';

const url = 'https://reqres.in/api/users';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, 'Name must be at least 2 characters long.')
        .required('Please enter a name.'),
    size: yup 
        .string(),
    cheese: yup
        .boolean(true || false),
    pepperoni: yup
        .boolean(true || false),
    pineapple: yup
        .boolean(true || false),
    bacon: yup
        .boolean(true || false),
    special: yup
        .string('')
})

function Form(props) {

    const [values, setValues] = useState({
        name: '',
        size: '',
        special: '',
    })

    const [errors, setErrors] = useState({
        name: '',
        size: '',
        special: '',
    })

    const [customer, setCustomer] = useState([]);
    const [formDisabled, setFormDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(values)
            .then(valid => {
                setFormDisabled(!valid);
            })
    }, [values])

    const onInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        event.persist();

        yup
            .reach(formSchema, name)
            .validate(value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [name]: ''
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [name]: err.errors[0],
                });
            });
        
            setValues({
                ...values,
                [name]: event.target.type === "checkbox" ? event.target.checked : value 
            });
    }

    const onSubmit = event => {
        event.preventDefault();

        axios.post(url, values)
            .then(res => {
                console.log('Post request successful');
                setCustomer([...customer, res.data]);
            })
            .catch(err => {
                console.log(err);
                debugger
            })
        
        setValues({
            name: '',
            size: '',
            special: '',
        });
    }

    return (
        <div className="container">
            <Link to='/'>Home</Link>
            <h1>Order your Pizza</h1>

            <form>
                <div>
                    {errors.name}
                    {errors.size}
                </div>

                <label className="text">
                    Name:&nbsp;
                    <input
                        value={values.name}
                        onChange={onInputChange}
                        name='name'
                        type='text'
                    />
                </label>

                <label className="text">
                    Pizza Size:&nbsp;
                    <select
                        value={values.size}
                        onChange={onInputChange}
                        name='size'>
                            <option defaultValue=''>Select a size</option>
                            <option value='medium'>Medium 12"</option>
                            <option value='large'>Large 16"</option>
                            <option value='xlarge'>X-Large 20"</option>
                        </select>
                </label>

                <p>Choose Your Toppings:&nbsp;</p>
                <label>
                    <input
                        //value={values.cheese}
                        onChange={onInputChange}
                        name='cheese'
                        type='checkbox'
                    /> Cheese
                </label>

                <label className="text">
                    <input
                        //value={values.pepperoni}
                        onChange={onInputChange}
                        name='pepperoni'
                        type='checkbox'
                    /> Pepperoni
                </label>

                <label>
                    <input
                        //value={values.pineapple}
                        onChange={onInputChange}
                        name='pineapple'
                        type='checkbox'
                    /> Pineapple
                </label>

                <label>
                    <input
                        //value={values.bacon}
                        onChange={onInputChange}
                        name='bacon'
                        type='checkbox'
                    /> Bacon
                </label>

                <label className="text">
                    Special Instructions:&nbsp;
                    <input
                        value={values.special}
                        onChange={onInputChange}
                        name='special'
                        type='text'
                    />
                </label>

                <button onClick={onSubmit} disabled={formDisabled}>Submit Order</button>
            </form>
        
            {customer.map((order, index) => {
                return <Order key={index} details={order} />
            })}
        </div>
    );
}

export default Form;

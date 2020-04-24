import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as yup from 'yup';
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
                [name]: value,
            });
    }

    const onCheckboxChange = event => {
        const checked = event.target.checked;

        setValues({
            ...values,
            [event.target.name]: checked,
        })
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
            toppings: {
                cheese: false,
                pepperoni: false,
                pineapple: false,
                bacon: false,
            },
            special: '',
        });
    }

    return (
        <div>
            <form>
                <div>
                    {errors.name}
                    {errors.size}
                </div>

                <label>
                    Name:&nbsp;
                    <input
                        value={values.name}
                        onChange={onInputChange}
                        name='name'
                        type='text'
                    />
                </label>

                <label>
                    Pizza Size:&nbsp;
                    <select
                        value={values.size}
                        onChange={onInputChange}
                        name='size'>
                            <option defaultValue=''>Select a size</option>
                            <option value='medium'>Medium</option>
                            <option value='large'>Large</option>
                        </select>
                </label>

                <p>Choose Your Toppings:&nbsp;</p>
                <label>
                    <input
                        value={values.cheese}
                        onChange={onCheckboxChange}
                        name='cheese'
                        type='checkbox'
                    /> Cheese
                </label>

                <label>
                    <input
                        value={values.pepperoni}
                        onChange={onCheckboxChange}
                        name='pepperoni'
                        type='checkbox'
                    /> Pepperoni
                </label>

                <label>
                    <input
                        value={values.pineapple}
                        onChange={onCheckboxChange}
                        name='pineapple'
                        type='checkbox'
                    /> Pineapple
                </label>

                <label>
                    <input
                        value={values.bacon}
                        onChange={onCheckboxChange}
                        name='bacon'
                        type='checkbox'
                    /> Bacon
                </label>

                <label>
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

import {useFormik} from "formik"
import "../assests/css/DataDisplay.css"
import axios, { Axios } from "axios"
import { ENDPOINT } from "../confing"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const formik = useFormik ({
        initialValues : {
            email : '',
            password : ''
        },
        validate : (values) => {
            let errors = {}
            if(!values.email) {
                errors.email = "please enter email"
            }
            if(!values.password) {
                errors.password = "please enter password"
            }
            return errors
        },
        onSubmit : (values) => {
           try {
            console.log(ENDPOINT);
            axios.post(`${ENDPOINT}/auth/login`, {
                username : values.email,
                password : values.password,
            }).then(res => {
                if(res?.status == 200 && res?.data?.token){
                    localStorage.setItem('token',  res?.data?.token )
                    localStorage.setItem('userData', JSON.stringify(res?.data) )
                    navigate("/user/dashboard")
                }
            }).catch(error => {
                console.log(error);
            })
           } catch(error) {
            console.log(error);
           }
        }
    }) 

    return (
       
       <>
        <h1>Display-Data</h1>
        <form onSubmit={formik.handleSubmit}>
            <div >
                <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Enter Your Email...."
                    className={formik.errors.email && 'is-error'}
                />
            </div>
                {formik.errors.email && <p className="error-txt">{formik.errors.email} </p>}
            <div>
                <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Enter Your password....5"
                    className={formik.errors.password && 'is-error'}
                />
            </div>
            {formik.errors.password && <p className="error-txt">{formik.errors.password} </p>}

            <div>
                <button>Login</button>
            </div>

        </form>
        </>
    )
}

export default Login



(`https://dummyjson.com/auth/login`)
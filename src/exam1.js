import React, { Component } from "react";
import './App.css';


class DisplayUsers extends Component {
    constructor() {
        super();
        this.state = {
            UsersData: null,
            formData: {
                email: '',
                first_name: '',
                last_name: '',
                avatar: '',
                errorformData: {
                    email: '',
                    first_name: '',
                    last_name: '',
                    avatar: '',
                }
            }
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        try {
            let response = await fetch('https://reqres.in/api/users?page=1');
            let data = await response.json();
            console.log(data);
            if (data && data.data.length > 0) {
                this.setState({
                    UsersData: data.data
                });
            } else {
                this.setState({
                    UsersData: []
                });
            }
        } catch (error) {
            console.log(error?.message);
        }
    };
    handleEdit = () => {

    }
    render() {
        try {
            const { UsersData } = this.state;
            return (
                <div>
                    {UsersData.map(data => (
                        <div className="productCard">
                        <div key={data.id} className="card">
                            <img src={data.avatar} height="150" width="200" alt="" />
                            <h1>{data.first_name}</h1>
                            <p>{data.last_name}</p>
                            <p>{data.email}</p>
                            <button>Edit</button>
                        </div>
                        </div>
                    ))}
                </div>
            );
        } catch (error) {
            console.log(error.message);
            return <div>Error</div>;
        }
    }
}

export default DisplayUsers;
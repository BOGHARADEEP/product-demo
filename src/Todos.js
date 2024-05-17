import React, { Component } from "react";
class Todos extends Component {
    constructor() {
        super()
        this.state = {
            Data: null
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData = async () => {
        let link = await fetch('https://jsonplaceholder.typicode.com/todos')
        let data = await link.json()
        if (data) {
            this.setState({
                Data: data 
            })
        }
    }
    render() {
        let { Data } = this.state
        return (
            <table>
                <thead>
                    <tr>
                        <th>userId</th>
                        <th>id</th>
                        <th>title</th>
                        <th>completed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Data?.map((Data, i) => (
                        <tr key={i}>
                            <td>{Data?.userId}</td>
                            <td>{Data?.id}</td>
                            <td>{Data?.title}</td>
                            <td>{Data?.completed}</td>
                            <td><button onClick="">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}
export default Todos
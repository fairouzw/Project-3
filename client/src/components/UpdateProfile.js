import React, { Component } from "react";
import axios from 'axios';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.getUser.username,
            email: this.props.getUser.email,
            // follows: []
        }
    }

    submitHandler = event => {
        const username = this.state.username;
        const email = this.state.email;

        event.preventDefault();

        axios.put(`/api/profiles/${this.props.id}`, { username, email }) // how to get the id???
            .then(() => {
                this.props.getUser(); // what to put here??

                this.props.history.push('/profile');
            })
            .catch(error => console.log(error))
    };


    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div>
                <h1>Update Userdata: </h1>
                <form onSubmit={this.submitHandler}>
                    <input onChange={this.handleChange} value={this.state.username} type="text" placeholder="username"></input>
                    <br></br>
                    <input onChange={this.handleChange} value={this.state.email} type="text" placeholder="email"></input>
                    <br></br>
                    {/* <select
                        className="custom-select"
                        id="inputGroupSelect01"
                        name="follows"
                        onChange={e => this.handleChange(e)}
                    >
                        <option value={this.state.follows}>{this.state.follows}</option>
                        <option value="foods">Food</option>
                        <option value="electronics">Electronics</option>
                        <option value="furniture">Furniture</option>
                        <option value="dishes">Dishes</option>

                    </select> */}
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

}


export default UpdateProfile;

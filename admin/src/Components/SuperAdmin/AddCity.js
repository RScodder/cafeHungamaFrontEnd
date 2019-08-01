import React from 'react'
import API from '../../api/API'


class addCity extends React.Component {
    state = {
        city: ""
    }
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleFormSubmit = async e => {
        e.preventDefault();
        const data = {
            city: this.state.city
        }
        const response = await API.post('superadmin/superadminid/cities/create', data)
        console.log(data, response)
        alert("Added")
        this.setState({
            city: ""
        });
    };
    render() {
        return (<div>
            <br />
            <h3>Add City/State:</h3>
            <form onSubmit={this.handleFormSubmit}>
                <label htmlFor="city">
                    City/State Name: &nbsp;&nbsp;
            <input
                        id="city"
                        value={this.state.vouchername}
                        type="text"
                        name="city"
                        onChange={this.handleInputChange}
                    />
                </label>
                <button type="submit" value="Save">
                    Add Item
            </button>
            </form>
        </div>
        )
    }
}

export default addCity
import React from 'react'
import API from '../../api/API'


class addAminity extends React.Component {
    state = {
        amenity_name: ""
    }
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleFormSubmit = async e => {
        e.preventDefault();
        const data = {
            amenity_name: this.state.amenity_name
        }
        const response = await API.post('superadmin/superadminid/amenities/create', data)
        //console.log(data)
        alert("Added")
        this.setState({
            amenity_name: ""
        });
    };
    render() {
        return (<div>
            <br />
            <h3>Add Aminity:</h3>
            <form onSubmit={this.handleFormSubmit}>
                <label htmlFor="amenity_name">
                    Amintiy Name: &nbsp;&nbsp;
        <input
                        id="amenity_name"
                        value={this.state.vouchername}
                        type="text"
                        name="amenity_name"
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

export default addAminity
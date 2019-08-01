import React from 'react'
import API from '../../api/API'


class AddLocality extends React.Component {
    state = {
        locality: ""
    }
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleFormSubmit = async e => {
        e.preventDefault();
        const data = {
            locality: this.state.locality
        }
        const response = await API.post('superadmin/superadminid/localities/5d40a8227e38fa251488c7cb/create', data)
        //console.log(data)
        alert("Added")
        this.setState({
            locality: ""
        });
    };
    render() {
        return (<div>
            <br />
            <h3>Add Locality:</h3>
            <form onSubmit={this.handleFormSubmit}>
                <label htmlFor="locality">
                    Locality Name : &nbsp;&nbsp;
        <input
                        id="locality"
                        value={this.state.vouchername}
                        type="text"
                        name="locality"
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

export default AddLocality
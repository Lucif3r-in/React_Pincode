import React, { Component } from "react";
import axios from "axios";

class PinCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: "",
      city: "",
      district: "",
      state: "",
      error: "",
    };
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length === 6) {
      this.setState({
        error: "",
      });
      axios
        .get(`https://api.postalpincode.in/pincode/${e.target.value}`)
        .then((res) =>
          this.setState({
            state: res.data[0].PostOffice[0].State,
            city: res.data[0].PostOffice[0].Block,
            district: res.data[0].PostOffice[0].District,
          })
        )
        .then(() => {
          document.getElementById("pincode").classList.remove("error");
        })
        .catch((err) => {
          // document.getElementById("pincode").className = "error";
          this.setState({
            error: "Invalid PIN Code",
          });
        });
    }
    if (e.target.value.length !== 6) {
      this.setState({
        city: "",
        district: "",
        state: "",
        error: "ZIP code must be of 6 digits",
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.error ? (
          <span>{this.state.error}</span>
        ) : (
          <div>
            <br />
          </div>
        )}
        <div>
          <input
            label="Pin Code"
            autoFocus
            maxLength={6}
            minLength={6}
            onChange={(e) => this.onChange(e)}
            name="pincode"
            value={this.state.pincode}
            id="pincode"
          />
          <input
            name="city"
            label="City"
            id="city"
            type="String"
            disabled={true}
            placeholder="City"
            value={this.state.city}
          />
          <input
            name="district"
            label="District"
            id="district"
            type="String"
            disabled={true}
            placeholder="District"
            value={this.state.district}
          />
          <input
            name="State"
            label="State"
            id="State"
            type="String"
            placeholder="State"
            disabled={true}
            value={this.state.state}
          />
        </div>
      </div>
    );
  }
}

export default PinCode;

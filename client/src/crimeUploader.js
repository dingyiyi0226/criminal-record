import React, { Component } from 'react';
import ImageUploader from './ImageUploader';
import ImageIpfsUploader from './ImageIpfsUploader.js';

const OFFENSE_TYPE = ['Homicide', 'Forcible rape', 'Robbery', 'Assault', 'Burglary', 'Arson', 'Other']
const NTULibrary = {lat: 25.0174, lng: 121.5405}

class CrimeUploader extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offense_type: "",
      userName: "",
      description: "",
      latitude: "",
      longitude: "",
      // image_url: "https://i.imgur.com/VUQnpR1.png"
      image_url: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.labelChange = this.labelChange.bind(this);
    this.IDChange = this.IDChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.latitudeChange = this.latitudeChange.bind(this);
    this.longitudeChange = this.longitudeChange.bind(this);
  }

  labelChange(event) {
    this.setState({ offense_type: event.target.value });
  }

  setImageURL = (url) => {
    console.log(`change url to ${url}`);
    this.setState({ image_url: url });
  }

  handleSubmit() {
    console.log(this.state.latitude)
    console.log(this.state.latitude || NTULibrary.lat)
    let timestamp = 'test'
    let location = {
      lat: this.state.latitude || NTULibrary.lat,
      lng: this.state.longitude || NTULibrary.lng,
    }

    this.props.contract.methods.addCrimeReport(
      this.state.userName,
      this.props.accounts[0],
      this.state.offense_type,
      this.state.description,
      timestamp,
      this.state.image_url,
      JSON.stringify(location)
    ).send({ from: this.props.accounts[0] });
  }

  IDChange(event) {
    this.setState({ userName: event.target.value });
  }
  descriptionChange(event) {
    this.setState({ description: event.target.value });
  }
  latitudeChange(event) {
    this.setState({ latitude: event.target.value });
  }
  longitudeChange(event) {
    this.setState({ longitude: event.target.value });
  }

  render() {
    if (!this.props.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <React.Fragment>
        <div className="container d-flex justify-content-center">
          <div className="card" style={{ width: "60%", textAlign: 'left' }}>
            <div className="card-body">
              <div className="mb-1">
                <label className="form-label" htmlFor="userName">User Name</label>
                <input className="form-control" type="text" id="userName" name="userName" placeholder="dingyiyi" onChange={this.IDChange} />
              </div>
              { OFFENSE_TYPE.map( (type, index) => (
                  <div className="form-check form-check-inline" key={index}>
                    <input className="form-check-input" type="radio" name="offense_type" id={type} value={type}
                           checked={this.state.offense_type === type} onChange={this.labelChange} />
                    <label className="form-check-label" htmlFor={type}>{type}</label>
                  </div>
                ))
              }
              <div className="mb-3">
                <label className="form-label" htmlFor="description">Description: </label>
                <input className="form-control" type="text" id="description" name="description" placeholder="Enter here..." onChange={this.descriptionChange} />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="latitude">Latitude: </label>
                <input className="form-control" type="text" id="latitude" name="latitude" placeholder={NTULibrary.lat} onChange={this.latitudeChange} />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="longitude">Longitude: </label>
                <input className="form-control" type="text" id="longitude" name="longitude" placeholder={NTULibrary.lng} onChange={this.longitudeChange} />
              </div>

              {/*<ImageUploader setImageURL={this.setImageURL} image_url={this.state.image_url} />*/}
              <ImageIpfsUploader setImageURL={this.setImageURL} image_url={this.state.image_url} />

              <button className="btn btn-primary" onClick={() => this.handleSubmit()}>Submit</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )

  }
}

export default CrimeUploader

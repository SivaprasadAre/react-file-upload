import React, { Component } from "react";
import Axios from "axios";
import "../style/uplode.css";

class Uplode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileTitale: "Choose file...",
      display: "none",
      alert: "alert-success"
    };
    this.onChange = this.onChange.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
  }

  handleChecked(e) {
    if (!e.target.checked) {
      e.target.form.elements.customFile.removeAttribute("multiple");
    } else {
      e.target.form.elements.customFile.setAttribute("multiple", true);
    }
  }

  onChange(e) {
    this.setState({
      file: e.target.files,
      loaded: 0,
      fileTitale:
        e.target.files.length > 1
          ? `${e.target.files.length} File's`
          : e.target.files.length > 0
          ? e.target.files[0].name
          : "Choose file",
      display: "none"
    });
  }

  handleAlert() {
    setTimeout(() => {
      this.setState({
        display: "none",
        fileTitale: "Choose file..."
      });
    }, 5000);
  }

  onClickHandler = e => {
    const data = new FormData();
    if (this.state.file) {
      for (var item of this.state.file) {
        data.append("myFile", item);
      }
      var axios = Axios.post("http://localhost:8000/uplode/multe", data, {
        headers: {
          "content-type": "multipart/form-data"
        }
      });
      axios
        .then(res => {
          this.setState({
            display: "block",
            alert: "alert-success"
          });
          this.handleAlert();
        })
        .catch(err => {
          this.setState({
            display: "block",
            alert: "alert-danger"
          });
          this.handleAlert();
          console.error(err);
        });
    } else {
      this.setState({
        display: "block",
        alert: "alert-danger"
      });
      this.handleAlert();
    }
  };

  render() {
    return (
      <div className="uplodebody">
        <form onSubmit={this.onFormSubmit}>
          <div
            className={`alert ${this.state.alert}`}
            name="alert"
            style={{ display: this.state.display }}
          >
            <strong>{this.state.alert.split("-")[1]}!</strong> Indicates a{" "}
            {this.state.alert.split("-")[1]} or positive action.
          </div>
          <div className="custom-file mb-3">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              name="filename"
              onChange={this.onChange}
            />
            <label
              className="custom-file-label label-file"
              htmlFor="customFile"
            >
              <strong>
                <i className="fa fa-file-o" />
              </strong>{" "}
              {this.state.fileTitale}
            </label>
          </div>

          <div className="custom-control custom-switch text-center mb-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id="switch1"
              onChange={this.handleChecked}
            />
            <label className="custom-control-label" htmlFor="switch1">
              multiple files upload
            </label>
          </div>

          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={this.onClickHandler}
          >
            {" "}
            Upload <i className="fa fa-upload" />
          </button>
        </form>
      </div>
    );
  }
}

export default Uplode;

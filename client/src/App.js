import React, { Component } from "react";
import { sendImage } from "./services/requestService";
import VerticalTabs from "./components/themeTabs";
import "./App.css";
import logo from "./img/theme/brand.png";
import { Button } from "@material-ui/core";

const prefix = "chrome-extension://ikiodbafbclkmhbnppnihfflmicjihdn";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: true,
            currentPoza: 0,
        };
    }

    changeToggleState = () => {
      this.setState({
        toggle: !this.state.toggle,
      });
    };

    changePoza = (poz, url) => {
      if (poz !== this.state.currentPoza) {
        this.setState({
          currentPoza: poz,
        });
        console.log('new position setted', poz)
      }
      if (poz && poz !== this.state.currentPoza) {
        const myImg = document.getElementById('poz-image');
        if (myImg) {
          myImg.parentNode.removeChild(myImg);
        }

        const videoTags = document.getElementsByTagName("video");
        const myVideo = videoTags[0];
        const img = document.createElement("img");
        img.src = url;
        img.height = myVideo.offsetHeight;
        img.width = myVideo.offsetWidth;
        img.style.position = 'absolute';
        img.id = 'poz-image';

        myVideo.parentNode.appendChild(img);
      } else {
        const myImg = document.getElementById('poz-image');
        if (myImg) {
          myImg.parentNode.removeChild(myImg);
        }
      }
      return;
    };

    takePhotoWithTimer = () => {
      setInterval(() => {
        if (true) {

        }
      }, 1000)
    };

    takePhoto = () => {
        console.log("clicked");
        const videoTags = document.getElementsByTagName("video");
        const myVideo = videoTags[0];
        const canvas = document.createElement("canvas");

        // scale the canvas accordingly
        canvas.width = myVideo.videoWidth;
        canvas.height = myVideo.videoHeight;
        // draw the video at that frame
        canvas
            .getContext("2d")
            .drawImage(myVideo, 0, 0, canvas.width, canvas.height);
        // convert it to a usable data URL
        const dataURL = canvas.toDataURL();
        sendImage(dataURL);
        var img = document.createElement("img");
        img.src = dataURL;

        document.body.appendChild(img);
    };

    render() {
        return (
          <div style={{ zIndex: '30', position: 'absolute', top: '75px', right: 0, height: '100%', width: '305px' }}>
                {(this.state.toggle && (
                    <img
                      style={{ width: '60px', height: '50px', float: 'right' }}
                      src={`${prefix}${logo}`}
                      onClick={() => this.changeToggleState()}
                    />
                )) || (
                    <div style={{ backgroundColor: 'violet', border: '1px solid gray' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          style={{ width: '60px', height: '50px', float: 'left' }}
                          src={`${prefix}${logo}`}
                          onClick={() => this.changeToggleState()}
                        />
                        <p style={{ fontSize: '20px', margin: 'unset', textAlign: 'center' }}>COVID PHOTOGRAPHER</p>
                      </div>
                      <div>
                        <Button onClick={() => this.takePhoto()}>
                          Take photo
                        </Button>
                        <Button onClick={() => this.takePhotoWithTimer()}>
                          Take photo with timer
                        </Button>
                      </div>
                        <VerticalTabs poza={this.state.currentPoza} changePoza={this.changePoza}/>
                    </div>
                )}
            </div>
        );
    }
}

export default App;

import React, { Component } from "react";
import { sendImage } from "./services/requestService";
import VerticalTabs from "./components/themeTabs";
import "./App.css";
import logo from "./img/theme/brand.png";
import { Button } from "@material-ui/core";
import SimpleSelect from "./components/selectTIme";

const prefix = "chrome-extension://ikiodbafbclkmhbnppnihfflmicjihdn";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: true,
            currentPoza: 0,
            time: 10,
            photoTaked: false,
            timer: 10,
            inProcess: false,
        };
    }

    changeToggleState = () => {
      this.setState({
        toggle: !this.state.toggle,
      });
    };

    changeTimer = (time) => {
      this.setState({
        time,
        timer: time,
      });
    };

    changePoza = (poz, url) => {
      if (poz !== this.state.currentPoza) {
        this.setState({
          currentPoza: poz,
        });
      }
      if (poz && poz !== this.state.currentPoza) {
        const myImg = document.getElementById('poz-image');
        if (myImg) {
          myImg.parentNode.removeChild(myImg);
        }

        const videoTags = document.getElementsByTagName("video");
        let myNumber;
        [...videoTags].map(tag => {
          tag.offsetWidth < 100
          myNumber = tag.parentNode.dataset.ssrc;
        })
        let vidosik;
        [...videoTags].map(tag => {
          if (tag.parentNode.dataset.ssrc === myNumber && tag.offsetWidth > 100) {
            vidosik = tag;
          }
        });
        if (!vidosik) {
          return;
        }
        const myVideo = vidosik;
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

    awaitTimer = () => new Promise((resolve) => {
      let { time } = this.state;
      const newInterval = setInterval(() => {
        if (time > 0) {
          this.setState({
            timer: time,
          });
          time -= 1;
        } else {
          clearInterval(newInterval);
          resolve();
          this.setState({
            time: 0,
            timer: 0,
          });
        }
      }, 1000);
    });

    takePhoto = async () => {
      this.setState({ inProcess: true });
        await this.awaitTimer();

        const videoTags = document.getElementsByTagName("video");
        let myNumber;
        [...videoTags].map(tag => {
          tag.offsetWidth < 100
          myNumber = tag.parentNode.dataset.ssrc;
        })
        let vidosik;
        [...videoTags].map(tag => {
          if (tag.parentNode.dataset.ssrc === myNumber && tag.offsetWidth > 100) {
            vidosik = tag;
          }
        });

        if (!vidosik) {
          return;
        }
        const myVideo = vidosik;
        const canvas = document.createElement("canvas");

        canvas.width = myVideo.videoWidth;
        canvas.height = myVideo.videoHeight;
        canvas
            .getContext("2d")
            .drawImage(myVideo, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL();
        sendImage(dataURL);
        this.setState({
          time: 10,
          timer: 10,
          photoTaked: true,
          inProcess: false,
        });
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
                    <div style={{ backgroundColor: "rgb(210,200,255)", border: '1px solid gray' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          style={{ width: '60px', height: '50px', float: 'left' }}
                          src={`${prefix}${logo}`}
                          onClick={() => this.changeToggleState()}
                        />
                        <p style={{ fontSize: '20px', margin: 'unset', textAlign: 'center' }}>COVID PHOTOGRAPHER</p>
                      </div>
                      <div style={{display: 'flex'}}>
                        <Button onClick={() => this.takePhoto()}>
                          Take photo
                        </Button>
                        <SimpleSelect changeTimer={this.changeTimer} time={this.state.time}></SimpleSelect>
                      </div>
                      {this.state.inProcess && (
                        <div style={{position: 'absolute', fontSize: '90px', width: '100%', height: '433px', backgroundColor: 'white',
                        textAlign: 'center', zIndex: 40, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <span>{this.state.timer}</span>
                          </div>
                        )}
                      <VerticalTabs poza={this.state.currentPoza} changePoza={this.changePoza}/>
                      {this.state.photoTaked && (
                        <div style={{display: 'flex', height: '40px'}}>
                          <a href="https://vitalyshalunov.github.io/collage/" target="_blank"
                            style={{margin: 'auto', textDecoration: 'none', height: '20px', fontSize: '18px'}}
                          >Collect collage</a>
                        </div>
                      )}
                    </div>

                )}
            </div>
        );
    }
}

export default App;

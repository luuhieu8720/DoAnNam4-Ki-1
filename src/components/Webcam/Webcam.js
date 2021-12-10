import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HEIGHT, WIDTH } from '../../constants/Webcam';
import './Webcam.css';

function Webcam(props) {

    const [playing, setPlaying] = useState(false);

    const token = useSelector(state => state.Auth ? state.Auth.token : "");

    // useEffect(() => clearPhoto(), [])

    useEffect(() => {
        if (playing) {
            let timer = setInterval(() => takePicture(), 2000);
            return () => {
                clearInterval(timer);
            };
        }
    })

    const startVideo = () => {
        setPlaying(true);
        navigator.getUserMedia(
            {
                video: true,
            },
            (stream) => {
                let video = document.getElementsByClassName('app__videoFeed')[0];
                if (video) {
                    video.srcObject = stream;
                }
            },
            (err) => console.error(err)
        );
    };

    const stopVideo = () => {
        setPlaying(false);
        let video = document.getElementsByClassName('app__videoFeed')[0];
        video.srcObject.getTracks()[0].stop();
    };

    const takePicture = () => {
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');
        let video = document.getElementsByClassName('app__videoFeed')[0];
        // let photo = document.getElementById('photo');
        if (WIDTH && HEIGHT) {
            canvas.width = WIDTH;
            canvas.height = HEIGHT;
            context.drawImage(video, 0, 0, WIDTH, HEIGHT);

            let data = canvas.toDataURL('image/png').split(',')[1];
            console.log(data)
            //   photo.setAttribute('src', data);
            axios.post(`https://pbl6-backend.herokuapp.com/api/ml/predict`, {
                base64String: data
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res)
                })
                .catch(err => {

                })
        } else {
            clearPhoto();
        }
    }

    const clearPhoto = () => {
        let canvas = document.getElementById('canvas');
        let photo = document.getElementById('photo');
        let context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    return (
        <div className="webcam">
            <div>
                <div className="app__container">
                    <video
                        height={playing ? HEIGHT : 0}
                        width={playing ? WIDTH : 0}
                        muted
                        autoPlay
                        className="app__videoFeed"
                    ></video>
                </div>

                <canvas id="canvas" className="hidden"></canvas>
                {/* <img id="photo" alt="The screen capture will appear in this box." /> */}

                <div className="app__input">
                    {playing ? (
                        <button onClick={stopVideo}>Stop</button>
                    ) : (
                        <button onClick={startVideo}>Start</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Webcam;
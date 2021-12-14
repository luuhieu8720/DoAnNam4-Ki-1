import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HEIGHT, WIDTH } from '../../constants/Webcam';
import './Webcam.scss';

function Webcam(props) {

    const [playing, setPlaying] = useState(false);

    const token = useSelector(state => state.Auth ? state.Auth.token : "");

    const [image, setImage] = useState();

    const [mess, setMess] = useState();

    // useEffect(() => clearPhoto(), [])

    useEffect(() => {
        if (playing) {
            let timer = setInterval(() => takePicture(), 5000);
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
        setMess();
        setImage();
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');
        let video = document.getElementsByClassName('app__videoFeed')[0];
        // let photo = document.getElementById('photo');
        if (WIDTH && HEIGHT) {
            canvas.width = WIDTH;
            canvas.height = HEIGHT;
            context.drawImage(video, 0, 0, WIDTH, HEIGHT);
            setImage(canvas.toDataURL('image/png'));
            let data = canvas.toDataURL('image/png').split(',')[1];
            //   photo.setAttribute('src', data);
            axios.post(`https://pbl6-backend.herokuapp.com/api/ml/predict`, {
                base64String: data
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    setMess(res.data.result);
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
        <div className="relative">
            <div className="webcam-container"></div>
            <div className="modal">
                <div className="webcam bg-white p-6 rounded-md">
                    <div className="">
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

                        <div className="app__input">
                            {playing ? (
                                <button onClick={stopVideo}>Stop</button>
                            ) : (
                                <button onClick={startVideo}>Start</button>
                            )}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="h-full ml-4">
                            <div className="border-2 border-dashed border-gray-200" aria-hidden="true" style={{ height: "400px" }}>
                                <img src={image ? image : ""} alt="" />
                            </div>
                            {(image && !mess) && <div className="wrapper">
                                <div className="typing-demo">
                                    Đang kiểm tra...
                                </div>
                            </div>}
                            {(mess && mess.length === 9) &&
                                <div className="font-medium text-blue-400 text-center">
                                    {mess}
                                </div>
                            }

                            {(mess && mess.length > 9) && <div>
                                <div className="font-medium text-red-600 text-center">
                                    {mess}
                                </div>
                                <p className="text-center text-red-600 text-sm">Please wear a mask</p>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Webcam;
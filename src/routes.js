import HomePage from './components/Home/Home';
import UploadImage from './components/UploadImage/UploadImage';
import Webcam from './components/Webcam/Webcam';

const ROUTES = [
    {
        path: '/home',
        exact: true,
        main: <HomePage />
    },
    {
        path: '/webcam',
        exact: true,
        main: <Webcam />
    },
    {
        path: '/upload-image',
        exact: true,
        main: <UploadImage />
    }
]

export default ROUTES;
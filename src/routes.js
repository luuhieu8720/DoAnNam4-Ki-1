import FormLogin from './components/Auth/components/FormLogin';
import FormRegister from './components/Auth/components/FormRegister';
import HomePage from './components/Home/Home';
import UploadImage from './components/UploadImage/UploadImage';
import Webcam from './components/Webcam/Webcam';
import AccountSettings from './components/AccountSetting/AccountSettings';
import UserManagement from './components/UserManagement/UserManagement';

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
    },
    {
        path: '/signin',
        exact: true,
        main: <FormLogin />
    },
    {
        path: '/signup',
        exact: true,
        main: <FormRegister />
    },
    {
        path: "/account-setting",
        exact: true,
        main: <AccountSettings />
    },
    {
        path: "admin/user-management",
        exact: true,
        main: <UserManagement />
    },
]

export default ROUTES;
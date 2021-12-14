import FormLogin from './components/Auth/components/FormLogin';
import FormRegister from './components/Auth/components/FormRegister';
import HomePage from './components/Home/Home';
import UploadImage from './components/UploadImage/UploadImage';
import Webcam from './components/Webcam/Webcam';
import AccountSettings from './components/AccountSetting/AccountSettings';
import UserManagement from './components/UserManagement/UserManagement';
import ViolatorManagement from './components/ViolatorManagement/ViolatorManagement';

export const ROUTES = [
    {
        path: '',
        exact: true,
        main: <HomePage />
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
    }
]

export const ROUTES_PRIVATE = [
    {
        path: '/upload-image',
        exact: true,
        main: <UploadImage />
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
    {
        path: "admin/violator-management",
        exact: true,
        main: <ViolatorManagement />
    },
    {
        path: "/webcam",
        exact: true,
        main: <Webcam />
    },
]
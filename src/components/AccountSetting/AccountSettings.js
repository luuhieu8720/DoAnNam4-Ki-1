import React from 'react';
import ChangePassword from './components/ChangePassword';
import EditProfile from './components/EditProfile';

function AccountSettings(props) {

    return (
        <div className="bg-gray-50 max-w-8xl mx-auto p-24 ">
            <div className="flex items-center p-4 mx-12 bg-white mt-4 rounded shadow-md font-medium text-xl">
                <span>Account Setting</span>
            </div>

            <div className="grid grid-cols-2">
                <div>
                    <EditProfile />

                </div>
                <div>
                    <ChangePassword />

                </div>
            </div>
        </div>
    );
}

export default AccountSettings;
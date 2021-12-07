import React from 'react';
import { Grommet, Box, Heading, Text } from "grommet";
import theme from "./theme";
import RichTextEditor from "./RichTextEditor";
import './UploadImage.css';

function UploadImage(props) {

    const printSubmittedValue = value => {
        console.log(value);
    };

    return (
        <div className="upload-image">
            <Grommet theme={theme} style={{ height: "100vh" }}>
                <Box>
                    <Heading level="2" margin={{ bottom: "none" }}>
                        {" "}
                        Chụp ảnh kiểm tra thử có đeo khẩu trang không nào?
                    </Heading>
                    <Text>Bấm vào cái camera đi!!!</Text>
                </Box>
                <Box>
                    <RichTextEditor
                        placeholder="Keep us engaged ..."
                        onSubmit={printSubmittedValue}
                    />
                </Box>
            </Grommet>
        </div>
    );
}

export default UploadImage;
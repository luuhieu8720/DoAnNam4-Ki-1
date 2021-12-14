import React, { useRef, useState } from "react";
import WebCamera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { Box, Button, Image, TextInput } from "grommet";
import { FormClose, Camera, Gallery, Close } from "grommet-icons";
import CameraModal from "./CameraModal";
import Resizer from "react-image-file-resizer";

function RichTextInput({ onSubmit, ...rest }) {

	const [image, setImage] = useState("");
	const [showCamera, setShowCamera] = useState(false);

	const fileInputRef = useRef(null);

	const openFileDialog = () => {
		fileInputRef.current.click();
	};

	const onSubmitImage = () => {
		onSubmit(image);
	}

	const resizeFile = (file) =>
		new Promise((resolve) => {
			Resizer.imageFileResizer(
				file,
				500,
				400,
				"JPEG",
				100,
				0,
				(uri) => {
					resolve(uri);
				},
				"base64"
			);
		});

	const onFilesAdded = async event => {

		try {
			const file = event.target.files[0];
			const image = await resizeFile(file);
			setImage(image);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<div className="mx-auto">
				<div className="flex item-center justify-center">
					{image && (
						<Box width="400px" align="center">
							<Box align="end" background="dark-1" alignSelf="stretch">
								<Button
									icon={<FormClose />}
									onClick={() => {
										setImage("");
										setShowCamera(false);
									}}
								/>
							</Box>
							<Image
								style={{
									maxHeight: "100%",
									maxWidth: "100%"
								}}
								fit="cover"
								src={image}
							/>
						</Box>
					)}
				</div>

				{showCamera && (
					<CameraModal onClose={() => setShowCamera(false)}>
						<WebCamera
							idealResolution={{ width: 500, height: 400 }}
							onTakePhoto={dataUri => {
								setImage(dataUri);
								setShowCamera(false);
							}}
						/>
					</CameraModal>
				)}

				<TextInput
					hidden
					ref={fileInputRef}
					type="file"
					multiple
					onChange={onFilesAdded}
					className="mt-2"
				/>
				<div className="fixed w-full bottom-32 flex items-center justify-between border-2 border-gray-500 mx-auto" 
				style={{ 
					maxWidth: "500px", 
					marginLeft: "-11px" 
				}}>
					<div>
						<Button
							icon={showCamera ? <Close /> : <Camera />}
							onClick={() => setShowCamera(!showCamera)}
						/>
						<Button icon={<Gallery />} onClick={openFileDialog} />

					</div>
					<button
						className="px-8 py-2 mr-4 rounded-lg text-xl font-bold bg-blue-400 text-white"
						onClick={onSubmitImage}>Send
					</button>
				</div>
			</div>
		</div>

	);
}

export default RichTextInput;

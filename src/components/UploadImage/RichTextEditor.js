import React from "react";
import { Box } from "grommet";
import RichTextInput from "./RichTextInput";

function RichTextEditor(props) {
	return (
		<Box pad="small">
			<RichTextInput {...props} />
		</Box>
	)
}

export default RichTextEditor;

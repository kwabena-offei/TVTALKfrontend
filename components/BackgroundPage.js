import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";

export const BackgroundPage = ({ source, alternative }) => {
	return (
		<Box sx={{
			position: 'absolute',
			height: '85vh',
			width: '100vw',
			overflowX: 'hidden',
			zIndex: -1,
		}}>
			<Image
			className="bg-image"
			src={source}
			alt={alternative}
			fill='true'
			// sizes="100vw"
			layout='fill'
			objectFit="cover"
			objectPosition='0'
			/>
		</Box>
	)
}
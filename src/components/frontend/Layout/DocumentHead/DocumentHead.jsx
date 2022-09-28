import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from "react-router-dom";

function DocumentHead({ title, content, richSnippets, quotes, images, hashtags,color }) {
	let location = useLocation();
   let currentUrl = window.location.origin + location.pathname;
   let quote = quotes !== undefined ? quotes : "";
   
   let image = images !== undefined ? images : "https://firebasestorage.googleapis.com/v0/b/tlist-ee9f5.appspot.com/o/favicon.png?alt=media&token=fa5e2b1e-2c0a-47f8-a572-43280314795e";
   
	let hashtag = hashtags !== undefined ? hashtags : "#camperstribe";
	return (
		<Helmet>
			<title>{title}</title>
			<meta charset="utf-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="csrf_token" content="" />
			<meta property="type" content="website" />
			<meta property="url" content={currentUrl} />
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
			<meta name="msapplication-TileColor" content={color ? color : "#c70f11"} />
			<meta name="msapplication-TileImage" content={image} />
			<meta name="theme-color" content={color ? color : "#c70f11"} />
			<meta name="_token" content="" />
			<meta name="robots" content="noodp" />
			<meta property="title" content={title} />
			<meta property="quote" content={quote} />
			<meta name='description' content={content} />
			<meta property="image" content={image} />
			<meta property="og:locale" content="en_AU" />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta property="og:quote" content={quote} />
			<meta property="og:hashtag" content={hashtag} />
			<meta property="og:image" content={image} />
			<meta content="image/*" property="og:image:type" />
			<meta property="og:url" content={currentUrl} />
			<meta property="og:site_name" content="A-Tech" />
			<meta property="og:description" content={content} />
				<script type="application/ld+json">
	              {richSnippets || ""}
			    </script>
			
			
		</Helmet>
	);
}
export default DocumentHead;

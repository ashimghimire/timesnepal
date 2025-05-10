import Main from "../components/Main";
import React from "react";

export default function Home({pageProps}) {
	// router.pathname
  return (
	
    <React.Fragment>
		
		<Main/>
		<footer><div className="instafeed"><div className="image-card"></div></div>
		<div className="three_column_footer">
			<div className="footer_left"></div>
			<div className="footer_right"></div>
			<div className="footer_center"></div>
		</div>
		</footer>
    </React.Fragment>
	
  );
}



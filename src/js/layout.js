import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { AddContact } from "./views/addContact.js";
import { EditContact } from "./views/editContact.js"
import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import { ContactCard } from "./component/ContactCard.js";

const Layout = () => {
	
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Routes>
						<Route path="/" element={<ContactCard />} />
						<Route path="/addContact/" element={<AddContact />} />
						<Route path="/editContact/:id" element={<EditContact />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
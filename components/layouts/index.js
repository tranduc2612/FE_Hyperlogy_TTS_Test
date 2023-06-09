import Footer from "./footer";
import Header from "./header";

function DefaultLayout({ children }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}

export default DefaultLayout;

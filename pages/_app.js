import DefaultLayout from "../components/layouts";
import "../styles/globals.css";
import Provider from "../store/provider";

function MyApp({ Component, pageProps }) {
	return (
	<Provider>
		<DefaultLayout>
			<Component {...pageProps} />
		</DefaultLayout>
	</Provider>
	);
}

export default MyApp;

import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./dashboard/Dashboard";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Provider} from "react-redux";
import store from "../store";


class App extends React.Component {

	render() {
		return (
			<Provider store={store}>
				<CssBaseline>
					<Dashboard/>
				</CssBaseline>
			</Provider>
		);
	}
}

export default App;

ReactDOM.render(<App/>, document.getElementById("app"));
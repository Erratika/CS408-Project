import React from 'react';
import ReactDOM from 'react-dom'
import Dashboard from './dashboard/Dashboard'
import CssBaseline from '@material-ui/core/CssBaseline'


class App extends React.Component {

    render() {

        return (
            <div>
                <CssBaseline>
                    <Dashboard/>
                </CssBaseline>
            </div>
        );
    }
}


export default App;

ReactDOM.render(<App/>, document.getElementById('app'));
import React, {Component} from 'react';


class FilterSelection extends Component {
    constructor() {
        super();
        this.state = {
            selected: ['TV', 'Free Wifi']
        };
    }

    render() {
        return (
            <table>
                {
                    this.state.selected.map((item, index) => {
                        return (
                            <tr>
                                <td>{item}</td>
                                <td>
                                    <button>X</button>
                                </td>
                            </tr>
                        )
                    })
                }
                <tr><input type="search"/></tr>
            </table>

        );
    }

}

export default FilterSelection


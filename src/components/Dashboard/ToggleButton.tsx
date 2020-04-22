import * as React from "react";
import { Toggle } from "office-ui-fabric-react";
interface myStates {
    Checked: boolean
}
export default class ToggleComponent extends React.Component<{}, myStates> {
    constructor(props) {
        super(props);
        this.state = { Checked: false }
        this.ToggleButton.bind(this);
    }

    componentWillMount() {
        let checkValue = window.location.pathname == '/Dashboard/NewBooking';
        this.setState({ Checked: checkValue })
    }
    ToggleButton = (e) => {
        this.setState({ Checked: !this.state.Checked });
        let element = e.target;
        if (this.state.Checked) {
            history.pushState(null, null, '/Dashboard/NewOffer');
        }
        else {
            history.pushState(null, null, '/Dashboard/NewBooking');
        }
        window.location.reload();
    }

    render() {
        return (
            <Toggle className='Toggle' style={{
                background: this.state.Checked ? '#ffac19' : '#9319ff', borderColor: this.state.Checked ? '#ffac19' : '#9319ff'
            }} checked={this.state.Checked} onClick={this.ToggleButton} />
        )
    }
}
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

    private ToggleButton():void{
        this.setState({ Checked: !this.state.Checked });
        if (this.state.Checked) {
            window.location.replace('/Dashboard/NewOffer');
        }
        else {
            window.location.replace('/Dashboard/NewBooking');
        }
        
    }

    render() {
        return (
            <Toggle className='Toggle' style={{
                background: this.state.Checked ? '#ffac19' : '#9319ff', borderColor: this.state.Checked ? '#ffac19' : '#9319ff'
            }} checked={this.state.Checked} onClick={()=>this.ToggleButton()} />
        )
    }
}
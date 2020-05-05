import * as React from 'react';
import image from '../../Images/0004.png'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.HandleClick.bind(this);
    }
    componentDidMount() {
        document.getElementById('Dashboard').style.backgroundImage = `url(${image})`;
    }
    HandleClick() {

    }
    render() {
        return (
            <div id='Profile'>
                <div id='ProfileImg' className='ms-depth-8'
                    onClick={() => {
                        let Element: HTMLElement = this.refs.fileUploader as HTMLElement;
                        Element.click();
                    }}>
                    <input type="file" id="file" ref="fileUploader" style={{ display: "none" }} />
                </div>
            </div>
        );
    }
}
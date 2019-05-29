import React, { Component } from 'react';
import { FAB } from 'react-native-paper';
import { COLORS } from '../styles/colors';

class AddFAB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fabOpen: false
        };
    }
    render() {
        const { addRoom, addPatient, addDoctor, addDepartment } = this.props;
        return (
            <FAB.Group
                open={this.state.fabOpen}
                icon={this.state.fabOpen ? 'close' : 'add'}
                actions={[
                    {
                        icon: 'hotel',
                        label: 'Room',
                        onPress: addRoom,
                        style: { backgroundColor: COLORS.black }
                    },
                    {
                        icon: 'person',
                        label: 'Patient',
                        onPress: addPatient,
                        style: { backgroundColor: COLORS.black }
                    },
                    {
                        icon: 'perm-identity',
                        label: 'Doctor',
                        onPress: addDoctor,
                        style: { backgroundColor: COLORS.black }
                    },
                    {
                        icon: 'business',
                        label: 'Department',
                        onPress: addDepartment,
                        style: { backgroundColor: COLORS.black }
                    }
                ]}
                onStateChange={({ open }) => this.setState({ fabOpen: open })}
            />
        );
    }
}

export default AddFAB;

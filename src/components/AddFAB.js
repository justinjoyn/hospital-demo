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
                theme={{
                    colors: {
                        primary: COLORS.black,
                        accent: COLORS.white,
                        surface: COLORS.white
                    }
                }}
                open={this.state.fabOpen}
                icon={this.state.fabOpen ? 'close' : 'add'}
                actions={[
                    {
                        icon: 'hotel',
                        label: 'Room',
                        onPress: addRoom,
                        style: { backgroundColor: COLORS.white }
                    },
                    {
                        icon: 'person',
                        label: 'Patient',
                        onPress: addPatient,
                        style: { backgroundColor: COLORS.white }
                    },
                    {
                        icon: 'perm-identity',
                        label: 'Doctor',
                        onPress: addDoctor,
                        style: { backgroundColor: COLORS.white }
                    },
                    {
                        icon: 'business',
                        label: 'Department',
                        onPress: addDepartment,
                        style: { backgroundColor: COLORS.white }
                    }
                ]}
                onStateChange={({ open }) => this.setState({ fabOpen: open })}
            />
        );
    }
}

export default AddFAB;

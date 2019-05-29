import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { Appbar, Headline, List, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { COLORS } from '../styles/colors';
import { common } from '../styles/common';

class Hospital extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { rooms, departments, doctors, patients } = this.props;
        return (
            <SafeAreaView style={common.container}>
                <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
                <Appbar>
                    <Appbar.Content title="Hospital" subtitle="Information about the institution" />
                </Appbar>
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <Headline>Garden City Hospital</Headline>
                </View>
                <List.Item
                    title={`${doctors.length} Doctors`}
                    description="currently working"
                    left={props => <List.Icon {...props} icon="perm-identity" />}
                />
                <List.Item
                    title={`${patients.length} Patients`}
                    description="under care"
                    left={props => <List.Icon {...props} icon="person" />}
                />
                <List.Item
                    title={`${departments.length} Departments`}
                    description="up and running"
                    left={props => <List.Icon {...props} icon="business" />}
                />
                <List.Item
                    title={`${rooms.length} Rooms`}
                    description="available"
                    left={props => <List.Icon {...props} icon="hotel" />}
                />
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {};
};
const mapStateToProps = state => ({
    rooms: state.rooms.data,
    patients: state.patients.data,
    doctors: state.doctors.data,
    departments: state.departments.data
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hospital);

import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import firebase from 'react-native-firebase';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DEPARTMENTS, DOCTORS, PATIENTS, ROOMS } from '../common/constants';
import AddDepartmentModal from '../components/AddDepartmentModal';
import AddDoctorModal from '../components/AddDoctorModal';
import AddFAB from '../components/AddFAB';
import AddPatientModal from '../components/AddPatientModal';
import AddRoomModal from '../components/AddRoomModal';
import { COLORS } from '../styles/colors';
import { common } from '../styles/common';

class Patients extends Component {
    constructor(props) {
        super(props);
        //Firestore refs
        this.roomsRef = firebase.firestore().collection(ROOMS);
        this.patientsRef = firebase.firestore().collection(PATIENTS);
        this.doctorsRef = firebase.firestore().collection(DOCTORS);
        this.departmentsRef = firebase.firestore().collection(DEPARTMENTS);

        this.state = {
            addRoomModalVisible: false,
            addPatientModalVisible: false,
            addDoctorModalVisible: false,
            addDepartmentVisible: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        return null;
    }

    componentDidMount() {}

    render() {
        const {
            addRoomModalVisible,
            addPatientModalVisible,
            addDoctorModalVisible,
            addDepartmentVisible
        } = this.state;
        return (
            <SafeAreaView style={common.container}>
                <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
                <Appbar>
                    <Appbar.Content title="Patients" subtitle="Select a patient to view details" />
                </Appbar>
                <AddFAB
                    addRoom={() => this.setState({ addRoomModalVisible: true })}
                    addPatient={() => this.setState({ addPatientModalVisible: true })}
                    addDoctor={() => this.setState({ addDoctorModalVisible: true })}
                    addDepartment={() => this.setState({ addDepartmentVisible: true })}
                />
                <AddFAB
                    addRoom={() => this.setState({ addRoomModalVisible: true })}
                    addPatient={() => this.setState({ addPatientModalVisible: true })}
                    addDoctor={() => this.setState({ addDoctorModalVisible: true })}
                    addDepartment={() => this.setState({ addDepartmentVisible: true })}
                />
                <AddRoomModal
                    reference={this.roomsRef}
                    visible={addRoomModalVisible}
                    onCancel={() => this.setState({ addRoomModalVisible: false })}
                    onAdd={() => this.setState({ addRoomModalVisible: false })}
                />
                <AddPatientModal
                    reference={this.patientsRef}
                    visible={addPatientModalVisible}
                    onCancel={() => this.setState({ addPatientModalVisible: false })}
                    onAdd={() => this.setState({ addPatientModalVisible: false })}
                />
                <AddDoctorModal
                    reference={this.doctorsRef}
                    visible={addDoctorModalVisible}
                    onCancel={() => this.setState({ addDoctorModalVisible: false })}
                    onAdd={() => this.setState({ addDoctorModalVisible: false })}
                />
                <AddDepartmentModal
                    reference={this.departmentsRef}
                    visible={addDepartmentVisible}
                    onCancel={() => this.setState({ addDepartmentVisible: false })}
                    onAdd={() => this.setState({ addDepartmentVisible: false })}
                />
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const mapStateToProps = state => ({
    rooms: state.rooms.data
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Patients);

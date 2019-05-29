import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList, StatusBar } from 'react-native';
import firebase from 'react-native-firebase';
import { Appbar, List } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DEPARTMENTS, DOCTORS, PATIENTS, ROOMS } from '../common/constants';
import AddDepartmentModal from '../components/AddDepartmentModal';
import AddDoctorModal from '../components/AddDoctorModal';
import AddFAB from '../components/AddFAB';
import AddPatientModal from '../components/AddPatientModal';
import AddRoomModal from '../components/AddRoomModal';
import PatientDetailsModal from '../components/PatientDetailsModal';
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
            addDepartmentVisible: false,
            patientDetailsModalVisible: false,
            selectedPatient: null
        };

        this.renderPatient = this.renderPatient.bind(this);
    }

    renderPatient({ item }) {
        const roomNumber = _.get(item, 'parsedRoom.number', null);
        return (
            <List.Item
                onPress={() =>
                    roomNumber
                        ? this.setState({ selectedPatient: item, patientDetailsModalVisible: true })
                        : null
                }
                title={item.name}
                description={roomNumber ? `Room #${roomNumber}` : ''}
                left={props => <List.Icon {...props} icon="person" />}
            />
        );
    }

    render() {
        const {
            addRoomModalVisible,
            addPatientModalVisible,
            addDoctorModalVisible,
            addDepartmentVisible,
            patientDetailsModalVisible,
            selectedPatient
        } = this.state;
        const { rooms, departments, doctors, patients, updated } = this.props;
        return (
            <SafeAreaView style={common.container}>
                <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
                <Appbar>
                    <Appbar.Content title="Patients" subtitle="Select a patient to view details" />
                </Appbar>
                <FlatList
                    data={patients}
                    extraData={updated}
                    renderItem={this.renderPatient}
                    keyboardShouldPersistTaps={'handled'}
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
                    rooms={rooms}
                    doctors={doctors}
                    visible={addPatientModalVisible}
                    onCancel={() => this.setState({ addPatientModalVisible: false })}
                    onAdd={() => this.setState({ addPatientModalVisible: false })}
                />
                <AddDoctorModal
                    reference={this.doctorsRef}
                    departments={departments}
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
                <PatientDetailsModal
                    patient={selectedPatient}
                    visible={patientDetailsModalVisible}
                    onClose={() =>
                        this.setState({ patientDetailsModalVisible: false, selectedPatient: null })
                    }
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
    departments: state.departments.data,
    updated: state.patients.updated
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Patients);

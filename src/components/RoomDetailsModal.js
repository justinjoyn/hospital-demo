import React, { Component } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { Button, Card, Divider, Modal, Portal, List, Subheading } from 'react-native-paper';
import { COLORS } from '../styles/colors';
import _ from 'lodash';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class RoomDetailsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: []
        };
    }

    static getDerivedStateFromProps(props) {
        const { patients, room } = props;
        if (!room || !patients) return null;
        const filteredPatients = patients.filter(patient => {
            const patientRoom = _.get(patient, 'room.id', null);
            return patientRoom === room.key;
        });
        return {
            patients: filteredPatients
        };
    }

    renderPatient({ item }) {
        const department = _.get(item, 'parsedDepartment.name', '');
        return (
            <List.Item
                title={item.name}
                description={department}
                left={props => <List.Icon {...props} icon="person" />}
            />
        );
    }

    render() {
        const { visible, room, onClose } = this.props;
        const { patients } = this.state;
        if (!room) return null;
        return (
            <Portal>
                <Modal
                    contentContainerStyle={{
                        height: SCREEN_HEIGHT,
                        justifyContent: 'flex-end'
                    }}
                    theme={{
                        colors: {
                            backdrop: COLORS.blackTransparent
                        }
                    }}
                    visible={visible}
                    onDismiss={onClose}>
                    <Card
                        theme={{
                            colors: {
                                surface: COLORS.white
                            }
                        }}>
                        <Card.Title
                            title={`Room #${room.number}`}
                            subtitle={`This room has ${patients.length} patients`}
                        />
                        <Divider />
                        <Card.Content>
                            <Subheading>Patients</Subheading>
                            <FlatList
                                style={{ height: SCREEN_HEIGHT / 3 }}
                                data={patients}
                                renderItem={this.renderPatient}
                                keyboardShouldPersistTaps={'handled'}
                            />
                        </Card.Content>
                        <Card.Actions
                            style={{
                                justifyContent: 'flex-end',
                                paddingBottom: 30
                            }}>
                            <Button onPress={onClose} theme={{ colors: { primary: COLORS.black } }}>
                                Close
                            </Button>
                        </Card.Actions>
                    </Card>
                </Modal>
            </Portal>
        );
    }
}

export default RoomDetailsModal;

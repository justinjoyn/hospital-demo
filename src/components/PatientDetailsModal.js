import _ from 'lodash';
import React, { Component } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { Button, Card, Divider, List, Modal, Portal, Subheading } from 'react-native-paper';
import { COLORS } from '../styles/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class PatientDetailsModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { visible, patient, onClose } = this.props;
        if (!patient) return null;
        const department = _.get(patient, 'parsedDepartment.name', '');
        const doctor = _.get(patient, 'parsedDoctor.name', '');
        const room = _.get(patient, 'parsedRoom.number', '');
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
                        <Card.Title title={patient.name} subtitle={`Room #${room}`} />
                        <Divider />
                        <Card.Content>
                            <List.Item
                                title={`Dr. ${doctor}`}
                                description={'Attending doctor'}
                                left={props => <List.Icon {...props} icon="perm-identity" />}
                            />
                            <List.Item
                                title={department}
                                description={'Department'}
                                left={props => <List.Icon {...props} icon="business" />}
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

export default PatientDetailsModal;

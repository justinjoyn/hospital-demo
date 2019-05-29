import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Button, Card, Divider, Modal, Portal, TextInput } from 'react-native-paper';
import { COLORS } from '../styles/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class AddDepartmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentName: ''
        };
        this.addDepartment = this.addDepartment.bind(this);
    }

    addDepartment() {
        const { reference, onAdd } = this.props;
        const { departmentName } = this.state;
        reference.add({
            name: departmentName
        });
        onAdd();
    }

    render() {
        const { onCancel, visible } = this.props;
        const { departmentName } = this.state;
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
                    onDismiss={onCancel}>
                    <Card
                        theme={{
                            colors: {
                                surface: COLORS.white
                            }
                        }}>
                        <Card.Title title="Add Departent" subtitle="Enter the department name" />
                        <Divider />
                        <Card.Content>
                            <TextInput
                                label="Department Name"
                                value={departmentName}
                                mode={'outlined'}
                                onChangeText={text => this.setState({ departmentName: text })}
                                style={{ marginBottom: 10 }}
                                theme={{ colors: { primary: COLORS.black } }}
                            />
                        </Card.Content>
                        <Card.Actions
                            style={{
                                justifyContent: 'space-between',
                                paddingBottom: 30
                            }}>
                            <Button
                                theme={{ colors: { primary: COLORS.black } }}
                                onPress={onCancel}>
                                Cancel
                            </Button>
                            <Button
                                onPress={this.addDepartment}
                                theme={{ colors: { primary: COLORS.black } }}>
                                Add
                            </Button>
                        </Card.Actions>
                    </Card>
                </Modal>
            </Portal>
        );
    }
}

export default AddDepartmentModal;

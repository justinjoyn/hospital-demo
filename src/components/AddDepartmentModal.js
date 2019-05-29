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
        this.add = this.add.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    add() {
        const { reference, onAdd } = this.props;
        const { departmentName } = this.state;
        reference.add({
            name: departmentName
        });
        this.setState({ departmentName: '' });
        onAdd();
    }

    cancel() {
        const { onCancel } = this.props;
        this.setState({ departmentName: '' });
        onCancel();
    }

    render() {
        const { visible } = this.props;
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
                    onDismiss={this.cancel}>
                    <Card
                        theme={{
                            colors: {
                                surface: COLORS.white
                            }
                        }}>
                        <Card.Title title="Add Departent" subtitle="Provide the details" />
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
                                onPress={this.cancel}>
                                Cancel
                            </Button>
                            <Button
                                onPress={this.add}
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

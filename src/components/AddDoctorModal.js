import React, { Component } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import {
    Button,
    Card,
    Chip,
    Divider,
    Modal,
    Portal,
    Subheading,
    TextInput
} from 'react-native-paper';
import { COLORS } from '../styles/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class AddDoctorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorName: '',
            depaselectedDepartmentrtment: null
        };
        this.add = this.add.bind(this);
        this.cancel = this.cancel.bind(this);
        this.renderDepartments = this.renderDepartments.bind(this);
    }

    add() {
        const { reference, onAdd } = this.props;
        const { doctorName, selectedDepartment } = this.state;
        if (doctorName === '' || !selectedDepartment) return;
        reference.add({
            name: doctorName,
            department: selectedDepartment.doc.ref
        });
        this.setState({ doctorName: '', selectedDepartment: null });
        onAdd();
    }

    cancel() {
        const { onCancel } = this.props;
        this.setState({ doctorName: '', selectedDepartment: null });
        onCancel();
    }

    renderDepartments() {
        const { departments } = this.props;
        const { selectedDepartment } = this.state;
        let renderedDepartments = [];
        departments.map(department => {
            const isSelected =
                selectedDepartment && selectedDepartment.key === department.key ? true : false;
            renderedDepartments = renderedDepartments.concat(
                <Chip
                    key={department.key}
                    style={{ marginRight: 8, marginBottom: 8 }}
                    icon="business"
                    onPress={() => this.setState({ selectedDepartment: department })}
                    mode={'outlined'}
                    selected={isSelected}>
                    {department.name}
                </Chip>
            );
        });
        return renderedDepartments;
    }

    render() {
        const { visible } = this.props;
        const { doctorName } = this.state;
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
                        <Card.Title title="Add Doctor" subtitle="Provide the details" />
                        <Divider />
                        <ScrollView
                            style={{ height: SCREEN_HEIGHT / 1.5 }}
                            keyboardShouldPersistTaps={'handled'}>
                            <Card.Content>
                                <TextInput
                                    label="Doctor's Name"
                                    value={doctorName}
                                    mode={'outlined'}
                                    onChangeText={text => this.setState({ doctorName: text })}
                                    style={{ marginBottom: 10 }}
                                    theme={{ colors: { primary: COLORS.black } }}
                                />
                                <Subheading>Department</Subheading>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {this.renderDepartments()}
                                </View>
                            </Card.Content>
                        </ScrollView>
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

export default AddDoctorModal;

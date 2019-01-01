/*
Input element contains a single list item that takes user input via a text field.
It passes input data to InputList.js to be processed before passing to App.js
*/

import React from 'react';
import InputField from './InputTextField';
import InputDeleteButton from './InputDeleteButton';
import ListItem from '@material-ui/core/ListItem';
import InputTypeSelector from './InputTypeSelector';
import InputExtrasButton from './InputExtrasButton';
import InputAddButton from './InputAddButton';
import MoreElementDialog from './MoreElementDialog'

class InputElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            index: this.props.index,
            depth: this.props.element.getDepth(),
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
    }

    handleAdd = () => {
        this.props.onAdd(this.state.depth+1, {parent: this.props.element})
    }

    handleTextChange(string) {
        this.props.onChange(string, this.state.index, {parent: this.props.element.getParent()});
    }

    handleDelete = () => {
        this.props.onDelete(this.state.index, {parent: this.props.element.getParent()});
    }

    handleSetType = (value) => {
        this.props.onTypeSelect(value, this.state.index, {parent: this.props.element.getParent()});
    }

    toggleDialog() {
        this.setState(prevState => ({
            dialogOpen: !prevState.dialogOpen,
        }))
        console.log(this.state.dialogOpen)
    }

    render() {
        return (
            <ListItem style={{padding: 2, paddingLeft: (this.props.element.getDepth() - 1) * 25 }} disableGutters>
                <InputTypeSelector 
                    type={this.props.element.getType()} 
                    onChange={this.handleSetType}
                    label={'Block Type'}
                    options={[
                    {label: 'Header', value: 'h1',},
                    {label: 'Paragraph', value: 'p',},
                    {label: 'Emphasis', value: 'em',},
                    {label: 'Strong', value: 'strong',},  
                    {label: 'Quotation', value: 'q',},      
                    {label: 'Div', value: 'div',},  
                    {label: 'Pre', value: 'pre',},
                    {label: 'Table', value: 'table'},
                    {label: 'Table Row', value: 'tr'},
                    {label: 'Table Head', value: 'th'},
                    {label: 'Table Data', value: 'td'},
                    {label: 'Form', value: 'form'},
                    {label: 'Input', value: 'input'},
                    {label: 'Text Area', value: 'textarea'},
                    {label: 'Select', value: 'select'},
                    {label: 'Option', value: 'option'},
                    {label: 'Button', value: 'button'},
                    {label: 'Attribute', value: 'a',},
                    {label: 'Script', value: 'script',},
                    {label: <i>Insert Custom</i>, value: 'custom', attributes: []}            
                    ]}
                />
                <InputField text={this.props.element.getContent()} onChange={this.handleTextChange}/>
                <InputAddButton onAdd={this.handleAdd}/>
                <InputDeleteButton onClick={this.handleDelete}/>
                <InputExtrasButton onClick={this.toggleDialog}/>

                <MoreElementDialog type={this.props.element.getType()} open={this.state.dialogOpen}/>
            </ListItem>
        );
    }
}

export default InputElement;
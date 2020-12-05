import {Input}                      from './Input';
import * as FileInput               from './FileInput';
import {Select}                     from './Select';
import * as DynamicTable            from './DynamicTable';
import {NavigationTabs}             from './NavigationTabs';
import {Textarea}                   from './Textarea';
import * as Tinymce                 from './Tinymce';
import {FormErrorBlock}             from './FormErrorBlock';
import {FormSubmitBlock}            from './FormSubmitBlock';
import * as CheckboxList            from './CheckboxList';
import {DropdownButton}             from './DropdownButton';
import {Checkbox}                   from './Checkbox';
import {NestedErrorBlock}           from './NestedErrorBlock';
import {ActionButton}               from './ActionButton';
import {InformationTable}           from './InformationTable';
import {SaleContractStatusSelect}   from './SaleContractStatusSelect';

export default function () {
    return {
        Input,
        FileInput,
        Select,
        DynamicTable,
        NavigationTabs,
        Textarea,
        Tinymce,
        FormErrorBlock,
        FormSubmitBlock,
        CheckboxList,
        DropdownButton,
        Checkbox,
        NestedErrorBlock,
        ActionButton,
        InformationTable,
        SaleContractStatusSelect
    };
}

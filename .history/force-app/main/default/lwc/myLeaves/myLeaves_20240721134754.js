import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequstController.getMyLeaves';
const COLUMNS = [
    {label: 'Request Id', fieldName: 'Name', cellAttribute: {class: {fieldName: 'cellClass'}} },
    {label: 'From Date', fieldName: 'From_Date__c', cellAttribute: {class: {fieldName: 'cellClass'}}},
    {label: 'To Date', fieldName: 'To_Date__c', cellAttribute: {class: {fieldName: 'cellClass'}}},
    {label: 'Reason', fieldName: 'Reason__c', cellAttribute: {class: {fieldName: 'cellClass'}}},
    {label: 'Status', fieldName: 'Status__c', cellAttribute: {class: {fieldName: 'cellClass'}}},
    {label: 'Manager Comment', fieldName: 'Manager_Comment__c', cellAttribute: {class: {fieldName: 'cellClass'}}},
    {
        type: "button", typeAttributes:{
             label: "Edit",
             name: "Edit",
             title: "Edit",
             value: "Edit",
             disabled: {fieldName: 'isEditDisabled'}
        }, cellAttribute: {class: {fieldName: 'cellClass'}}
    }
];
export default class MyLeaves extends LightningElement {
    columns = COLUMNS;
    myLeaves = [];
    myLeavesWireResult;
    showModalPopup = false;
    objectApiName = 'LeaveRequest__c';
    

    @wire(getMyLeaves)
    wiredMyLeaves(result){
        this.myLeavesWireResult = result;
        if(result.data){
            this.myLeaves = result.data.map(a => ({
                ...a,
                cellClass: a.Status__c == 'Approved' ? 'slds-theme_success' : a.Status__c == 'Rejected' ? 'slds-theme_warning' : '', isEditDisabled: a.Status__c != 'Pending'
            }));
        }
        if(result.error){
            console.log('Error occured while fetching my leaves: ', result.error);
        }
    }

    get noRecordsFound(){
        return this.myLeaves.length == 0;
    }

    popupCloseHandler(){
        this.showModalPopup = false;
    }
}
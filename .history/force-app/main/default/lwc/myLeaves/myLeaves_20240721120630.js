import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequstController.getMyLeaves';
const COLUMNS = [
    {label: 'Request Id', fieldName: 'Name', cellA },
    {label: 'From Date', fieldName: 'From_Date__c'},
    {label: 'To Date', fieldName: 'To_Date__c'},
    {label: 'Reason', fieldName: 'Reason__c'},
    {label: 'Status', fieldName: 'Status__c'},
    {label: 'Manager Comment', fieldName: 'Manager_Comment__c'},
    {
        type: "button", typeAttributes:{
             label: "Edit",
             name: "Edit",
             title: "Edit",
             value: "Edit"
        }
    }
];
export default class MyLeaves extends LightningElement {
    columns = COLUMNS;
    MyLeaves = [];
    myLeavesWireResult;
    @wire(getMyLeaves)
    wiredMyLeaves(result){
        this.myLeavesWireResult = result;
        if(result.data){
            this.MyLeaves = result.data.map(a => ({
                ...a,
                cellClass: a.Status__c == 'Approved' ? 'slds-theme_success' : a.Status__c == 'Rejected' ? 'slds-theme_warning' : '', isEditDisabled: a.Status__c != 'Pending'
            }));
        }
        if(result.error){
            console.log('Error occured while fetching my leaves: ', result.error);
        }
    }

    get noRecordsFound(){
        return this.MyLeaves.length == 0;
    }
}
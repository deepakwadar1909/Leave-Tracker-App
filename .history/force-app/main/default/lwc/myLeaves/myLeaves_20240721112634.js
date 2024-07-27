import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequstController.getMyLeaves';
const COLUMNS = [
    {label: 'Request Id', fieldName: 'Name'},
    {label: 'From Date', fieldName: 'From_Date__c'},
    {label: 'To Date', fieldName: 'To_Date__c'},
    {label: 'Reason', fieldName: 'Reason__c'},
    {label: 'Status', fieldName: 'Status__c'},
    {label: 'Manager Comment', fieldName: 'Manager_Comment__c'},
    {
        {type: "button", typeAtrribute:{
             label: "Edit",
             name: "Edit",
             title: "Approve this leave request",
             variant: "brand"
        }}
    }
]
export default class MyLeaves extends LightningElement {

    MyLeaves = [];
    myLeavesWireResult;
    @wire(getMyLeaves)
    wiredMyLeaves(result){
        this.myLeavesWireResult = result;
        if(result.data){
            this.MyLeaves = result.data;
        }
        if(result.error){
            console.log('Error occured while fetching my leaves: ', result.error);
        }
    }

}
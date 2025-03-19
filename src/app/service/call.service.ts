import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class CallService {
  private _httpHeaders:any;

  apiUrl: string = environment.apiUrl + "call"
  apiUrlReport: string = environment.apiUrlForReport + "call"
  constructor(private http: HttpClient) {
    this._httpHeaders = {
      headers: new HttpHeaders({
        'x-auth-token': JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken
      })
    };
  }

  post(callData:any) {
    return this.http.post(this.apiUrl + "/createCall", callData, this._httpHeaders);
  }

  put(callData:any) {
    return this.http.put(this.apiUrl, callData, this._httpHeaders);
  }

  getByCustomerId(id:any) {
    return this.http.get(this.apiUrl + '/getByCustomer/' + id + '?size=' + 5 + '&page=' + 0 + '&sort=createdAt,desc', this._httpHeaders);
  }

  getAll() {
    return this.http.get(this.apiUrl + '?size=' + 2000 + '&page=' + 0 + '&sort=createdAt,desc', this._httpHeaders);
  }

  updateTechnicalConcern(callId:any, concernId:any, callProduct:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/updateTechnicalConcern/' + concernId, callProduct, this._httpHeaders);
  }

  getEmployeeCallData(fromTime:any, toTime:any) {
    return this.http.get(this.apiUrl + '/totalCreatedByCallCenterEmployee/' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.id + '?from=' + fromTime + '&to=' + toTime, this._httpHeaders);
  }

  searchByRequestNumberOrCustomerProductSerialNumber(requestNumber:any) {
    return this.http.put(this.apiUrl + '/searchByRequestNumber?size=40&page=0&sort=requestNumber,desc', requestNumber, this._httpHeaders);
  }

  searchByEmail(email:any) {
    return this.http.put(this.apiUrl + '/searchByEmail?size=40&page=0&sort=requestNumber,desc', email, this._httpHeaders);
  }

  searchByRequestNumberWithYear(requestNumber:any,year:any){
    return this.http.put(this.apiUrl + '/searchByRequestNumberWithYear?year='+year+'&size=200&page=0&sort=requestNumber,desc', requestNumber, this._httpHeaders);
  }

  searchByCustomerContactOrCustomerProductSerialNumberOrRequestNumber(requestNumber:any) {
    return this.http.put(this.apiUrl + '/searchByCustomerContactOrCustomerProductSerialNumberOrRequestNumber?size=40&page=0&sort=requestNumber,desc', requestNumber, this._httpHeaders);
  }

  getFutureCallBacks(fromTime:any) {
    return this.http.get(this.apiUrl + '/getFutureCallBacks?callCenterEmployeeId=' + JSON.parse(sessionStorage.getItem('cshareUser') || '').employee.id + '&from=' + fromTime.toISOString(), this._httpHeaders);
  }

  changeRemarks(callId:any, status:any, remarks:any, callBackTime?: any) {
    if (callBackTime == undefined || callBackTime == null) {
      return this.http.put(this.apiUrl + '/' + callId + '/changeStatus/' + status, remarks, this._httpHeaders);
    } else {
      return this.http.put(this.apiUrl + '/' + callId + '/changeStatus/' + status + '?callBackTime=' + callBackTime.toISOString(), remarks, this._httpHeaders);
    }

  }

  getByStatusAndServiceCentre(status:any) {
      return this.http.get(this.apiUrl + '/getByStatus/' + status + '?size=100&page=0&sort=createdAt,desc', this._httpHeaders);
  }

  getByStatusAndServiceCentreWithPage(status:any, page:any) {
      return this.http.get(this.apiUrl + '/getByStatus/' + status +'?size=100&page=' + page + '&sort=createdAt,desc', this._httpHeaders);
  }
  serviceTypeDataByEmpId(fromTime:any, toTime:any) {
    return this.http.get(this.apiUrl + '/totalCreatedByCallCenterEmployeeAccToServiceTypes/' + JSON.parse(sessionStorage.getItem('cshareUser')|| '').employee.id + '?from=' + fromTime + '&to=' + toTime, this._httpHeaders);
  }

  searchByCustomerCityAndStatusAndServiceCentre(status:any, key:any) {

      return this.http.put(this.apiUrl + '/searchByCustomerCityAndStatusAndServiceCentres/' + status + '/' + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.serviceCentreId + '?size=100&page=0&sort=createdAt,desc', key, this._httpHeaders);
    
  }  
  searchByCustomerProductSerialNumber(customerProductSerialNumber:any) {
    return this.http.put(this.apiUrl + '/getbyCustomerProductSerialNumber', customerProductSerialNumber, this._httpHeaders)
  }
  feedbackRemaks(callId:any,feedbackRemarks:any,ratings:any){
    return this.http.put(this.apiUrl + '/' +callId + '/feedbackRemarks/'  + ratings ,feedbackRemarks, this._httpHeaders);
  }

  callTypeDataByEmpId(fromTime:any, toTime:any) {
    return this.http.get(this.apiUrl + '/totalCreatedByCallCenterEmployeeAccToCallType/' + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id + '?from=' + fromTime + '&to=' + toTime, this._httpHeaders);
  }
  searchByRequestNumber(requestNumber:any) {
    return this.http.put(this.apiUrl + '/searchByRequestNumberOrCustomerContact?size=2000&page=0&sort=requestNumber,desc', requestNumber, this._httpHeaders);
  }
  getById(callId:any) {
    return this.http.get(this.apiUrl + '/getById/' + callId, this._httpHeaders);
  }
  transferCallWithServiceEngineer(id:any, serviceCentreId:any, serviceEngineerId:any) {
    return this.http.put(this.apiUrl + '/' + id + '/callTransfer/' + serviceCentreId + '?serviceEngineerId=' + serviceEngineerId, '', this._httpHeaders);
  }
  transferCall(id:any, serviceCentreId:any) {
    return this.http.put(this.apiUrl + '/' + id + '/callTransfer/' + serviceCentreId, '', this._httpHeaders);
  }

  updateCustomerAddress(callId:any, customerData:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/updateCustomerAddress', customerData, this._httpHeaders);
  }

  getCallCreatedBySourceEmployee(status:any) {
    return this.http.put(this.apiUrl + '/getCallCreatedBySourceEmployee/' + '?status=' + status + '&size=500&page=0&sort=requestNumber,desc', {}, this._httpHeaders)
  }

  changeStatus(status:any, callId:any, remarks?: String) {
    return this.http.put(this.apiUrl + '/' + callId + '/changeStatus/' + status, remarks, this._httpHeaders);
  }

  searchByRequestNumberAndSourceEmployeeExists(requestNumber:any) {
    return this.http.put(this.apiUrl + '/searchByRequestNumberOrCustomerContactSourceEmployeeExists?size=50&page=0&sort=requestNumber,desc', requestNumber, this._httpHeaders);
  }

  // getCallByEmployeeIdAndStatus(status:any) {
  //   if (JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.role == 'CALL_CENTRE_EMPLOYEE') {
  //     return this.http.put(this.apiUrl + '/getByCallCentreEmployeeIdAndStatus/'
  //       + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id
  //       + '?status=' + status + '&size=500&page=0&sort=requestNumber,desc', {}, this._httpHeaders)
  //   } else if (JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.role == 'CALL_VERIFIER') {
  //     return this.http.put(this.apiUrl + '/getByCallVerificationEmployeeIdAndStatus/'
  //       + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id
  //       + '?status=' + status + '&size=500&page=0&sort=requestNumber,desc', {}, this._httpHeaders)
  //   }
  //   else if (JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.role == 'T2T3_EMPLOYEE') {
  //     return this.http.put(this.apiUrl + '/getCallByT2T3Employee/'
  //       + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id
  //       + '?status=' + status + '&size=500&page=0&sort=requestNumber,desc', {}, this._httpHeaders)
  //   }
  // }

  // getByStatusAndEmployeeWithPage(status:any, page:any) {
  //   if (JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.role == 'CALL_CENTRE_EMPLOYEE') {
  //     return this.http.put(this.apiUrl + '/getByCallCentreEmployeeIdAndStatus/'
  //       + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id
  //       + '?status=' + status + '&size=500&page=' + page + '&sort=requestNumber,desc', {}, this._httpHeaders)
  //   } else if (JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.role == 'CALL_VERIFIER') {
  //     return this.http.put(this.apiUrl + '/getByCallVerificationEmployeeIdAndStatus/'
  //       + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id
  //       + '?status=' + status + '&size=500&page=' + page + '&sort=requestNumber,desc', {}, this._httpHeaders)
  //   }
  //   else if (JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.role == 'T2T3_EMPLOYEE') {
  //     return this.http.put(this.apiUrl + '/getCallByT2T3Employee/'
  //       + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id
  //       + '?status=' + status + '&size=500&page=' + page + '&sort=requestNumber,desc', {}, this._httpHeaders)
  //   }
  // }

  // searchByCustomerNameAndStatusAndEmployee(status:any, query:any) {
  //   if (JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.role == 'CALL_CENTRE_EMPLOYEE') {
  //     return this.http.put(this.apiUrl + '/searchByCallCentreEmployeeIdAndStatusAndCustomerName/'
  //       + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id
  //       + '?status=' + status + '&size=500&page=0&sort=requestNumber,desc', query, this._httpHeaders);
  //   } else if (JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.role == 'CALL_VERIFIER') {
  //     return this.http.put(this.apiUrl + '/searchByCallVerificationEmployeeIdAndStatusAndCustomerName/'
  //       + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id
  //       + '?status=' + status + '&size=500&page=0&sort=requestNumber,desc', query, this._httpHeaders);
  //   }
  // }

  // searchByRequestNumberAndStatusAndEmployee(status:any, query:any) {
  //   if (JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.role == 'CALL_CENTRE_EMPLOYEE') {
  //     return this.http.put(this.apiUrl + '/searchByCallCentreEmployeeIdAndStatusAndRequestNumber/'
  //       + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id
  //       + '?status=' + status + '&size=500&page=0&sort=requestNumber,desc', query, this._httpHeaders);
  //   } else if (JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.role == 'CALL_VERIFIER') {
  //     return this.http.put(this.apiUrl + '/searchByCallVerificationEmployeeIdAndStatusAndRequestNumber/'
  //       + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id
  //       + '?status=' + status + '&size=500&page=0&sort=requestNumber,desc', query, this._httpHeaders);
  //   }
  // }

  changeStatusWithStage(callId:any, status:any, callStatusDetails:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/changeStatusWithStage/' + status, callStatusDetails, this._httpHeaders);
  }

  assignServiceEngineer(callId:any, serviceEngineerId:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/assignServiceEngineer/' + serviceEngineerId, '', this._httpHeaders);
  }

  createCallWithWalkin(callData:any) {
    return this.http.post(this.apiUrl + "/createCallWithWalkIn", callData, this._httpHeaders);
  }

  getCallWithStatus(status:any){
    return this.http.get(this.apiUrl + "/getCallByCallCenterIdAndStatus/" + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id + '/' + status + "?page=0&size=500&sort=lastModifiedAt,desc", this._httpHeaders)
  }
 
  getCallBacksBetween( fromDate:any, toDate:any){
    return this.http.get(this.apiUrl + "/getCallBacksBetween?callCenterEmployeeId=" + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id + '&from=' + fromDate + "&to=" + toDate, this._httpHeaders)
  }
  
  getCallBacksBetweenWithMultipleCall( fromDate:any, toDate:any,statusList:any){
    return this.http.get(this.apiUrl + "/getCallBacksBetweenWithMultiStatus?callCenterEmployeeId=" + JSON.parse(sessionStorage.getItem('cshareUser')||'').employee.id + "&statusList=" + statusList + '&from=' + fromDate + "&to=" + toDate +"&page=0&size=500&sort=lastModifiedAt,desc", this._httpHeaders)
  }

  updateProduct(id:any, productId:any, callProduct:any) {
    return this.http.put(this.apiUrl + '/' + id + '/updateCustomerProductModel/' + productId, callProduct, this._httpHeaders);
  }
  
  changeEnquiryProduct(id:any, productId:any, callProduct:any) {
    return this.http.put(this.apiUrl + '/changeEnquiryProduct/'+ id +'?oldProductId=' + callProduct.enquiredProductId + '&newProductId=' + productId, {}, this._httpHeaders);
  }
  
  updateCallRefId(id:any, refId:any) {
    return this.http.put(this.apiUrl + '/updateCallRefId/' + id +'?refId=' + refId, {}, this._httpHeaders);
  }

  updateCustomerName(callId:any, customerData:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/updateCustomerName', customerData, this._httpHeaders);
  }
  searchBySerialProductNumber(serialProductNumber:any) {
    return this.http.put(this.apiUrl + '/searchByCustomerContactOrCustomerProductSerialNumberOrRequestNumber?size=200&page=0&sort=serialProductNumber,desc', serialProductNumber, this._httpHeaders);
  }
  
  updateCustomerSecondaryContact(callId:any, customerData:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/updateCustomerAlternateNumber', customerData, this._httpHeaders);
  }

  updateCustomerContact(callId:any, customerData:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/updateCustomerContactNumber', customerData, this._httpHeaders);
  }

  upCountryCharges(id:any,charges:any) {
    return this.http.put(this.apiUrl +'/' +id +'/upCountryCharges?charges='+ charges,'', this._httpHeaders);
  }
  searchByCustomerProductSerailNumber(serialProductNumber:any) {
    return this.http.put(this.apiUrl + '/searchByCustomerProductSerialNumber?size=200&page=0&sort=serialProductNumber,desc', serialProductNumber, this._httpHeaders);
  }

  markPending(callId:any, pendingReason:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/markPending', pendingReason, this._httpHeaders);
  }

  closureDetails(callId:any, callData:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/closureDetails', callData, this._httpHeaders);
  }

  markClose(callId:any) {
    return this.http.get(this.apiUrl + '/' + callId + '/markClosed', this._httpHeaders);
  }
  addRejectRemarks(callId:any, remarks?: String) {
    return this.http.put(this.apiUrl + '/' + callId + '/addRejectRemarks', remarks, this._httpHeaders);
  }

  generateBill(callData:any) {
    const billingDetails = {
      'discountPercentage': callData.discountPercentage,
      'serviceCharge': callData.serviceCharge,
      'discount': callData.discount,
      'warrantyAmount': callData.warrantyAmount,
      'otherCharges': callData.otherCharges,
      'visitingCharge': callData.visitingCharge,
      'vehicleNumber': callData.vehicleNumber,
      'installationDiscountAmount': callData.installationDiscountAmount,
      'installationServiceCharge': callData.installationServiceCharge,
      'installationInWarrantyAmount': callData.installationInWarrantyAmount,
      'installationOtherCharges': callData.installationOtherCharges,
      'complaintDiscountAmount': callData.complaintDiscountAmount,
      'complaintServiceCharge': callData.complaintServiceCharge,
      'complaintInWarrantyAmount': callData.complaintInWarrantyAmount,
      'complaintOtherCharges': callData.complaintOtherCharges,
      'travelFromCity': callData.travelFromCity,
      'travelStartTime': callData.travelStartTime,
      'travelToCity': callData.travelToCity,
      'travelEndTime': callData.travelEndTime,
      'tavelMode': callData.tavelMode,
      'travelClass': callData.travelClass,
      'travelCostCentre': callData.travelCostCentre,
      'travelAmount': callData.travelAmount,
      'travelKm': callData.travelKm,
      'calculatedAmount': callData.calculatedAmount
    }
    return this.http.put(this.apiUrl + '/' + callData.id + '/generateBill', billingDetails, this._httpHeaders);
  }

  closureCallDemo(callId:any,remark:any, callData:any ) {
    return this.http.put(this.apiUrl + '/' + callId + '/ClosedDemoCall?afterCallCloseRemarks='+ remark, callData, this._httpHeaders);
  }

  updateBillRelatedDetails(callData:any) {
    const billingDetails = {
      'billBookNumber': callData.billBookNumber,
      'fsrNumber': callData.fsrNumber
    }
    return this.http.put(this.apiUrl + '/' + callData.id + '/updateBillRelatedDetails', billingDetails, this._httpHeaders);
  }

  removeStockReplacement(callId:any, callProduct:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/removeProductStockReplacement', callProduct, this._httpHeaders);
  }

  productStockReplacement(callId:any, productStockId:any, billableOW:any, callProduct:any, standBy:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/productStockReplacement/' + productStockId + '?billableOW=' + billableOW + '&standBy=' + standBy, callProduct, this._httpHeaders);
  }

  removeSparePartStockReplacement(callId:any, callReplacedSparePartStockRequest:any, callProduct:any) {
    let removeSparePartReplace: any = {
      callReplacedSparePartStockRequest,
      callProduct
    }
    return this.http.put(this.apiUrl + '/' + callId + '/removeSparePartStockReplacement', removeSparePartReplace, this._httpHeaders);
  }

  removeSerialSparePartStockReplacement(callId:any, callReplacedSparePartStockRequest:any, callProduct:any) {
    let removeSparePartReplace: any = {
      callReplacedSparePartStockRequest,
      callProduct
    }
    return this.http.put(this.apiUrl + '/' + callId + '/removeSerialSparePartStockReplacement', removeSparePartReplace, this._httpHeaders);
  }

  removeSparePartStockDefective(callId:any, callDefectiveSparePartStockRequest:any, callProduct:any) {
    let removeDefactiveSparePart: any = {
      callDefectiveSparePartStockRequest,
      callProduct
    }
    return this.http.put(this.apiUrl + '/' + callId + '/removeSparePartStockDefective', removeDefactiveSparePart, this._httpHeaders);
  }

  sparePartStockReplacement(callId:any, callReplacedSparePartStockRequest:any, callProduct:any, serialNumberExist:any) {
    let assignSparePartReplace: any = {
      callReplacedSparePartStockRequest,
      callProduct
    }
    return this.http.put(this.apiUrl + '/' + callId + '/sparePartStockReplacement?serialNumberExist=' + serialNumberExist, assignSparePartReplace, this._httpHeaders);
  }

  sparePartStockDefective(callId:any, callDefectiveSparePartStockRequest:any, callProduct:any) {
    let assignSparePartStockDefective: any = {
      callDefectiveSparePartStockRequest,
      callProduct
    }

    return this.http.put(this.apiUrl + '/' + callId + '/sparePartStockDefective', assignSparePartStockDefective, this._httpHeaders);
  }

  changeStatusWithRemarks(status:any, callId:any, remarks:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/reopenCallStatus/' + status, remarks, this._httpHeaders);
  }

  updateCallConcern(callId:any, concernId:any, callProduct:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/updateCallConcern/' + concernId, callProduct, this._httpHeaders);
  }

  updateSerialNumber(id:any, serialNumber:any, callProduct:any) {
    return this.http.put(this.apiUrl + '/' + id + '/updateCustomerProductSerialNumber/' + serialNumber, callProduct, this._httpHeaders);
  }
  updateDistributorName(callId:any, distributorName:any, customerData:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/updateDealerOrDistributorName?dealerOrDistributorName=' + distributorName + '&distributor=true', customerData, this._httpHeaders);
  }
  updateDealerName(callId:any, dealerName:any, customerData:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/updateDealerOrDistributorName?dealerOrDistributorName=' + dealerName, customerData, this._httpHeaders);
  }
  updateCustomerProductPurchaseDate(id:any, dop:any, callProduct:any) {
    return this.http.put(this.apiUrl + '/' + id + '/updateCustomerProductPurchaseDate?dop=' + dop, callProduct, this._httpHeaders);
  }
  updateCustomerProductManufacturingDate(id:any, dom:any, callProduct:any) {
    return this.http.put(this.apiUrl + '/' + id + '/updateCustomerProductManufacturingDate?dom=' + dom, callProduct, this._httpHeaders);
  }
  updatecustomerProductInvoiceNumber(id:any, invoiceNumber:any, callProduct:any) {
    return this.http.put(this.apiUrl + '/' + id + '/updateCustomerProductInvoiceNumber/' + invoiceNumber, callProduct, this._httpHeaders);
  }
  updateCallCheckingParameters(id:any, checkingParameters:any, callProduct:any) {
    let checkingParametersWithCallProduct = {
      checkingParameters,
      callProduct
    }
    return this.http.put(this.apiUrl + '/' + id + '/updateCheckingParameters', checkingParametersWithCallProduct, this._httpHeaders);
  }

  uploadCustomerProductImage(fileToUpload: File, callId:any, customerProductId:any) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.put(this.apiUrl + '/' + callId + '/uploadCustomerProductImage/' + customerProductId, formData, this._httpHeaders)
  }

  uploadCustomerProductBillImage(fileToUpload: File, callId:any, customerProductId:any) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.put(this.apiUrl + '/' + callId + '/uploadCustomerProductBillImage/' + customerProductId, formData, this._httpHeaders)
  }

  uploadCustomerProductWarrantyImage(fileToUpload: File, callId:any, customerProductId:any) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.put(this.apiUrl + '/' + callId + '/uploadCustomerProductWarrantyImage/' + customerProductId, formData, this._httpHeaders)
  }

  uploadReplacementProductImage(fileToUpload: File, callId:any, customerProductId:any) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.put(this.apiUrl + '/' + callId + '/uploadReplacementProductImage/' + customerProductId, formData, this._httpHeaders)
  }

  uploadReplacementProductBillImage(fileToUpload: File, callId:any, customerProductId:any) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.put(this.apiUrl + '/' + callId + '/uploadReplacementProductBillImage/' + customerProductId, formData, this._httpHeaders)
  }

  uploadReplacementProductWarrantyImage(fileToUpload: File, callId:any, customerProductId:any) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.put(this.apiUrl + '/' + callId + '/uploadReplacementProductWarrantyImage/' + customerProductId, formData, this._httpHeaders)
  }

  afterCallCloseRemarks(callId:any, remarks:any) {
    return this.http.put(this.apiUrl + '/' + callId + '/afterCallCloseRemarks', remarks, this._httpHeaders);
  }

  markBillGeneratedFalse(callId:any) {
    return this.http.get(this.apiUrl + '/' + callId + '/markBillGeneratedFalse', this._httpHeaders);
  }

  dispatchDetails(callId:any, dispatchDetails:any){
    return this.http.put(this.apiUrl + '/' + callId + '/dispatchDetails', dispatchDetails, this._httpHeaders);
  }

  replacementAgainstRepairApproval() {
    return this.http.get(this.apiUrl + '/getAllPendingForReplacementAgainstRepairApproval' + '?size=' + 150 + '&page=' + 0 + '&sort=createdAt,desc', this._httpHeaders);
  }
  rcsmReplacementAgainstRepairApproval() {
    return this.http.get(this.apiUrl + '/getAllPendingForRcsmReplacementAgainstRepairApproval' + '?size=' + 150 + '&page=' + 0 + '&sort=createdAt,desc', this._httpHeaders);
  }
  bulkApproveReplacementAgainstRepair(data:any) {
    return this.http.put(this.apiUrl + '/bulkApproveReplacementAgainstRepair', data, this._httpHeaders);
  }

  callDataFrame() {
    return this.http.get(this.apiUrlReport + '/dataFrame?authToken=' + JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken + '&from=2022-11-30T18:30:00.000Z&to=2022-12-31T18:29:59.999Z');
  }

  preSalesData() {
    return this.http.get(this.apiUrlReport + '/preSalesData?authToken=' + JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken);
  }

  crmFinalDashBoard() {
    return this.http.get(this.apiUrlReport + '/crmFinalDashBoard?authToken=' + JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken + '&from=2022-11-30T18:30:00.000Z&to=2022-12-31T18:29:59.999Z');
  }

  allWalkInCallTest() {
    return this.http.get(this.apiUrlReport + '/allWalkInCallTest?authToken=' + JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken + '&from=2022-11-30T18:30:00.000Z&to=2022-12-31T18:29:59.999Z');
  }

  allFollowUpData() {
    return this.http.get(this.apiUrlReport + '/followUpData?authToken=' + JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken + '&from=2022-11-30T18:30:00.000Z&to=2022-12-31T18:29:59.999Z');
  }

  allWalkInCallReportData() {
    return this.http.get(this.apiUrlReport + '/allWalkInCallReportData?authToken=' + JSON.parse(sessionStorage.getItem('cshareUser') || '').authToken + '&from=2022-11-30T18:30:00.000Z&to=2022-12-31T18:29:59.999Z');
  }

  searchByRequestNumberAndContactAndName(query:any) {
    return this.http.put(this.apiUrl + '/searchByRequestNumberAndContactAndName', query, this._httpHeaders);
  }
  settlementForCalls(kycCallId:any, walkInCallId:any, settlementAmount:any, noDedication:any) {
    return this.http.put(this.apiUrl + '/settlementForCalls'
      + '?kycCallId=' + kycCallId
      + '&walkInCallId=' + walkInCallId
      + '&settlementAmount=' + settlementAmount + '&noDeduction=' + noDedication
      , {}, this._httpHeaders);
  }
  
}

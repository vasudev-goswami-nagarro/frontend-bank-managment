export interface Customer {
  responseXML: ResponseXml;
}

export interface ResponseXml {
  getCustomerInfoResponse: GetCustomerInfoResponse;
}

export interface GetCustomerInfoResponse {
  getCustomerInfoResult: GetCustomerInfoResult;
}

export interface GetCustomerInfoResult {
  RETURN_CODE: string;
  ERROR_MSG: any[];
  WARNING_MSG_LIST: any[];
  CUST_INFO: CustInfo;
}

export interface CustInfo {
  CUST_NO: string;
  SHORT_NAME: string;
  IS_INDIVIDUAL: string;
  NATIONALITY: string;
  NATIONALITY_NUM: string;
  NATIONALITY_DESC: string;
  STREET_ADDR: string;
  ADDRESS_LINE2: any[];
  ADDRESS_LINE3: any[];
  TOWN_COUNTRY: string;
  POST_CODE: any[];
  COUNTRY: string;
  COUNTRY_CODE: string;
  COUNTRY_CODE_NUM: string;
  DESPATCH_CODE: string;
  CONTACT_INFO_V7: ContactInfoV7;
}

export interface ContactInfoV7 {
  CONTACT_INFO_V7: ContactInfoV72;
}

export interface ContactInfoV72 {
  COMM_CHANNEL: string;
  PHONE_LIST_V7: PhoneListV7;
  OFFICE_PHONE_LIST_V7: OfficePhoneListV7;
  FAX_LIST_V7: FaxListV7;
  SMS_LIST_V7: SmsListV7;
  EMAIL_LIST_V7: EmailListV7;
}

export interface PhoneListV7 {
  PHONE_LIST_ITEM_V7: PhoneListItemV7;
}

export interface PhoneListItemV7 {
  PHONE: string;
}

export interface OfficePhoneListV7 {
  OFFICE_PHONE_LIST_ITEM_V7: OfficePhoneListItemV7;
}

export interface OfficePhoneListItemV7 {
  OFFICE_PHONE: any[];
}

export interface FaxListV7 {
  FAX_LIST_ITEM_V7: FaxListItemV7;
}

export interface FaxListItemV7 {
  FAX: any[];
}

export interface SmsListV7 {
  SMS_LIST_V7: SmsListV72;
}

export interface SmsListV72 {
  MOB_OPER_ISO: string;
  MOB_OPER_CODE: string;
  SMS_FORMATTED: string;
  SMS_LIST_ITEM_V7: SmsListItemV7;
}

export interface SmsListItemV7 {
  SMS_LIST_ITEM_V7: SmsListItemV72;
}

export interface SmsListItemV72 {
  SMS: string;
}

export interface EmailListV7 {
  EMAIL_LIST_ITEM_V7: EmailListItemV7;
}

export interface EmailListItemV7 {
  EMAIL: string;
}

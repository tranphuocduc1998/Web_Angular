export class ControlBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  options: any;
  changed: string;
  format: string;
  related: any;
  command: string;
  accept: string;
  controlTypeID: any;
  parameters: any;
  disabled: any;
  xacnhan_id: any;
  type_date: any;
  motacontrol: any;
  tenfile: any;
  minlength: any;
  maxlength: any;
  downloadURL: any;
  id: any;
  placeholder: any;
  default_value: any;
  hienthi: any;
  idbang: any;
  kiemtra: any;

  constructor(options: {
    value?: T,
    command?: string,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    controlType?: string,
    format?: string,
    options?: any,
    related?: any,
    accept?: any;
    controlTypeID?: any;
    parameters?: any;
    disabled?: any;
    xacnhan_id?: any;
    type_date?: any;
    motacontrol?: any;
    tenfile?: any;
    minlength?: any;
    maxlength?: any;
    downloadURL?: any;
    id?: any;
    placeholder?: any;
    default_value?: any;
    hienthi?: any;
    idbang?: any;
    kiemtra?: any;
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.format = options.format || 'DD/MM/YYYY';
    this.options = options.options || [];
    this.related = options.related || [];
    this.command = options.command || '';
    this.accept = options.accept;
    this.controlTypeID = options.controlTypeID;
    this.parameters = options.parameters;
    this.disabled = options.disabled;
    this.xacnhan_id = options.xacnhan_id;
    this.type_date = options.type_date;
    this.motacontrol = options.motacontrol;
    this.tenfile = options.tenfile;
    this.minlength = options.minlength;
    this.maxlength = options.maxlength;
    this.downloadURL = options.downloadURL;
    this.id = options.id;
    this.placeholder = options.placeholder;
    this.default_value = options.default_value;
    this.hienthi = options.hienthi;
    this.idbang = options.idbang;
    this.kiemtra = options.kiemtra;
  }
}


export class ControlDescriptor {
  name: string;
  type: string;
  required: boolean;
  display: string;
  title: string;
  value: any;
  changed: string;
  format: string;
  options: any;
  related: any;
  command: string;
  accept: string;
  controlTypeID: any;
  order: any;
  parameters: any;
  disabled: any;
  xacnhan_id: any;
  type_date: any;
  motacontrol: any;
  tenfile: any;
  minlength: any;
  maxlength: any;
  downloadURL: any;
  id: any;
  placeholder: any;
  default_value: any;
  hienthi: any;
  idbang: any;
  kiemtra: any;
}

type OwnerContatcModel = {
  phoneNumber: string;
  email: string;
};

export type OwnerModel = {
  id: string;
  contact: OwnerContatcModel;
  name: string;
};

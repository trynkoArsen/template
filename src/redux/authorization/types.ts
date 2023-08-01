export default interface IAuthState {
  isResetPasswordSent: boolean;
}

export interface IVerifyAccountData {
  verificationToken: string;
  password: string;
}

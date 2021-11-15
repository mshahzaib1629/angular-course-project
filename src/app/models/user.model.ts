export class User {
  constructor(
    public email: string,
    public id: string,
    // making token & tokenExpirationDate private, and (_) means we can't get access to them directly
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token(){
    // adding check whenever this token will be fetched
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;
    }
    return this._token;
  }
}

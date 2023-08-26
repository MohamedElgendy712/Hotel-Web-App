export class User{

    firstName = '';
    secondName = '';
    email= '';
    phone= '';
    birthDate= '';
    password= '';

    constructor(firstName , secondName , email, phoneNumber , birthDate , password){
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.password = password;
    }
}